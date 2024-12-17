#pragma once 
#ifndef WIFI_H
#define WIFI_H
#include <Arduino.h>
#include "communication.h"
namespace Wifi{
   void init();
   void loop();
   // WiFiClient* getClient();
   Communication::Status getStatus();
}


#endif