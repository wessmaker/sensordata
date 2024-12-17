#include <Arduino.h>
#include "debug.h"

bool debugging;

namespace Debugging{
   
   void init(){
      debugging = true;
   }
   void loop(){

   }

   void debug(const String input){
      if (debugging){
         String output;
         for (auto& looped : input)
         {
            output += looped;
         }
         Serial.println(output);
      }
   }

   void debug(const int message){
      if (debugging){
         Serial.println(message);
      }
   }
   
}