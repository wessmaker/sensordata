#ifndef BOARD_H
#define BOARD_H
#include <Arduino.h>
   namespace Board{
      void init();
      void start();
      void stop();
      bool isRunning();
      u_long getStartTime();
      u_long getStopTime();
   }

#endif