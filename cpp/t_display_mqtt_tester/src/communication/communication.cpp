#include <Arduino.h>
#include "communication.h"


namespace Communication{
   void init(){
      Serial.begin(SERIAL_SPEED);
   };
}