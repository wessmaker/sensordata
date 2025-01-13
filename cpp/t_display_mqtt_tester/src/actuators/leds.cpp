#include "leds.h"
#include <Arduino.h>
#include "communication/debug.h"


struct ColoredLed{
   int mode = 0;
   u_int16_t blinkingInterval = 0;
   LEDS::LED_PIN ledPin;
   bool inverted;
}yellowLed, redLed, blueLed, whiteLed, assertLed;

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
      if (yellowLed.mode == 2 && millis() % yellowLed.blinkingInterval <= 10 ){
         if (!yellowLed.inverted) {
            LEDS::invert(yellowLed.ledPin);
            yellowLed.inverted = true;
         }
      } 
      else if (yellowLed.mode == 2) yellowLed.inverted = false;
      else LEDS::set(yellowLed.ledPin, yellowLed.mode);


      if (redLed.mode == 2 && millis() % redLed.blinkingInterval <= 10 ){
         if (!redLed.inverted) {
            LEDS::invert(redLed.ledPin);
            redLed.inverted = true;
         }
      } 
      else if (redLed.mode == 2) redLed.inverted = false;
      else LEDS::set(redLed.ledPin, redLed.mode);


      if (blueLed.mode == 2 && millis() % blueLed.blinkingInterval <= 10 ){
         if (!blueLed.inverted) {
            LEDS::invert(blueLed.ledPin);
            blueLed.inverted = true;
         }
      } 
      else if (blueLed.mode == 2) blueLed.inverted = false;
      else LEDS::set(blueLed.ledPin, blueLed.mode);


      if (whiteLed.mode == 2 && millis() % whiteLed.blinkingInterval <= 10 ){
         if (!whiteLed.inverted) {
            LEDS::invert(whiteLed.ledPin);
            whiteLed.inverted = true;
         }
      } 
      else if (whiteLed.mode == 2) whiteLed.inverted = false;
      else LEDS::set(whiteLed.ledPin, whiteLed.mode);
   }



   void set(LED_PIN led, bool state){
      digitalWrite(led, state);
   }


   void invert(LED_PIN led){
      Debugging::debug("INVERTED, DELETE THIS DEBUG");
      digitalWrite(led, !digitalRead(led));
   }


   void ledMQTTCallback(char* topic, uint8_t* payload, unsigned int lenght){
      // Error checks
      if (!lenght) return;
      if (!topic) return;
      if (!payload) return;
      if (!(char)payload[0]) return;
      if (!std::isdigit((char)payload[0])) return;
      if ((char)payload[1] != ',') return;

      String parsedTopic = "";
      for (int i = 0; topic[i]; i++) parsedTopic += topic[i];

      if 
      (
         parsedTopic == "/devices/lilygo/actuators/leds/yellow"   ||
         parsedTopic == "/devices/lilygo/actuators/leds/red"      ||
         parsedTopic == "/devices/lilygo/actuators/leds/blue"     ||
         parsedTopic == "/devices/lilygo/actuators/leds/white"
      )
      {
         String topicEnding = "";
         for (int i = 0; parsedTopic[i]; i++) topicEnding += parsedTopic[i + 30]; //Index of 30 is last slash

         ColoredLed* targetLed;
         if (topicEnding == "/yellow") targetLed = &yellowLed;
         if (topicEnding == "/red") targetLed = &redLed;
         if (topicEnding == "/blue") targetLed = &blueLed;
         if (topicEnding == "/white") targetLed = &whiteLed;

         std::string intervalString = "";
         for (int i = 2; i < lenght; i++)
         {
            if (!std::isdigit((char)payload[i])) return; //Syntax error
            intervalString += (char)payload[i];
         }

         if      ((char)payload[0] == '0') targetLed->mode = 0;
         else if ((char)payload[0] == '1') targetLed->mode = 1;
         else if ((char)payload[0] == '2') targetLed->mode = 2;
         else return;

         targetLed->blinkingInterval = std::stoi(intervalString);
         Debugging::debug("LED state was set using MQTT");
      }
   }
}