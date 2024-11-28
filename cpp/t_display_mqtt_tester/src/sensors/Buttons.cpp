#include <Button2.h>
#include "Buttons.h"
#include "board/board.h"

Button2 left_button;
Button2 right_button;

u_long currentTime = 0;
u_long timePassed = 0;


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


void handleDoublePress(){
   if (left_button.isPressed() && right_button.isPressed())
   {
      if (!currentTime) currentTime = millis();                         //Capture current time if it's zero
      timePassed = millis() - currentTime;
      if (Board::isRunning && timePassed >= Board::getStopTime) {    //Shutdown board
         Board::stop;
         currentTime = 0;
      }
      if (!Board::isRunning && timePassed >= Board::getStartTime) {    //Power board
         Board::start;
         currentTime = 0;
      }
   }else{
      if (currentTime) currentTime = 0;
   }
}



void leftButtonClick(Button2& b){

}


void rightButtonClick(Button2& b){

}
