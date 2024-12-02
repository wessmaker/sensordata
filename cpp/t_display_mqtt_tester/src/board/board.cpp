#include <Arduino.h>
#include "board.h"
#include "communication/debug.h"
#include "display/ui.h"
#include "sensors/Buttons.h"

#define STOPPED_SERIAL_INFO_INTERVAL 5000

bool running;


namespace Board {

   void init(){
      start(true);
   }   

   void loop(){
   }

   void backLight(bool status){
      digitalWrite(TFT_BL, status);
   }

   void start(bool firstRun = false){
      if (!firstRun) Buttons::init();  //
      

      Debugging::debug("Starting board!");
      UI::setState(UI::MENU);
      running = true;
   }
   
   void stop(){
      Debugging::debug("Stopping board!");
      UI::setState(UI::OFF);
      running = false;
      while (!running)
      {
         Buttons::_offLoop();
         if (millis() % STOPPED_SERIAL_INFO_INTERVAL == 0 ) Serial.println("BOARD IS STOPPED!");
      }
   }

   bool isRunning(){
      return running;
   }
}
