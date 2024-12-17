#include "wifi.h"
#include <WiFi.h>
#include "debug.h"
#include "util/credentials.h"

#define WIFI_CONNECTION_INTERVAL 2500
Communication::Status status = Communication::UNKNOWN;
bool infoSent = false;
bool triedConnection = false;
WiFiClient wificlient;

void wifiSerialInfo(){
   if (millis() % WIFI_CONNECTION_INTERVAL <= 50 && !infoSent)
   {
      String msg = WiFi.isConnected() ? 
                     "WIFI CONNECTED: " + (String)WIFI_SSID + ", " + "IP: " + (String)WiFi.localIP() :   //TODO FIX IP PRINTING FORMAT 
                     "CONNECTING WIFI: " + (String)WIFI_SSID;
      Debugging::debug(msg);
      infoSent = true;
   }
   else if (infoSent) infoSent = false;
}

namespace Wifi{

   void init(){
   };

   void loop(){
      wifiSerialInfo();
      status = WiFi.isConnected() ? 
                  Communication::CONNECTED : 
                  Communication::DISCONNECTED;
      if (!WiFi.isConnected() && !triedConnection && millis() % WIFI_CONNECTION_INTERVAL < 50)
      {
         status = Communication::DISCONNECTED;
         WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
      }
      else if (triedConnection) triedConnection = false;
   }

   Communication::Status getStatus(){
      return status;
   }

   void _offLoop(){ 
      if (WiFi.isConnected()) WiFi.disconnect(); 
      else if (status != Communication::DISCONNECTED) status = Communication::DISCONNECTED;
   }

   // WiFiClient* getClient(){   //TODO FIX THIS GETTER FOR MQTT CLIENT, IF NOTHING WORKS USE GLOBAL VARIABLE
   //    return &wificlient;
   // }

}