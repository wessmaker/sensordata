#include "mqtt.h"
#include "wifi.h"
#include "util/credentials.h"
#include <PubSubClient.h>
#include <WiFi.h>
#include "debug.h"
#include "util/assertion.h"

#define MQTT_CONNECTION_INTERVAL 2500

WiFiClient wifiClient;
PubSubClient mqttClient = PubSubClient(wifiClient);
bool mqttInterval = false;
bool disconnectedInfoSent = false;
bool subscriptionsSet = false;
String debugMsg = "";
Communication::Status mqttStatus = Communication::UNKNOWN;
char* subdTopics[4] = {
                        "/devices/esp32/leds/white",
                        "/devices/esp32/leds/yellow",
                        "/devices/esp32/leds/green",
                        "/devices/esp32/leds/red"
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


int* parseJson(uint8_t* dataAddr, unsigned int dataLen){
   int maxCount = 6;
   bool isJson = false;
   String data[2][maxCount]; 
   u_int32_t keyStart = -1;
   u_int32_t valStart = 0;
   u_int32_t valIndex = 0;
   for (int i = 0; i < dataLen; i++)
   {
      char loopChar = (char)dataAddr[i];
      if (loopChar == '{' && i < 2) isJson = true;
      else if (!isJson) return (int*)"NON JSON DATA";
      if (!data[0][valIndex]) //TODO fix this
      {
         if (loopChar == '\"' &! keyStart) keyStart = i + 1;
         else if (i >= keyStart && loopChar != '\"')
         {
            data[0][valIndex] += loopChar;
         }
         else if (keyStart) keyStart = -1;
      }
      else if (!data[1][valIndex])
      {
         if (loopChar == '\"' ) valStart = i + 1;
         else if (loopChar != ' ') valStart;
         data[1][valIndex] += loopChar;
      }
      else if (valIndex < maxCount ) valIndex++;
      else return (int*)data;
   }
}




void onMqttReceive(char* topic, uint8_t* payload, unsigned int lenght){
   String parsedPayload;

   for (int i = 0; i < lenght; i++)
   {
      parsedPayload += (char)payload[i];
   }
   

   Debugging::debug(parsedPayload);
}



void mqttDataHandeling(){
   // After this handeling disconnection in MQTT::loop()
   if (!subscriptionsSet)
   {
      for (char* topic : subdTopics) mqttClient.subscribe(topic);
      mqttClient.subscribe("/devices/esp32/leds/white");
      mqttClient.setCallback(onMqttReceive);
      subscriptionsSet = true;
   }
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
               if (mqttStatus == Communication::CONNECTED) mqttDataHandeling();  //This should be cleaned
               connectBroker();               
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