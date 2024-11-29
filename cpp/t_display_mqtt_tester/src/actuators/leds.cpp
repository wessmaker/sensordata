#include "leds.h"
#include <Arduino.h>


namespace LEDS{
   void init(){
      for (int loopLED = BLUE; loopLED != LAST; loopLED++)
      {
         pinMode(loopLED, OUTPUT);
      }
   }

   void loop() {}

   void ON(LED led){
      digitalWrite(led, HIGH);
   }

   void OFF(LED led){
      digitalWrite(led, LOW);
   }
}

