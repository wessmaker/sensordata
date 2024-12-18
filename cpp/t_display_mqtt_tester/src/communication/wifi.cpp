#include "wifi.h"
#include <WiFi.h>
#include "debug.h"
#include "util/credentials.h"

#define WIFI_CONNECTION_INTERVAL 2500
Communication::Status wifiStatus = Communication::UNKNOWN;
bool infoSent = false;
bool triedWifi = false;

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
      wifiStatus = WiFi.isConnected() ? 
                  Communication::CONNECTED : 
                  Communication::DISCONNECTED;
      if (!WiFi.isConnected() &! triedWifi && millis() % WIFI_CONNECTION_INTERVAL < 50)
      {
         wifiStatus = Communication::DISCONNECTED;
         WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
      }
      else if (triedWifi) triedWifi = false;
   }

   Communication::Status getStatus(){
      return wifiStatus;
   }

   void _offLoop(){ 
      if (WiFi.isConnected()) WiFi.disconnect(); 
      else if (wifiStatus != Communication::DISCONNECTED) wifiStatus = Communication::DISCONNECTED;
   }

}