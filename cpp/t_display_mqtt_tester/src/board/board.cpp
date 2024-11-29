#include <Arduino.h>
#include "board.h"
#include "communication/debug.h"

bool running;

namespace Board {

   void init(){
      start();
   }   
   void start(){
      Debugging::debug("Board start!");
      running = true;
   }
   void stop(){
      Debugging::debug("Board stop!");
      running = false;
   }
   bool isRunning(){
      return running;
   }
}
