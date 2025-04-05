from app.service.shop_service import ShopService

shop_service = ShopService()


def parsing_shop(shop_id: str):
    sample_results = shop_service.get_by_id(shop_id)
    events = sample_results["data"]["events"]
    sales = sample_results["data"]["sales"]
    scenes = sample_results["data"]["scene"]
    open_at = sample_results["open_at"]
    close_at = sample_results["close_at"]
    user_per_day = sample_results["data"]["users_per_day"]
    
    return events, sales, scenes, open_at, close_at, user_per_day


def parsing_scene(scene: list):
    # print(scene)
    list_goodses = []
    list_cashbox = []
    list_shelf = []
    dict_start_point = {}
    
    for row in scene:
        for item in row:

            if item is None:
                continue
            if item == "start_point":
                continue 

            for key in item.keys():
                if key.startswith("shelf"):
                    result_goods, result_shelf = parsing_shelf(item)
                    for goods in result_goods:
                        if result_goods:
                            for goods in result_goods:
                                if goods in list_goodses:
                                    continue
                                list_goodses.append(goods)
                    list_shelf.append(result_shelf)
                elif key.startswith("cashbox"):
                    list_cashbox.append({f"{key}": item[key]})

    for row in range(len(scene)):
        for col in range(len(scene[row])):
            if scene[row][col] == "start_point":
                dict_start_point["start_point"] = {}
                dict_start_point["start_point"]["y"] = abs(row - (len(scene) - 1))
                dict_start_point["start_point"]["x"] = col
            if scene[row][col] is None:
                continue
            if scene[row][col] is not None and scene[row][col] != "start_point":
                # print(scene[row][col])
                key_scene = [key for key in scene[row][col].keys()]
                
                if key_scene[0].startswith("shelf"):
                    for item_shelf in list_shelf:
                        # print(item_shelf)
                        if item_shelf.get(*key_scene, None):
                            item_shelf["x"] = col
                            item_shelf["y"] = abs(row - (len(scene) - 1))
                        # for key_shelf in item_shelf.keys():
                        #     item_shelf["x"] = col
                        #     item_shelf["y"] = abs(row - (len(scene) - 1))
                if key_scene[0].startswith("cashbox"):
                    for item_cashbox in list_cashbox:
                        if item_cashbox.get(*key_scene, None):
                            item_cashbox["x"] = col
                            item_cashbox["y"] = abs(row - (len(scene) - 1))
                
    
    return list_goodses, list_shelf, list_cashbox, dict_start_point

def parsing_shelf(shelf: dict):
    list_goodses = []
    dict_shelf = {}
    for key_shelf, value_shelf in shelf.items():
        dict_shelf[key_shelf] = {}
        dict_shelf[key_shelf]["goodses"] = []
        for key_item, value_item in value_shelf.items():
            if key_item == "type_shelf":
                dict_shelf[key_shelf][key_item] = value_item
            elif key_item == "capatity":
                dict_shelf[key_shelf][key_item] = value_item
            
            else:
                for goodses in value_item:
                    for key, value in goodses.items():
                        new_goodses = {f"{key}": value}
                        if new_goodses in list_goodses:
                            continue
                        else:
                            list_goodses.append(new_goodses)
    
    
    for goods in list_goodses:
        for key in goods.keys():
            dict_shelf[key_shelf]["goodses"].append(key)
            
    return list_goodses, dict_shelf