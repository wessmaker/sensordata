#pragma once 
#ifndef UI_H
#define UI_H
#include "TFT_eSPI.h"

#define DISPLAY_ROTATION 1

#define UI_CONNECTION_ITEM_WIDTH 40

#define UI_MENU_ITEM_SPACING 2
#define UI_MENU_HEIGHT TFT_WIDTH - UI_MENU_ITEM_SPACING
#define UI_MENU_WIDTH TFT_HEIGHT - UI_CONNECTION_ITEM_WIDTH
#define UI_MENU_ITEM_COUNT 3
#define UI_MENU_ITEM_FOCUS_TRAVERSE 10
#define UI_MENU_ITEM_DEFAULT_X 5
#define UI_MENU_ITEM_HEIGHT (UI_MENU_HEIGHT / UI_MENU_ITEM_COUNT) - (UI_MENU_ITEM_SPACING * 2)
#define UI_MENU_ITEM_WIDTH UI_MENU_WIDTH - (UI_CONNECTION_ITEM_WIDTH * (3 / 2))
#define UI_MENU_ITEM_FONT_SIZE 5

#define UI_TRANSPARENCY_COLOR TFT_PURPLE
namespace UI{
   



   enum State{
      SELECTING,
      FULL_SCREEN,
      SCREEN_SAVER,
      OFF
   };

   void init();
   void loop();
   void refresh();
   void toggleFullScreen();
   State getState();
   void setState(State);
   TFT_eSPI* getTFT();

}

#endif