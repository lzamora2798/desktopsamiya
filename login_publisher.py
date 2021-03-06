import random
import time
import json
from paho.mqtt import client as mqtt_client


broker = 'localhost'
port = 1883
topic = "python/login"

client_id = f'python-mqtt-{random.randint(0, 1000)}'


def connect_mqtt():
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = mqtt_client.Client(client_id)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client


def publish(client):
    contador = 0
    while True:
        time.sleep(1)
        if contador <30:
            msg = {"flag":False}
        else:
            msg = {"flag":True}
            contador =0
        jsondata = json.dumps(msg)
        result = client.publish(topic, jsondata)
        status = result[0]
        if status == 0:
            print(f"Send",msg,"to topic `{topic}`")
            contador+=1
        else:
            print(f"Failed to send message to topic {topic}")



def run():
    client = connect_mqtt()
    client.loop_start()
    publish(client)


if __name__ == '__main__':
    run()