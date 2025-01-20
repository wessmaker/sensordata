#pragma once 
#ifndef LEDS_H
#define LEDS_H
#include "util/assertion.h"

namespace LEDS{

   enum LED_PIN{
      BLUE = 33,
      RED = 26,
      WHITE = 25,
      YELLOW = 27,
      ASSERT = 2,
   };

   void init();
   void loop();
   void set(LED_PIN, bool state);
   void invert(LED_PIN);
   void ledMQTTCallback(char*, uint8_t*, unsigned int);
}
#endif