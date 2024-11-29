#include <Arduino.h>
#include "switch.h"
#include "communication/debug.h"
#include "actuators/leds.h"

#define SWITCH_POS1 39
#define SWITCH_POS2 38

void handleSwitching();
void handlePos1();
void handlePos2();

bool pos1 = false;
bool pos2 = false;

int startTime = 0;
int switchTime = 150;

namespace Switch{
   void init(){
      pinMode(SWITCH_POS1, INPUT);
      pinMode(SWITCH_POS2, INPUT);
      pos1 = digitalRead(SWITCH_POS1);
      pos2 = digitalRead(SWITCH_POS2);
      if (pos1) {handlePos1();}      
      if (pos2) {handlePos2();}      
   };
   void loop(){
      handleSwitching();
   };
}

void handleSwitching(){
   if ((digitalRead(SWITCH_POS1) != pos1 || digitalRead(SWITCH_POS2) != pos2) && !startTime) {
      startTime = millis();
   }
   if (startTime) {
      if (millis() - startTime >= switchTime) {
         pos1 = digitalRead(SWITCH_POS1);
         pos2 = digitalRead(SWITCH_POS2);
         
         if (pos1 && pos2){
            Debugging::debug("Switch error: Pos1 & Pos2 are true");
         }
         else if (!pos1 && !pos2){
            Debugging::debug("Switch error: Pos1 & Pos2 are both false");
         }
         else if (pos1){
            handlePos1();
         }
         else if (pos2){
            handlePos2();
         }
         startTime = 0;
      }
   }
}

void handlePos1(){
   Debugging::debug("Switch position 1");
   LEDS::ON(LEDS::BLUE);  
}

void handlePos2(){
   Debugging::debug("Switch position 2");
   LEDS::OFF(LEDS::BLUE);  
}