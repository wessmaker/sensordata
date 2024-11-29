  // #include "testing/testing.h"

  #include <Arduino.h>
  #include "actuators/buzzer.h"
  #include "actuators/leds.h"
  #include "board/board.h"
  #include "communication/communication.h"
  #include "communication/debug.h"
  #include "display/ui.h"
  #include "mqtt/mqtt_client.h"
  #include "sensors/light_sensor.h"
  #include "sensors/temp_sensor.h"
  #include "sensors/Buttons.h"
  #include "sensors/switch.h"
  #include "wifi/wifi_client.h"
  



void setup() {
  // Testing     ::init();
  Debugging     ::init();
  Buzzer        ::init();
  LEDS          ::init();
  Communication ::init();
  MQTTClient    ::init();
  LightSensor   ::init();
  TempSensor    ::init();
  Buttons       ::init();
  Switch        ::init();
  WifiClient    ::init();
  Board         ::init();
  UI            ::init();
}


void loop() {
  // Testing     ::loop();
  Debugging     ::loop();
  Buzzer        ::loop();
  LEDS          ::loop();
  Communication ::loop();
  MQTTClient    ::loop();
  LightSensor   ::loop();
  TempSensor    ::loop();
  Buttons       ::loop();
  Switch        ::loop();
  WifiClient    ::loop();
  UI            ::loop();
}