#include "assertion.h"
#ifdef ASSERT_ENABLED
   #include "actuators/leds.h"
   #include "communication/debug.h"
   #define ASSERT_LED_PIN 2
   #define ASSERT_LOOP_MSG_INTERVAL 800
   #define ASSERT_LED_INTERVAL 500
   
   bool blink = false;
   bool msgSent = false;
   bool ledSet = false;

   void assertLoop(String msg){
      String debugString = "Assert! " + msg;
      while (1)
      {
         if (millis() % ASSERT_LOOP_MSG_INTERVAL == 0) 
         {
            if (!msgSent) 
            {
               Debugging::debug(debugString);
               msgSent = true;
            }
         } 
         else msgSent = false;
         
         if (millis() % ASSERT_LED_INTERVAL == 0) 
         {
            if (!ledSet) 
            {
               LEDS::invert(LEDS::LED::ASSERT);
               ledSet = true;
            }
         } 
         else ledSet = false;
      }
   }
   
#else 
   void assertLoop(String msg){};
#endif
