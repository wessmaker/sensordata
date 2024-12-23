#ifndef ONEWIRE_H
#define ONEWIRE_H

#include <Arduino.h>


namespace OneWire {

   
   enum DataType{
      TEMPERATURE
   };

   void init();

   char* readValue(OneWire::DataType );

}

#endif