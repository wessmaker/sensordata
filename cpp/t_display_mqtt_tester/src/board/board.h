#ifndef BOARD_H
#define BOARD_H
#include <Arduino.h>
   namespace Board{
      void init();
      void loop();
      void start();
      void stop();
      bool isRunning();
   }

#endif