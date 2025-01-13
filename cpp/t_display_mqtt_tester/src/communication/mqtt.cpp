#include "mqtt.h"
#include "wifi.h"
#include "util/credentials.h"
#include <PubSubClient.h>
#include <WiFi.h>
#include "debug.h"
#include "util/assertion.h"
#include "actuators/leds.h"

#define MQTT_CONNECTION_INTERVAL 2500

WiFiClient wifiClient;
PubSubClient mqttClient = PubSubClient(wifiClient);
bool mqttInterval = false;
bool disconnectedInfoSent = false;
bool subscriptionsSet = false;
String debugMsg = "";
Communication::Status mqttStatus = Communication::UNKNOWN;

char* topicList[4] = 
   {
      "/devices/lilygo/actuators/leds/yellow",
      "/devices/lilygo/actuators/leds/red",
      "/devices/lilygo/actuators/leds/blue",
      "/devices/lilygo/actuators/leds/white",
   };


void connectBroker(){
   if (millis() % MQTT_CONNECTION_INTERVAL < 20)
   {
      ASSERT(MQTT_ID && MQTT_USER && MQTT_PASSWORD, "Missing MQTT credential in connectBroker()");
      if (mqttClient.connected())
      {
         if (mqttStatus != Communication::CONNECTED) mqttStatus = Communication::CONNECTED;
         debugMsg = "MQTT broker connected: " + (String)MQTT_BROKER_IP + ":" + MQTT_BROKER_PORT;
      }
      else
      {
         if (mqttStatus != Communication::DISCONNECTED) mqttStatus = Communication::CONNECTED;
         mqttClient.connect(MQTT_ID, MQTT_USER, MQTT_PASSWORD);
         debugMsg = "Connecting to MQTT broker: " + (String)MQTT_BROKER_IP + ":" + MQTT_BROKER_PORT;
      }
      if (!mqttInterval) Debugging::debug(debugMsg);
      mqttInterval = true;
   } 
   else if (mqttInterval) mqttInterval = false;
}


void wifiDisConnectedLoop(){
   if (subscriptionsSet) subscriptionsSet = false;

   if (mqttStatus == Communication::CONNECTED)
   {
      mqttClient.disconnect();
      mqttStatus = Communication::DISCONNECTED;
   }
   else if (millis() % MQTT_CONNECTION_INTERVAL < 50)
   {
      if (!mqttInterval) Debugging::debug("MQTT is disconnected due to WIFI being disconnected");
      mqttInterval = true;
   }
   else if (mqttInterval) mqttInterval = false;
}


/*
   Note! 
   This function will be called by default (PubSubClient propably) once initial subscriptions
   done, that will make sure to syncronize existing data in broker. That's why there is no initial
   data fetching from broker implemented.
*/
void onDataReceive(char* topic, uint8_t* payload, unsigned int lenght){
   std::string topicPath;
   for (int i = 0; topic[i]; i++)
   {
      topicPath += topic[i];
      if (topicPath == "/devices/lilygo/actuators/leds/"){
         LEDS::ledMQTTCallback(topic, payload, lenght);
         return;
      }
   }
}


void subscribeTopics(){
      Debugging::debug("SETTING TOPICS TO SUB");
      for (char* loopedTopic : topicList) mqttClient.subscribe(loopedTopic);
      Debugging::debug("TOPICS ARE SET!");
      mqttClient.setCallback(onDataReceive);
      Debugging::debug("MQTT CALLBACK FUNCTION IS SET!");
      subscriptionsSet = true;
   }


namespace MQTT{
   
   void init(){
      mqttClient.setServer(MQTT_BROKER_IP, MQTT_BROKER_PORT);
   };
   
   void loop(){
      switch (Wifi::getStatus())
      {
         case Communication::CONNECTED: 
               mqttClient.loop();
               connectBroker();
               if (mqttStatus == Communication::CONNECTED && !subscriptionsSet) subscribeTopics();
            break;
         case Communication::DISCONNECTED: 
            wifiDisConnectedLoop();
            break;
         default:
            break;
      }
   };

   Communication::Status getStatus(){
      return mqttStatus;
   };
}