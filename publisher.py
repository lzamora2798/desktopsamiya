import random
import time
import json
from paho.mqtt import client as mqtt_client


broker = 'localhost'
port = 1883
topic = "python/weight"

client_id = f'python-mqtt-{random.randint(0, 1000)}'


def connect_mqtt():
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = mqtt_client.Client(client_id)
    #client.username_pw_set(username, password)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client


def publish(client):
    c = 1
    while True:
        time.sleep(1)
        msg_count = round(random.uniform(30, 35),2)

        msg = f"{msg_count} kg"
        if c%13==0 :
            jsondata = {'RFID': {'ID': 'UIDD0A9455F', 'ROLE': ''}, 'SEND': True,'SCALE': {'successful': True, 'stable': True, 'tare': 'GROSS', 'weight': '1.036', 'units': 'kg'}}
        elif c%7==0 : 
            jsondata = {'RFID': {'ID': 'UID525ED1B2', 'ROLE': 'SMY@DM1N.01'}, 'SEND': True,'SCALE': {'successful': True, 'stable': True, 'tare': 'GROSS', 'weight': '1.036', 'units': 'kg'}}
        else:
            jsondata = {'RFID': 'No Card','SEND': False, 'SCALE': {'successful': True, 'stable': True, 'tare': 'GROSS', 'weight': '1.036', 'units': 'kg'}}
        jsondata = json.dumps(jsondata)
        print(jsondata)   
        result = client.publish(topic, jsondata)
        status = result[0]
        if status == 0:
            print(f"Send `{msg}` to topic `{topic}`")
            c+=1
        else:
            print(f"Failed to send message to topic {topic}")



def run():
    client = connect_mqtt()
    client.loop_start()
    publish(client)


if __name__ == '__main__':
    run()