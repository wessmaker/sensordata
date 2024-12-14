#include <Arduino.h>
#include "debug.h"

bool debugging;

namespace Debugging{
   
   void init(){
      debugging = true;
   }
   void loop(){

   }

   void debug(const String message){
      if (debugging){
         Serial.println(message);
      }
   }

   void debug(const int message){
      if (debugging){
         Serial.println(message);
      }
   }
   
}