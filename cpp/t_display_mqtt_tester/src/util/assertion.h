#ifndef ASSERTION_H
#define ASSERTION_H


   //--------- Assert on/off ---------//
   //Comment out to disable asserts of whole firmware
   #define ASSERT_ENABLED  
   //--------- Assert on/off ---------//
   
   
   #include <Arduino.h>
    
   #ifdef ASSERT_ENABLED
      #define ASSERT(expression, msg)        \
      do {                                   \
         if (!expression)                    \
         {                                   \
            assertLoop(msg);                 \
         }                                   \
                                             \
      }while (0)

   #else
      #define ASSERT(expression, msg)
   #endif

   void assertLoop(String);   //Always give header to this function, impl is empty in .cpp if !ASSERT_ENABLED
#endif