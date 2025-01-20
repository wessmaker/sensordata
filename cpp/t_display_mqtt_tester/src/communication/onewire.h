#ifndef ONEWIRE_H
#define ONEWIRE_H

#include <Arduino.h>


namespace OneWire {

   
   enum DataType{
      TEMPERATURE
   };

   void loop();

   void init();

   char* getData(OneWire::DataType );

}

#endif