#include <Button2.h>
#include "Buttons.h"
#include "controller/controller.h"
#include "display/ui.h"
#include "communication/rxtx.h"
#include "communication/debug.h"


#define EXT_BUTTON 37


Button2 leftButton;
Button2 rightButton;
Button2 extButton1;

bool stopOnRelease = false;
bool startOnRelease = false;
bool itemOnRelease = false;

u_long timer = 0;
u_int16_t timeToStop = 1000;  // 1s
u_int16_t timeToStart = 1500; // 1.5s
u_int16_t timeToItem = 50;


void _emptyHandler(Button2& b){};

void buttonClickLeft(Button2& b){
   Debugging::debug("Left button tap");
   UI::State currentState = UI::getState();
   if (currentState == UI::State::MENU) UI::menuMove(UI::Direction::DOWN); // Move down in menu
   if (currentState == UI::State::ITEM) UI::setState(UI::MENU);            // Exit item
}

void buttonClickRight(Button2& b){
   Debugging::debug("Right button tap");
   if (UI::getState() == UI::State::MENU) UI::menuMove(UI::Direction::UP);
}

void buttonClickExt1(Button2& b){
   Debugging::debug("External button tap");
}

void removeHandlers(){
   leftButton.setTapHandler(_emptyHandler);
   rightButton.setTapHandler(_emptyHandler);
   extButton1.setTapHandler(_emptyHandler);
}



// Handles double press of 2 onboard buttons with varying presstimes
// Handled only when board is started eg. running
void handleDoublePress(){
   if (leftButton.isPressed() && rightButton.isPressed() && Controller::isRunning())
   {
      if (!timer) timer = millis();
      if ((millis() - timer >= timeToItem) && (millis() - timer <= timeToStart))
      {
         itemOnRelease = true;
      }
      if (millis() - timer >= timeToStart)
      {
         itemOnRelease = false;
         stopOnRelease = true;
         removeHandlers();
         UI::setState(UI::STOPPING);
      }
   }
   else if (!(leftButton.isPressed() || rightButton.isPressed()))   // Stopping after releasing both buttons
   {
      if (itemOnRelease)
      {
         itemOnRelease = false;
         timer = 0;
         UI::setState(UI::State::ITEM);
      }
      else if (stopOnRelease)
      {
         stopOnRelease = false;
         timer = 0;
         Controller::stop();
      }
      else if (timer) 
      {
         startOnRelease = false;
         itemOnRelease = false;
         timer = 0; // Reset timer
      } 
   }
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
            startOnRelease = true;
            UI::setState(UI::STARTING);
         }
      }
      else if (!(leftButton.isPressed() || rightButton.isPressed()) && startOnRelease)   // Starting after releasing both buttons
      {
         startOnRelease = false;
         timer = 0;
         Controller::start();
      }
      else if (timer) timer = 0; // Reset timer
   }
}