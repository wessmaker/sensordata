#include <Arduino.h>
#include "board.h"
#include "communication/debug.h"
#include "display/ui.h"
#include "sensors/Buttons.h"

#define STOPPED_SERIAL_INFO_INTERVAL 5000

bool running;


namespace Board {

   void init(){
      start();
   }   

   void loop(){

   }


   void start(){
      Debugging::debug("Starting board!");
      digitalWrite(TFT_BL, HIGH);  //Backlight ON
      running = true;
   }
   void stop(){
      Debugging::debug("Stopping board!");
      digitalWrite(TFT_BL, LOW);  //Backlight off
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
