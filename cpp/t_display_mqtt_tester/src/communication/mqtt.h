#pragma once 
#ifndef MQTT_H
#define MQTT_H
#include "communication.h"

namespace MQTT{
   void init();
   void loop();
   Communication::Status getStatus();
}


#endif