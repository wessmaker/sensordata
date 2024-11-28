#include "ui.h"
#include <TFT_eSPI.h>
#include "communication/communication.h"
#define MARIGIN_RIGHT 30


TFT_eSPI tft = TFT_eSPI(TFT_WIDTH, TFT_HEIGHT);


void clear_screen(){
   tft.fillScreen(TFT_BLACK);
}


void defaultScreen(){
   tft.fillScreen(TFT_RED);
   for (int i = 1; i <= 2; i++) {
      //TODO: Fix menu lines with rotation
      tft.drawLine(0, TFT_HEIGHT / 3 * i, TFT_WIDTH - MARIGIN_RIGHT, TFT_HEIGHT / 3 * i, TFT_WHITE);
   }
}

namespace UI{

   State state;

   void init(){
      tft.setRotation(0);  //TODO: Fix rotation to be horizontal with buttons on right
      tft.init();
      tft.fillScreen(TFT_GREEN);
      defaultScreen();
   }

   State getState(){
      return state;
   }
   
   void loop(){
   };


   void refresh(){};
   void move(Direction){};
   void toggleFullScreen(){};
}