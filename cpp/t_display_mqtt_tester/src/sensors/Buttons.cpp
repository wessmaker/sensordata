#include <Button2.h>
#include "Buttons.h"
#include "controller/controller.h"
#include "display/ui.h"
#include "communication/communication.h"
#include "communication/debug.h"


#define EXT_BUTTON 37


Button2 leftButton;
Button2 rightButton;
Button2 extButton1;

bool runOnRelease = false;

u_long timer = 0;
u_int16_t timeToStop = 1000;  // 1s
u_int16_t timeToStart = 1500; // 1.5s


void _emptyHandler(Button2& b){};

void buttonClickLeft(Button2& b){
   Debugging::debug("Left button tap");
   UI::menuMove(UI::DOWN);
}

void buttonClickRight(Button2& b){
   Debugging::debug("Right button tap");
   UI::menuMove(UI::UP);
}

void buttonClickExt1(Button2& b){
   Debugging::debug("External button tap");
}

void removeHandlers(){
   leftButton.setTapHandler(_emptyHandler);
   rightButton.setTapHandler(_emptyHandler);
   extButton1.setTapHandler(_emptyHandler);
}

// Handles double press of 2 onboard buttons
// Handled only when board is started eg. running
void handleDoublePress(){
   if (leftButton.isPressed() && rightButton.isPressed() && Controller::isRunning())
   {
      if (!timer) timer = millis();  
      if (millis() - timer >= timeToStart) 
      {
         runOnRelease = true;
         removeHandlers();
         UI::setState(UI::STOPPING);
      }
   }
   else if (!(leftButton.isPressed() || rightButton.isPressed()) && runOnRelease)   // Stopping after releasing both buttons
   {
      runOnRelease = false;
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
      leftButton.setTapHandler(buttonClickLeft);
      rightButton.setTapHandler(buttonClickRight);
      extButton1.setTapHandler(buttonClickExt1);
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
         if (millis() - timer >= timeToStop)
         {
            runOnRelease = true;
            UI::setState(UI::STARTING);
         }
      }
      else if (!(leftButton.isPressed() || rightButton.isPressed()) && runOnRelease)   // Starting after releasing both buttons
      {
         runOnRelease = false;
         timer = 0;
         Controller::start();
      }
      else if (timer) timer = 0; // Reset timer
   }
}