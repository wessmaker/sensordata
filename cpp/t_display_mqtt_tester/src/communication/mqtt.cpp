#include "mqtt.h"
#include "wifi.h"
#include "util/credentials.h"
#include <PubSubClient.h>
#include <WiFi.h>
#include "debug.h"

#define MQTT_CONNECTION_INTERVAL 2000
#define MQTT_DISCONNECTED_INFO_INTERVAL 3000

/* Note: 
   When using WiFiClient there is no reason to set the client of PubSubClient.
   There is no way to automaticly make PubSubClient connect to wifi according to it's constructor implementation
*/
PubSubClient mqttClient = PubSubClient();
bool mqttInterval = false;
bool disconnectedInfoSent = false;
Communication::Status mqttStatus;

/* Note:
         mqttClient tries to connect to broker in the if-statement.
         If already connected then returns true and does nothing (PubSubClient implementation)

         this loop function will only set the debug msg when connection status changes 
         (Communication's mqttStatus doesn't match mqttclient's connection status)
*/
void wifiConnectedLoop(){
   if (millis() % MQTT_CONNECTION_INTERVAL < 50)
   {
      String msg;
      if (mqttInterval){/*Do nothing until next interval*/}
      else if (mqttClient.connect(MQTT_ID, MQTT_USER, MQTT_PASSWORD) && mqttStatus != Communication::CONNECTED)
      {
         msg = "Broker: " + MQTT_BROKER_IP.toString() + " is connected";
         mqttStatus = Communication::CONNECTED;
      }
      else if (mqttStatus != Communication::DISCONNECTED)
      {
         msg = "Connecting to MQTT broker: " + MQTT_BROKER_IP.toString();
         mqttStatus = Communication::DISCONNECTED;
      }
      Debugging::debug(msg);
      mqttInterval = true;
   } 
   else if (mqttInterval) mqttInterval = false;
}


void wifiDisConnectedLoop(){
   if (mqttStatus == Communication::CONNECTED)
   {
      mqttClient.disconnect();
      mqttStatus = Communication::DISCONNECTED;
   }
   else if (millis() % MQTT_CONNECTION_INTERVAL < 50)
   {
      if (!mqttInterval)
      {
         Debugging::debug("MQTT is disconnected due to WIFI being disconnected");
         mqttInterval = true;
      }
   }
   else if (mqttInterval) mqttInterval = false;
}



namespace MQTT{
   
   void init(){
      mqttClient.setServer(MQTT_BROKER_IP, MQTT_BROKER_PORT);
   };
   
   void loop(){
      switch (Wifi::getStatus())
      {
         case Communication::CONNECTED: 
            wifiConnectedLoop();
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


