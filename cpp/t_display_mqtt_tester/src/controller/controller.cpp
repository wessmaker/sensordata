#include <Arduino.h>
#include "controller.h"
#include "communication/debug.h"
#include "display/ui.h"
#include "sensors/Buttons.h"
#include "communication/wifi.h"

#define STOPPED_SERIAL_INFO_INTERVAL 5000

bool running;
namespace Controller {
   void init(){
      start(true);
   }   

   void loop(){
   }

   void setBackLight(bool mode){
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
      while (!running)  // This stops controller immidiently, that's why not implemented in Controller::loop() 
      {  //
         Buttons::_offLoop();
         Wifi::_offLoop();
         if (millis() % STOPPED_SERIAL_INFO_INTERVAL == 0 ) Serial.println("Controller IS STOPPED!");
      }
   }

   bool isRunning(){
      return running;
   }
}
