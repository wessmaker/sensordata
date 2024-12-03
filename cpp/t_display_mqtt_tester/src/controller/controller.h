#ifndef BOARD_H
#define BOARD_H
#include <Arduino.h>
   namespace Controller{
      void init();
      void loop();
      void start(bool firstRun = false);
      void stop();
      void backLight(bool);
      bool isRunning();
   }

#endif