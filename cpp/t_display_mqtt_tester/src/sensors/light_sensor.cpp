#include "light_sensor.h"
#include <Arduino.h>
#include "communication/mqtt.h"


#define LIGHT_SENSOR_PIN 39
#define LIGHT_SAMPLE_INTERVAL 500

const char* targetTopic = "/devices/lilygo/sensors/lightness";
bool dataSent = false;
char payloadStr[4];


namespace LightSensor{
   
   void init(){
      pinMode(39, INPUT);
   };


   void loop(){
      if (millis() % LIGHT_SAMPLE_INTERVAL < 10)
      {
         if (!dataSent) {
            itoa(analogRead(39), payloadStr, 10); // Read value (int) converted to "payloadStr" (char). 10 = read value is in decimal
            MQTT::publish(targetTopic, payloadStr, true);
            dataSent = true;
         }
      }
      else if (dataSent) dataSent = false;
   };
}