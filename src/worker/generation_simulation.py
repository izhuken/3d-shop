from datetime import date, datetime, time, timedelta
from parser import parsing_scene, parsing_shop
from random import choice, uniform

from app.service.simulation_service import SimulationService
from generation_users import generation_users, prepareting_goodses, prepareting_sales

#format
# date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
# print(str(date))
simulation_service = SimulationService()

EVENTS = None
SALES = None
SCENE = None
LIST_GOODSES = None
LIST_CACHBOX = None
LIST_SHELF = None
DICT_START_POINT = None

OPEN_AT = None
CLOSED_AT = None
USER_PER_DAY = None

IMPACT_OF_DISCOUNT_ON_RATING = {"sales": 1, "sales_and_goods": 2, "default": 0.5}

PROBABILITY_OF_PURCHASE = {"goods": 0.66, "sales_and_goods": 1, "sales": 0.50, "default": 0.35}

PROBABILITY_OF_APPROACH_TO_THE_RACK = {"goods": 1, "formule": 0}

PROBABILITY_APPEARANCE_DISCOUNT = 0.15
PROBABILITY_OF_USER_APPEARANCE_DURING = {
    20: {"from": OPEN_AT, "to": "10:00",
    10: {"from": "10:00", "to": "12:00"},
    25: {"from": "12:00", "to": "14:00"},
    15: {"from": "14:00", "to": "18:00"},
    20: {"from": "18:00", "to": CLOSED_AT},
    } 
}
PROBABILITY_OF_USER_APPEARANCE = {
    "sales": 0.20,
    "sales_and_goods": 0.40,
    "default": 0.15
}

HEAT_MAP = []

WORKEN_DISCOUNT = []
PROCESSED_USER = []

def generation_simulation(shop_id: str):
    EVENTS, SALES, SCENE, OPEN_AT, CLOSED_AT, USER_PER_DAY = parsing_shop(shop_id)
    LIST_GOODSES, LIST_SHELF, LIST_CACHBOX, DICT_START_POINT = parsing_scene(SCENE)
    # print(OPEN_AT, CLOSED_AT)
    HEAT_MAP = generation_heat_map(SCENE)
    # print(HEAT_MAP)
    # print(EVENTS)
    # print(SALES)
    prepareting_goodses(LIST_GOODSES)
    prepareting_sales(SALES)
    users = generation_users(25, SALES, LIST_GOODSES)
    json_simulation = {"data": {}}
    for i in range(2):
        event_list_day, sales_list_day = generation_config_day(EVENTS, SALES)
        traffic_all_day = geneartion_traffic_all_day(OPEN_AT, CLOSED_AT, users, PROBABILITY_OF_USER_APPEARANCE_DURING, PROBABILITY_OF_USER_APPEARANCE, LIST_SHELF, LIST_CACHBOX, DICT_START_POINT, LIST_GOODSES, HEAT_MAP, SCENE, sales_list_day, event_list_day, i)

        for key, value in traffic_all_day.items():
            json_simulation["data"][f"{key}"] = {}
            json_simulation["data"][f"{key}"]["sales"] = value["sales"]
            json_simulation["data"][f"{key}"]["active_events"] = value["active_events"]
            users_list = []
            for user in value["users"]:
                users_list.append({"name": user["name"], "moves": user["moves"]})
            json_simulation["data"][f"{key}"]["users"] = users_list
    # json_simulation["shop_id"]
    simulation_service.create(shop_id, json_simulation)
        # print(key, value)



    pass

def generation_heat_map(scene):
    heat_map = [ [0 for j in range(len(scene))] for i in range(len(scene))]
    return heat_map


def generation_config_day(events, sales):
    # print(events)
    event_list_day = generation_event(events)
    # print(event_list_day)
    sales_list_day = generation_discount_days(sales)
    
    return event_list_day, sales_list_day

def generation_discount_days(sales: list):
    list_discount = []
    list_worken_discount = [discount.get("goods_type") for discount in WORKEN_DISCOUNT]
    for sale in sales:
        if sale.get("goods_type") in list_worken_discount:
            continue

        random_number = round(uniform(0, 0.8), 4)

        if PROBABILITY_APPEARANCE_DISCOUNT >= random_number:
            goods_type = sale.get("goods_type")
            days = sale.get("days")
            WORKEN_DISCOUNT.append({"goods_type": goods_type, "days": days})

    if len(WORKEN_DISCOUNT) > 0:
        for discount in WORKEN_DISCOUNT:
            discount_goods_type = discount.get("goods_type")
            for sale in sales: 
                if discount_goods_type == sale.get("goods_type"):
                    list_discount.append(discount)
            
            discount["days"] -= 1
            if discount["days"] == 0:
                WORKEN_DISCOUNT.remove(discount)
                print(WORKEN_DISCOUNT)

    return list_discount

def generation_event(events: dict):
    list_events = []
    # print(events)
    for key, value in events.items():
        for key_option, value_option in value.items():
            if key_option == "rate":
                probability = abs(value_option/10)
                random_number = round(uniform(0, 1), 4)
                if probability >= random_number:
                    list_events.append(events[key])

    return list_events

def geneartion_traffic_all_day(open_at, closed_at, users, probability_time, probability_default, shelf_list, cashbox_list, start_point, goodses_list, heat_map, scene, sales_list, event_list, k):
    # time()
    # print(sales_list, event_list)
    traffic_all_day_dict = {}
    delay = timedelta(minutes=15)
    # print(delay)
    split_open_time = open_at.split(":")
    split_closed_time = closed_at.split(":")
    open_datetime = datetime.combine(date.today() + timedelta(days=k), time(int(split_open_time[0], int(split_open_time[1], 0))))
    closed_datetime = datetime.combine(date.today()+ timedelta(days=k), time(int(split_closed_time[0], int(split_closed_time[1], 0))))

    for key, value in probability_time.items():
        if value.get("from") is None:
            value["from"] = open_at
        if value.get("to") is None:
            value["to"] = closed_at

    work_time = closed_datetime-open_datetime
    count_intervals = work_time.total_seconds() // 3600 * 4
    time_interval = open_datetime
    user_list = generation_traffic_on_15_minitus(users, probability_time, probability_default, time_interval, shelf_list, cashbox_list, start_point, goodses_list, heat_map, sales_list, event_list)

    all_configure = {"users" : user_list, "sales": [], "active_events": []}
    
    if len(sales_list) > 0:
        all_configure["sales"] = sales_list
    
    traffic_all_day_dict[f"{time_interval}"] = all_configure
    
    for interval in range(int(count_intervals)):
        
        time_interval += delay
        
        all_configure = {"users" : [], "sales": [], "active_events": []}
        if len(sales_list) > 0:
            all_configure["sales"] = sales_list
        for event in event_list:
                    probability = abs(event["rate"] / 10)
                    random_number = round(uniform(0, 1), 4)
                    if probability >= random_number:
                        all_configure["active_events"].append(event)
        user_list = generation_traffic_on_15_minitus(users, probability_time, probability_default, time_interval, shelf_list, cashbox_list, start_point, goodses_list, heat_map, all_configure["sales"], all_configure["active_events"])
        user_all_list = generation_simulation_user(users, shelf_list, cashbox_list, start_point, goodses_list, heat_map)
        pathfinding(user_all_list, shelf_list, cashbox_list, start_point, scene)
        all_configure["users"] = user_all_list
        traffic_all_day_dict[f"{time_interval}"] = all_configure
    
    PROCESSED_USER.clear()
    return traffic_all_day_dict

def find_minimum(start: str, end: str, coords, new_scene):
    start_coord = coords[start]
    end_coord = coords[end]

    x_offset = end_coord["x"] - start_coord["x"]
    y_offset = end_coord["y"] - start_coord["y"]

    moves = [(start_coord["x"], start_coord["y"])]
    move_index = 0

    while x_offset != 0:
        cx, cy = moves[move_index]

        if x_offset < 0:
            moves.append((cx - 1, cy))
            x_offset += 1
        else:
            moves.append((cx + 1, cy))
            x_offset -= 1

        move_index += 1

    while y_offset != 0:
        cx, cy = moves[move_index]

        if y_offset < 0:
            moves.append((cx, cy - 1))
            y_offset += 1
        else:
            moves.append((cx, cy + 1))
            y_offset -= 1

        move_index += 1

    return moves



def pathfinding(user_list, cashbox_list, shelf_list, start_point, scene):
    # print(user_list)
    coords = {}
    new_scene = [ [0 for j in range(len(scene))] for i in range(len(scene))]
    for i in range(len(scene)):
        for j in range(len(scene)):
            # print(scene[i][j])
            if scene[i][j] == "start_point":
                new_scene[i][j] = "start_point"
                coords["start_point"] = {"x": j, "y": i}
            elif scene[i][j] is None:
                new_scene[i][j] = None
            else:
                for key, value in scene[i][j].items():
                    if key.startswith("shelf"):
                        coords[key] = {"x": j, "y": i}
                        new_scene[i][j] = key
                    elif key.startswith("cashbox"):
                        new_scene[i][j] = key
                        coords[key] = {"x": j, "y": i}
    for user in user_list:
        path = ["start_point"]
        for key, value in user.items():
            if key.startswith("shelf"):
                for key_shelf in value:
                    for key_concr_shelf in key_shelf.keys():
                        if key_concr_shelf.startswith("shelf"):
                            path.append(key_concr_shelf)
        random_cashed = choice(cashbox_list)
        for key in random_cashed.keys():
            if key.startswith("cashbox"):
                path.append(key)
        path.append("start_point")
        move_map = []
        for point_index in range(len(path) - 1):
            start = path[point_index]
            end = path[point_index + 1]

            local_moves = find_minimum(start, end, coords, new_scene)

            if len(move_map) == 0:
                move_map.extend(local_moves)
                continue

            if local_moves[0][0] == move_map[-1][0] and local_moves[0][1] == move_map[-1][1]:
                move_map.extend(local_moves[1:-1])
            else:
                move_map.extend(local_moves)
        user["moves"] = move_map


def generation_traffic_on_15_minitus(users, probability_time, probability_default, time_interval, shelf_list, cashbox_list, start_point, goodses_list, heat_map, sales_list, event_list):
    user_list = []
    probability_on_time = 0
    for user in users:
        random_number = round(uniform(0, 1), 4)
        for key, value in probability_time.items():
            hour_from = value.get("from").split(":")
            hour_to = value.get("to").split(":")
            if time_interval.hour >= int(hour_from[0]) and time_interval.hour < int(hour_to[0]):
                probability_on_time = key / 100

        if user.get("sales", None) and user.get("goods_type", None):
            probability_user = probability_default.get("sales_and_goods")
        elif user.get("sales", None):
            probability_user = probability_default.get("sales")
        else:
            probability_user = probability_default.get("default")
        all_probaiblity = probability_user + probability_on_time
        if all_probaiblity >= random_number:    
            user_list.append(user)
            for processed_user in PROCESSED_USER:
                if processed_user.get("name") == user["name"]:
                    processed_user["count"] += 1
                    if processed_user["count"] == 2:
                        user_list.remove(user)
                    
                if user.get("sales", None) and user.get("goods_type", None):
                    user["rate"] += IMPACT_OF_DISCOUNT_ON_RATING["sales_and_goods"]
                elif user.get("sales", None):
                    user["rate"] += IMPACT_OF_DISCOUNT_ON_RATING["sales"]
                else:
                    user["rate"] += IMPACT_OF_DISCOUNT_ON_RATING["default"]
                PROCESSED_USER.append({"name": user.get("name"), "count": 1})
        
        for event in event_list:
            user["rate"] -= abs(event["rate"] / 10)

    return user_list

def generation_simulation_user(user_list, shelf_list, cashbox_list, start_point, list_goodses, heat_map):
    users_list = []
    for user in user_list:
        
        user["shelf"] = generate_simulation_user_go_shelf(shelf_list, user, heat_map, start_point)
        users_list.append(user)

    return user_list

def generate_simulation_user_go_shelf(shelf_list, user, heat_map, start_point):
    shelf_user_list = []
    for shelf in shelf_list:
        for key, value in shelf.items():
            if key.startswith("shelf"):
                if user["goods_type"] in value["goodses"]:
                    shelf_user_list.append(shelf)
        probability_x = abs(start_point.get("start_point")["x"] - shelf["x"]) + 1
        probability_y = abs(start_point.get("start_point")["y"] - shelf["y"]) + 1
        probability_user_go_the_rack = round(pow(pow(probability_x, 2) + pow(probability_y, 2), 1/2) / 10, 2)
        random_number = round(uniform(0, 1), 4)
        if probability_user_go_the_rack >= random_number:
            shelf_user_list.append(shelf)
    if len(shelf_user_list) == 0:
        shelf_user_list.append(shelf_list[0])

    user["cart"] = generete_simulation_user_buy_goods(shelf_user_list, user)
    for goods in user["cart"]:
        for key, value in goods.items():
            user["total_cost"] += value["cost"]
    return shelf_user_list



def generete_simulation_user_buy_goods(shelf_list, user):
    goods_user_list = []

    probability_user_buy = 0
    

    for shelf in shelf_list:
        
        for key, value in shelf.items():
            if key.startswith("shelf"):
                if user.get("sales", None) and user.get("goods", None):
                    for goods in value["goodses"]:
                        for key_goods, value_goods in goods.items():
                            if key_goods == user["goods"] and value_goods["goods_type"] == user["sales"]:
                                probability_user_buy = PROBABILITY_OF_PURCHASE["sales_and_goods"]
                        random_number = round(uniform(0, 1), 4)
                        if probability_user_buy >= random_number:
                            goods_user_list.append(goods)
                elif user.get("sales", None):
                    for goods in value["goodses"]:
                        for key_goods, value_goods in goods.items():
                            if value_goods["goods_type"] == user["sales"]:
                                probability_user_buy = PROBABILITY_OF_PURCHASE["sales"]
                        random_number = round(uniform(0, 1), 4)
                        if probability_user_buy >= random_number:
                            goods_user_list.append(goods)
                elif user.get("goods_type", None):
                    for goods in value["goodses"]:
                        for key_goods, value_goods in goods.items():
                            # print(key_goods, value_goods["goods"])
                            if key_goods == user["goods_type"]:
                                probability_user_buy = PROBABILITY_OF_PURCHASE["goods"]
                        random_number = round(uniform(0, 0.8), 4)
                        if probability_user_buy >= random_number:
                            goods_user_list.append(goods)
                else:
                    probability_user_buy = PROBABILITY_OF_PURCHASE["default"]
                    for goods in value["goodses"]:
                        random_number = round(uniform(0, 1), 4)
                        if probability_user_buy >= random_number:
                                goods_user_list.append(goods)
    return goods_user_list
