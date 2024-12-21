// #include "testing.h"
// #include <TFT_eSPI.h>
// #include <string>

// TFT_eSPI tft = TFT_eSPI(TFT_WIDTH, TFT_HEIGHT);



// namespace Testing{
//    void init(){
//       tft.setRotation(0);
      
//       tft.init();
//       tft.fillScreen(TFT_BLACK);



//       pinMode(27, OUTPUT);
//       pinMode(26, OUTPUT);
//       pinMode(25, OUTPUT);
//       pinMode(33, OUTPUT);

//       pinMode(39, PULLUP);
//       pinMode(38, PULLUP);
//       pinMode(37, PULLUP);
//       pinMode(36, PULLUP);


//       Serial.begin(115200);
//    }


//    void loop(){
//       // if (millis() % 2000 == 0)
//       // {
//       //    digitalWrite(12, !digitalRead(12));
//       // }
      
//       digitalWrite(2, HIGH);
//       digitalWrite(15, HIGH);
//       digitalWrite(13, HIGH);
//       digitalWrite(12, HIGH);


//       // digitalWrite(32, HIGH);
//       // digitalWrite(33, HIGH);
//       // digitalWrite(25, HIGH);
//       // digitalWrite(26, HIGH);
//       // digitalWrite(27, HIGH);

//       Serial.print("  ");
//       Serial.print(analogRead(36));
//       Serial.print(",  ");
//       Serial.print(analogRead(37));
//       Serial.print(",  ");
//       Serial.print(analogRead(38));
//       Serial.print(",  ");
//       Serial.print(analogRead(39));
//       Serial.println();


//       digitalWrite(27, LOW);  //LED_WHITE
//       digitalWrite(26, HIGH); //LED_RED
//       digitalWrite(25, HIGH); //LED_BLUE
//       digitalWrite(33, HIGH); //LED_YELLOW



//    }
// }