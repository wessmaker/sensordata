#include "ui.h"
#include <TFT_eSPI.h>
#include "communication/communication.h"
#include "communication/debug.h"

#define MARIGIN_RIGHT 30
TFT_eSPI tft = TFT_eSPI(TFT_WIDTH, TFT_HEIGHT);


void clear_screen(){
   tft.fillScreen(TFT_BLACK);
}


void defaultScreen(){

   for (int i = 1; i <= 2; i++) {

   }
}


void screenOFF(){
   Debugging::debug("Set screen OFF");
   digitalWrite(TFT_BL, LOW);  //Backlight off

}
namespace UI{

   State state;

   void init(){
      tft.setRotation(0);  // position (0, 0) is at the bottom left when buttons are on right (horizontal)
      tft.init();
      tft.fillScreen(TFT_GREEN);
      defaultScreen();
   }

   State getState(){
      return state;
   }
   
   void loop(){
   };

   void setState(State state){
      switch (state){
         case SELECTING:
            break;
         case FULL_SCREEN:
            break;
         case SCREEN_SAVER:
            break;
         case OFF:
            break;
         default:
            break;
      }
   
   }
   void refresh(){};
   void move(Direction){};
   void toggleFullScreen(){};
}



