#include "mqtt.h"

namespace MQTT{
   Communication::Status status;
   void init(){};
   void loop(){};
   Communication::Status getStatus(){
      return status;
   };
   
}
