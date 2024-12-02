#pragma once 
#ifndef UI_H
#define UI_H
#include "TFT_eSPI.h"

#define DISPLAY_ROTATION 1
#define UI_CONNECTION_ITEM_WIDTH 40
#define UI_MENU_HEIGHT TFT_WIDTH - 10
#define UI_MENU_WIDTH TFT_HEIGHT - UI_CONNECTION_ITEM_WIDTH
#define UI_MENU_ITEM_COUNT 3
#define UI_MENU_ITEM_FOCUS_TRAVERSE 30
#define UI_MENU_ITEM_DEFAULT_X 5
#define UI_MENU_ITEM_FOCUS_X UI_MENU_ITEM_DEFAULT_X + UI_MENU_ITEM_FOCUS_TRAVERSE 
#define UI_MENU_ITEM_HEIGHT 31   // = (UI_MENU_HEIGHT / UI_MENU_ITEM_COUNT) - (UI_MENU_ITEM_SPACING * 2)
#define UI_MENU_ITEM_WIDTH UI_MENU_WIDTH - (UI_CONNECTION_ITEM_WIDTH * 3 / 2)
#define UI_MENU_ITEM_FONT_SIZE 4
#define UI_TRANSPARENCY_COLOR TFT_PURPLE
#define UI_MENU_ITEM_SPACING ((float)UI_MENU_HEIGHT - (UI_MENU_ITEM_COUNT * UI_MENU_ITEM_HEIGHT)) / ((float)UI_MENU_ITEM_COUNT)
#define UI_MENU_START_Y ((float)(TFT_WIDTH - UI_MENU_HEIGHT)) / 2


#define UI_MENU_ITEM_ROUNDNESS 10
#define UI_MENU_ITEM_RECT_COLOR TFT_RED
namespace UI{

   enum State{
      MENU,
      FULL_SCREEN,
      STARTING,
      STOPPING,
      OFF
   };

   enum Direction{
      UP,
      DOWN
   };

   void init();
   void loop();
   State getState();
   void setState(State);
   void menuMove(Direction);
}

#endif