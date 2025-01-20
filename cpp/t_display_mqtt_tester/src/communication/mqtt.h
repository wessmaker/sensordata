#pragma once 
#ifndef MQTT_H
#define MQTT_H
#include "communication.h"



namespace MQTT{
   void init();
   void loop();
   void publish(const char*, const char*, bool);
   Communication::Status getStatus();
}


#endif