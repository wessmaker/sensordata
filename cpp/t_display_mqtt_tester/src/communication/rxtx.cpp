#include <Arduino.h>
#include "rxtx.h"
#include "display/ui.h"
#include "communication.h"

namespace RXTX{
   void init(){
      Serial.begin(SERIAL_SPEED);
   };
   void loop(){}
}