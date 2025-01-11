// #include "testing/testing.h"

#include <Arduino.h>
// #include "actuators/buzzer.h"
#include "actuators/leds.h"
#include "controller/controller.h"
#include "communication/rxtx.h"
#include "communication/debug.h"
#include "display/ui.h"
#include "communication/mqtt.h"
#include "communication/wifi.h"
#include "communication/onewire.h"
#include "sensors/light_sensor.h"
#include "sensors/temp_sensor.h"
#include "sensors/Buttons.h"
#include "sensors/switch.h"


void setup() {
  // Testing     ::init();
  Debugging     ::init();
  // Buzzer        ::init();
  LEDS          ::init();
  RXTX          ::init();
  MQTT          ::init();
  Wifi          ::init();
  // OneWire       ::init();
  LightSensor   ::init();
  TempSensor    ::init();
  Buttons       ::init();
  Switch        ::init();
  UI            ::init();
  Controller    ::init();
}

void loop() {
  // Testing     ::loop();
  Debugging     ::loop();
  // Buzzer        ::loop();
  LEDS          ::loop();
  RXTX          ::loop();
  MQTT          ::loop();
  Wifi          ::loop();
  // OneWire       ::loop();
  LightSensor   ::loop();
  TempSensor    ::loop();
  Buttons       ::loop();
  Switch        ::loop();
  UI            ::loop();
}