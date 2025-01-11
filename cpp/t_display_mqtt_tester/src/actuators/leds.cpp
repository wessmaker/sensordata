#include "leds.h"
#include <Arduino.h>

typedef struct coloredLed{
   bool mode = 0;
   u_int16_t blinkingInterval = 0;
   LEDS::LED_PIN ledPin;
};

coloredLed yellowLed;
coloredLed redLed;
coloredLed blueLed;
coloredLed whiteLed;
coloredLed assertLed;



namespace LEDS{
   void init(){
      yellowLed.ledPin = LED_PIN::YELLOW;
      redLed.ledPin = LED_PIN::RED;
      blueLed.ledPin = LED_PIN::BLUE;
      whiteLed.ledPin = LED_PIN::WHITE;
      assertLed.ledPin = LED_PIN::ASSERT;
      pinMode(yellowLed.ledPin, OUTPUT);
      pinMode(redLed.ledPin, OUTPUT);
      pinMode(blueLed.ledPin, OUTPUT);
      pinMode(whiteLed.ledPin, OUTPUT);
      pinMode(assertLed.ledPin, OUTPUT);
   }

   void loop() {
      if (yellowLed.mode == 2 && millis() % yellowLed.blinkingInterval == 0) invert(yellowLed.ledPin);
      if (redLed.mode == 2 && millis() % redLed.blinkingInterval == 0) invert(redLed.ledPin);
      if (blueLed.mode == 2 && millis() % blueLed.blinkingInterval == 0) invert(blueLed.ledPin);
      if (whiteLed.mode == 2 && millis() % whiteLed.blinkingInterval == 0) invert(whiteLed.ledPin);
   }

   void ON(LED_PIN led){
      digitalWrite(led, HIGH);
   }

   void OFF(LED_PIN led){
      digitalWrite(led, LOW);
   }

   void invert(LED_PIN led){
      digitalWrite(led, !digitalRead(led));
   }


   void handleMQTTDataChange(char* topic, uint8_t* payload){
      if (payload[0] > 2) return;      // Payload syntax error
      if (payload[1] != ',') return;   // Payload syntax error
      if (!payload[2]) return;         // Payload syntax error

      coloredLed led;
      if (topic == "/devices/lilygo/actuators/leds/yellow") led = yellowLed;
      else if (topic == "/devices/lilygo/actuators/leds/red") led = redLed;
      else if (topic == "/devices/lilygo/actuators/leds/white") led = whiteLed;
      else if (topic == "/devices/lilygo/actuators/leds/blue") led = blueLed;
      else return; // Topic didn't match

      led.mode = payload[0];  //Mode: 0 = OFF, 1 = ON, 2 = BLINKING

      std::string intervalString = "0";
      int i = 2;
      while (payload[i] && std::isdigit(payload[i]))
      {
         led.blinkingInterval += payload[i];
         i++;
      }
      ASSERT(std::stoi(intervalString) < 65536, "intervalString was bigger than 65536");
      led.blinkingInterval = std::stoi(intervalString);
   }

}