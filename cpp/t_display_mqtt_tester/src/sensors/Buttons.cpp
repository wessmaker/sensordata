#include <Button2.h>
#include "Buttons.h"
#include "board/board.h"
#include "display/ui.h"
#include "communication/communication.h"


Button2 left_button;
Button2 right_button;
u_long currentTime = 0;
u_long timePassed = 0;
u_long startPressTime = 500;
u_long stopPressTime = 1500;


void handleDoublePress(){
   if (left_button.isPressed() && right_button.isPressed())
   {
      if (!currentTime) currentTime = millis();                   //Capture current time if it's zero
      timePassed = millis() - currentTime;
      if (!Board::isRunning && timePassed >= startPressTime) {    //Power board
         Board::start;
         currentTime = 0;
      }
      if (Board::isRunning && timePassed >= stopPressTime) {      //Shutdown board
         Board::stop;
         currentTime = 0;
      }
   }else{
      if (currentTime) currentTime = 0;
   }
}


void leftButtonClick(Button2& b){
   Communication::write(Communication::_SERIAL, 100);
   
}


void rightButtonClick(Button2& b){
}


namespace Buttons{
   void init(){
      left_button.begin(LEFT_BUTTON);
      right_button.begin(RIGHT_BUTTON);

      left_button.setTapHandler(leftButtonClick);
      right_button.setTapHandler(rightButtonClick);
   }

   void loop(){
      left_button.loop();  
      right_button.loop();  
      handleDoublePress();
   }
}