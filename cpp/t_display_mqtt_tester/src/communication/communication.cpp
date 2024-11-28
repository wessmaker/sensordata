#include <Arduino.h>
#include "communication.h"
#include "display/ui.h"
namespace Communication{
   void init(){
      Serial.begin(SERIAL_SPEED);
   };
   void loop(){}

   void write(Type type, int data){
      switch (type){
         case _SERIAL:
               Serial.write(data);
            break;
         
         default:
            break;
      }
   }
}