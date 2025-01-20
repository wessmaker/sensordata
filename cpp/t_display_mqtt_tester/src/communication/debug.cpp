#include <Arduino.h>
#include "debug.h"

bool debugging;

namespace Debugging{
   
   void init(){
      debugging = true;
   }
   void loop(){

   }

   void debug(const String msg){
      if (debugging) Serial.println(msg);
   }

   void debug(const int msg){
      if (debugging) Serial.println(msg);
   }
   
}