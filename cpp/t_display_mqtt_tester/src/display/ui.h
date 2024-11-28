#pragma once 
#ifndef UI_H
#define UI_H
#include <TFT_eSPI.h>

namespace UI{

   enum Direction{
      UP,
      DOWN
   };


   enum State{
      SELECTING,
      FULL_SCREEN,
      SCREEN_SAVER,
      OFF
   };

   void init();
   void loop();
   void refresh();
   void move(Direction);
   void toggleFullScreen();
   State getState();
   TFT_eSPI getTFT();

}

#endif