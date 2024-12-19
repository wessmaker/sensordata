#pragma once 
#ifndef WIFI_H
#define WIFI_H
#include <Arduino.h>
#include "communication.h"
namespace Wifi{
   void init();
   void loop();
   Communication::Status getStatus();
   void _offLoop();
}


#endif