#include "board.h"

bool running;

namespace Board {

   void init(){
      start();
   }   
   void start(){
      running = true;
   }
   void stop(){
      running = false;
   }
   bool isRunning(){
      return running;
   }
}
