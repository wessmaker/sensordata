#include <Arduino.h>
#include "debug.h"

bool debugging;

namespace Debugging{
   void init(){
      debugging = true;
   }
   void loop(){
   }
   bool isOn(){
      return debugging;
   }
   void debug(const String message){
      if (isOn()){
         Serial.println(message);
      }
   }   
   void debug(const int message){
      if (isOn()){
         Serial.println(message);
      }
   }
}