# from parser import parsing_scene, parsing_shop
from core.kafka_config import PLAY_TOPIC, consumer
from generation_simulation import generation_simulation

#const
# EVENTS = None
# SALES = None
# SCENE = None
# LIST_GOODSES = None
# LIST_CACHBOX = None
# LIST_SHELF = None
# DICT_START_POINT = None




consumer.subscribe([PLAY_TOPIC])

def main():
    try:
        while True:
            msg = consumer.poll(5.0)
            if msg is None:
                print("Waiting")
            elif msg.error():
                print(f"Consumer error: {msg.error()}")
                continue
            else: 
                generation_simulation(msg.value().decode('utf-8'))
                # print(EVENTS, SALES, SCENES, sep="\n")
                
    except KeyboardInterrupt:
        pass
    finally:
        consumer.close()

if __name__ == "__main__":
    main()