#include <Button2.h>
#include "Buttons.h"
#include "controller/controller.h"
#include "display/ui.h"
#include "communication/communication.h"
#include "communication/debug.h"


Button2 leftButton;
Button2 rightButton;
Button2 extButton1;
u_long timer = 0;
u_int16_t startPressTime = 1000;
u_int16_t stopPressTime = 1500;
bool runAfter = false;
#define EXT_BUTTON 37


void _noneHandler(Button2& b){};


void leftButtonClick(Button2& b){
   Debugging::debug("Left button tap");
   UI::menuMove(UI::DOWN);
}


void rightButtonClick(Button2& b){
   Debugging::debug("Right button tap");
   UI::menuMove(UI::UP);
}


void extButton1Click(Button2& b){
   Debugging::debug("External button tap");
}


void removeHandlers(){
   leftButton.setTapHandler(_noneHandler);
   rightButton.setTapHandler(_noneHandler);
   extButton1.setTapHandler(_noneHandler);
}

// Handles double press of 2 onboard buttons
// Handled only when board is started eg. running
void handleDoublePress(){
   if (leftButton.isPressed() && rightButton.isPressed() && Controller::isRunning())
   {
      if (!timer) timer = millis();  
      if (millis() - timer >= stopPressTime) 
      {
         runAfter = true;
         removeHandlers();
         UI::setState(UI::STOPPING);
      }
   }
   else if (!(leftButton.isPressed() || rightButton.isPressed()) && runAfter)   // Stopping after releasing both buttons
   {
      runAfter = false;
      timer = 0;
      Controller::stop();
   }
   else if (timer) timer = 0;   // Reset timer
}



namespace Buttons{


   void init(){
      leftButton.begin(LEFT_BUTTON);
      rightButton.begin(RIGHT_BUTTON);
      extButton1.begin(EXT_BUTTON);
      leftButton.setTapHandler(leftButtonClick);
      rightButton.setTapHandler(rightButtonClick);
      extButton1.setTapHandler(extButton1Click);
   }


   void loop(){
      leftButton.loop();  
      rightButton.loop();  
      extButton1.loop();
      handleDoublePress();
   }





   /**
    * Only handle pressing of both buttons at the same time for given time
    * Start board if pressed long enough
    */
   void _offLoop(){
      leftButton.loop();  
      rightButton.loop();
      if (leftButton.isPressed() && rightButton.isPressed() && !Controller::isRunning())
      {
         if (!timer) timer = millis();  
         if (millis() - timer >= startPressTime)
         {
            runAfter = true;
            UI::setState(UI::STARTING);
         }
      }
      else if (!(leftButton.isPressed() || rightButton.isPressed()) && runAfter)   // Starting after releasing both buttons
      {
         runAfter = false;
         timer = 0;
         Controller::start();
      }
      else if (timer) timer = 0; // Reset timer
   }


}