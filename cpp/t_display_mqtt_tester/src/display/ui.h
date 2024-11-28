#pragma once 
#ifndef UI_H
#define UI_H

namespace UI{

   enum State{
      MENU,
      ITEM,
      START_SCREEN,
      SCREEN_SAVER
   };


   void init();
   void loop();
   void refresh();
   UI::State getState();
}




#endif