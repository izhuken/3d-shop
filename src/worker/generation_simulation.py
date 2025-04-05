from datetime import date, datetime, time, timedelta
from parser import parsing_scene, parsing_shop
from random import uniform

from generation_users import generation_users, prepareting_goodses, prepareting_sales

#format
# date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
# print(str(date))


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

PROBABILITY_OF_PURCHASE = {"goods": 0.66, "sales_and_goods": 1, "sales": 0.25, "default": 0.15}

PROBABILITY_OF_APPROACH_TO_THE_RACK = {"goods": 1, "formule": 0}

PROBABILITY_APPEARANCE_DISCOUNT = 0.15
PROBABILITY_OF_USER_APPEARANCE_DURING = {
    0.05: {"from": OPEN_AT, "to": "10:00",
    0.10: {"from": "10:00", "to": "12:00"},
    0.25: {"from": "12:00", "to": "14:00"},
    0.15: {"from": "14:00", "to": "18:00"},
    0.20: {"from": "18:00", "to": CLOSED_AT},
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
    print(OPEN_AT, CLOSED_AT)
    HEAT_MAP = generation_heat_map(SCENE)
    # print(HEAT_MAP)
    # print(EVENTS)
    # print(SALES)
    geneartion_traffic_all_day(OPEN_AT, CLOSED_AT)
    users = generation_users(25, SALES, LIST_GOODSES)
    sales_list = prepareting_sales(SALES)
    event_list = prepareting_goodses(LIST_GOODSES)
    
    generation_traffic_on_15_minitus(users)
    # print(users)
    generation_config_day(EVENTS, SALES)



    pass

def generation_heat_map(scene):
    heat_map = [ [0 for j in range(len(scene))] for i in range(len(scene))]
    return heat_map


def generation_config_day(events, sales):
    # print(events)
    event_list_day = generation_event(events)
    sales_list_day = generation_discount_days(sales)
    return event_list_day, sales_list_day

def generation_discount_days(sales: list):
    list_discount = []
    list_worken_discount = [discount.get("goods_type") for discount in WORKEN_DISCOUNT]
    for sale in sales:
        if sale.get("goods_type") in list_worken_discount:
            continue

        random_number = round(uniform(0, 1), 4)

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

def geneartion_traffic_all_day(open_at, closed_at):
    # time()
    delay = timedelta(minutes=15)
    print(delay)
    split_open_time = open_at.split(":")
    split_closed_time = closed_at.split(":")
    # open_time = time(int(split_open_time[0]), int(split_open_time[1]))
    # closed_time = time(int(split_closed_time[0]), int(split_closed_time[1]))
    open_datetime = datetime.combine(date.today(), time(int(split_open_time[0], int(split_open_time[1]))))
    closed_datetime = datetime.combine(date.today(), time(int(split_closed_time[0], int(split_closed_time[1]))))
    print(closed_datetime)
    print(open_datetime + delay)
    work_time = closed_datetime-open_datetime
    count_intervals = work_time.total_seconds() // 3600 * 4
    for interval in range(count_intervals):
        print(interval)
        pass
    # print(work_time.__dir__())
    # print(work_time.total_seconds() / 3600 * 4)
    # print(open_time, closed_time)
    # print(open_time+delay)

def generation_traffic_on_15_minitus(users):
    # for user in users:
        # print(user)
    pass