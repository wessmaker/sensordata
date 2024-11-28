#pragma once 
#ifndef COMMUNICATION_H
#define COMMUNICATION_H

#define SERIAL_SPEED 115200

namespace Communication{

   enum Type{
      _SERIAL,
      WIFI,
      BLE
   };

   void init();
   void loop();
   void write(Type type, int data);

}




#endif