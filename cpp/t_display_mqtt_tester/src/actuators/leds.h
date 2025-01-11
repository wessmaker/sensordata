#pragma once 
#ifndef LEDS_H
#define LEDS_H
#include "util/assertion.h"

namespace LEDS{

   enum LED_PIN{
      BLUE = 25,
      RED = 26,
      WHITE = 27,
      YELLOW = 33,
      ASSERT = 2,
   };

   void init();
   void loop();
   void ON(LED_PIN);
   void OFF(LED_PIN);
   void invert(LED_PIN);
   void handleMQTTDataChange(char*, uint8_t*);
}
#endif