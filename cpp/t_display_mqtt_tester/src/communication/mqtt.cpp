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


char*** parseJson(uint8_t* dataAddr){
   if (dataAddr[0] != ('{')) return 0;   //Dumb way to check if not json as 

   bool colonFound = false;
   const int pairCount = 4;
   const int pairSize = 2;
   const int buffSize = 20;
   int i = 0, j = 0, k = 0, itr = 0;
   char* keyVal[pairCount][pairSize][buffSize]; // i, j, k

   // Run until out of bounds 
   while (i < pairCount || j < pairSize || k < buffSize)
   {
      // Returning when finished parsing
      if (dataAddr[itr] != '}') 

      {
         //TODO IIMPLEMENT RETURNING
      }  

      while (dataAddr[itr] != '\"') itr++;            //Find name starting "
      itr++;                                          // Get index of names first char
      while (dataAddr[itr] != '\"')
      {
         keyVal[i][0][k] = (char*)(dataAddr + itr);   // Get the char address without dereferencing it in the process (not (*(dataAddr + itr)))
         itr++;
         k++;
      }
      
      // Name is stored and itr is now '"'
      itr++;
      while (dataAddr[itr] != '\"') {
         itr++;
         if (dataAddr[itr] == ':') colonFound = true;
      }
      
      if (!colonFound) return 0;                      // Didn't found the ':' so returning error
      
      // Colon is found and itr is now '"' 
      itr++;
      while (dataAddr[itr] != '\"') itr++;

      
      itr++;   // Store the index of first char of value
      k = 0;   // Reset keyVal string iterator 
      while (dataAddr[itr] != '\"')
      {
         keyVal[i][1][k] = (char*)(dataAddr + itr);   // Get the char address without dereferencing it in the process (not (*(dataAddr + itr)))
         itr++;
         k++;
      }
   }
   return 0;
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