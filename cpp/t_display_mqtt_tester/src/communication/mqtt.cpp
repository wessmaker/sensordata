#include "mqtt.h"
#include "wifi.h"
#include ""

namespace MQTT{
   Communication::Status status = Communication::UNKNOWN;
   void init(){};
   
   
   void loop(){
      if (Wifi::getStatus() == Communication::CONNECTED)
      {
         
      }
      else
      {

      }
      

   };


   Communication::Status getStatus(){
      return status;
   };
   
}
