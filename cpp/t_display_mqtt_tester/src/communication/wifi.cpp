#include "wifi.h"
#include <WiFi.h>
#include "debug.h"
#include "util/credentials.h"

Communication::Status status = Communication::UNKNOWN;

bool infoSent = false;

#define WIFI_CONNECTION_INTERVAL 1000

namespace Wifi{

   void init(){
   };

   void loop(){
      wifiSerialInfo();
      if (WiFi.isConnected())
      {
         status = Communication::CONNECTED;
      }
      else
      {
         status = Communication::DISCONNECTED;
         WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
      }
   }

   Communication::Status getStatus(){
      return status;
   }
}


void wifiSerialInfo(){
   if (millis() % WIFI_CONNECTION_INTERVAL == 0)
   {  //.begin() will take some time so no need to prevent multiple runs per interval
      if (!WiFi.isConnected())
      {
         Debugging::debug("CONNECTING WIFI : ", WIFI_SSID);
      }
      else if (!infoSent)
      {
         Debugging::debug("WIFI CONNECTED: ", WIFI_SSID, ", ", "IP: ", WiFi.localIP());
         infoSent = true;
      }
   } infoSent = false;
}
