#include "leds.h"
#include <Arduino.h>

namespace LEDS{
   void init(){
      pinMode(LED::BLUE, OUTPUT);
      pinMode(LED::RED, OUTPUT);
      pinMode(LED::WHITE, OUTPUT);
      pinMode(LED::YELLOW, OUTPUT);
      #ifdef ASSERT_ENABLED
         pinMode(LED::ASSERT, OUTPUT);
      #endif
   }

   void loop() {}

   void ON(LED led){
      digitalWrite(led, HIGH);
   }

   void OFF(LED led){
      digitalWrite(led, LOW);
   }

   void invert(LED led){
      digitalWrite(led, !digitalRead(led));
   }

}