#include <Arduino.h>
#include "communication.h"
#include "display/ui.h"

namespace Communication{
   void init(){
      Serial.begin(SERIAL_SPEED);
   };
   void loop(){}
}