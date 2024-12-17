#pragma once 
#ifndef LEDS_H
#define LEDS_H
#include "util/assertion.h"




namespace LEDS{

   enum LED{
      BLUE = 25,
      RED = 26,
      WHITE = 27,
      YELLOW = 33,
      ASSERT = 2,
      LAST
   };

   void init();
   void loop();
   void ON(LED);
   void OFF(LED);
   void invert(LED);
}
#endif