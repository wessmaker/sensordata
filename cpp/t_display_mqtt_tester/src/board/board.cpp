#include "board.h"

bool running;
u_long startTime = 500;
u_long stopTime = 2000;

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
   u_long getStartTime(){
      return startTime;
   };
   u_long getStopTime(){
      return stopTime;
   };
}
