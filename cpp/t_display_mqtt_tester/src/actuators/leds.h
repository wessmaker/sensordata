#pragma once 
#ifndef LEDS_H
#define LEDS_H




namespace LEDS{

   enum LED{
      BLUE = 27,
      RED = 25,
      WHITE = 26,
      YELLOW = 33,
      LAST
   };

   void init();
   void loop();
   void ON(LED);
   void OFF(LED);
}




#endif