#include "wifi.h"
Communication::Status status = Communication::Status::UNKNOWN;

namespace Wifi{
   void init(){};
   void loop(){};
   Communication::Status getStatus(){
      return status;
   };
}