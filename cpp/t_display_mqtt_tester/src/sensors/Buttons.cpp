#include <Button2.h>
#include "Buttons.h"
#include "board/board.h"
#include "display/ui.h"
#include "communication/communication.h"
#include "communication/debug.h"


#define EXT_BUTTON 37

Button2 left_button;
Button2 right_button;
Button2 extButton1;

u_long currentTime = 0;
u_long timePassed = 0;

u_int16_t startPressTime = 1000;
u_int16_t stopPressTime = 1500;


void handleLeftRightDoublePress(){
   if (left_button.isPressed() && right_button.isPressed())
   {
      if (!currentTime) currentTime = millis();
      timePassed = millis() - currentTime;
      if (timePassed >= stopPressTime) Board::stop();
   }
   else 
   {
      currentTime = 0;
      timePassed = 0;
   }
}


void leftButtonClick(Button2& b){
   Debugging::debug("Left button tap");
}



void rightButtonClick(Button2& b){
   Debugging::debug("Right button tap");

}

void extButton1Click(Button2& b){
   Debugging::debug("External button tap");
}


namespace Buttons{
   void init(){
      left_button.begin(LEFT_BUTTON);
      right_button.begin(RIGHT_BUTTON);
      extButton1.begin(EXT_BUTTON);
      left_button.setTapHandler(leftButtonClick);
      right_button.setTapHandler(rightButtonClick);
      extButton1.setTapHandler(extButton1Click);
   }

   void loop(){
      left_button.loop();  
      right_button.loop();  
      extButton1.loop();
      handleLeftRightDoublePress();
   }

   void _offLoop(){
      left_button.loop();  
      right_button.loop();
      if (left_button.isPressed() && right_button.isPressed())
      {
         if (!currentTime) currentTime = millis();
         timePassed = millis() - currentTime;
         if (timePassed >= startPressTime) Board::start();
      }
      else 
      {
         currentTime = 0;
         timePassed = 0;
      }
   }
}