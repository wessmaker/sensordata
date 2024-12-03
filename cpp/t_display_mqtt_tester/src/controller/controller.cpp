#include <Arduino.h>
#include "controller.h"
#include "communication/debug.h"
#include "display/ui.h"
#include "sensors/Buttons.h"

#define STOPPED_SERIAL_INFO_INTERVAL 5000

bool running;
namespace Controller {
   void init(){
      start(true);
   }   

   void loop(){
   }

   void backLight(bool mode){
      digitalWrite(TFT_BL, mode);
   }

   /*
   Will run Buttons::init() if no argument given to reinitialize them at start
   */
   void start(bool firstRun){
      if (!firstRun) 
      {
         Buttons::init(); 
         firstRun = false;
      }
      Debugging::debug("Starting controller!");
      UI::setState(UI::MENU);
      running = true;
   }
   
   void stop(){
      Debugging::debug("Stopping controller!");
      UI::setState(UI::OFF);
      running = false;
      while (!running)
      {
         Buttons::_offLoop();
         if (millis() % STOPPED_SERIAL_INFO_INTERVAL == 0 ) Serial.println("Controller IS STOPPED!");
      }
   }

   bool isRunning(){
      return running;
   }
}
