#include "wifi.h"
#include <WiFi.h>
Communication::Status status = Communication::Status::UNKNOWN;
#include "debug.h"


String SSID = "", pswd = "";  // Set credentials 

namespace Wifi{
   void init(){
      WiFi.begin(SSID, pswd);
   };
   void loop(){
      if (WiFi.isConnected())
      {
         Debugging::debug((String)WiFi.localIP());
      }
   }

   Communication::Status getStatus(){
      return status;
   }
}
