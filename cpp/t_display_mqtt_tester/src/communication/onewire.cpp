#include "onewire.h"


const int busDrivePin = 25;
const int readPin = 33;

#define BUS_LOW 1       // Turn transistor ON making voltage drop on PULLUP resistor
#define BUS_RELEASE 0  // Turn transistor OFF releasing the bus for slave (device)

/* NOTE BITSHIFTING:
   All bitshifted data has to be unsigned that new bits produced
   by the shift are 0 (instead of signed 1 bits)
*/


/*
   Note that the Read Scratchpad [BEh] command can
   follow the Skip ROM command only if there is a single
   slave device on the bus. In this case, time is saved by
   allowing the master to read from the slave without send-
   ing the device’s 64-bit ROM code.
*/                               
                                    // From documentation https://www.analog.com/media/en/technical-documentation/data-sheets/DS18B20.pdf
const uint8_t skipRom = 0xCC;       // Skip ROM [CCh]
const uint8_t convertT = 0x44;      // Convert T [44h]
const uint8_t tempRequest =  0xBE;  // Read Scratchpad [BEh]

/*
   Resolution = 12 bit (config bits 6 & 5 are set to 1)
   Highest temperature = 85°  
   Lowest temperature = 0°
*/
const uint8_t tempRes = 0x60;
const uint16_t tempHigh = 0x0550;
const uint16_t tempLow = 0x0000;

char* roundedTemp = ""; 
bool deviceFound = false;


void resetSequence(){
   digitalWrite(busDrivePin, BUS_LOW);
   delayMicroseconds(500);    //Reset pulse (480-640us)
   digitalWrite(busDrivePin, BUS_RELEASE);
   delayMicroseconds(70);     //After reset keep HIGH (15-60us)
   digitalWrite(busDrivePin, BUS_LOW);  //Drive low again, bus should be because slave answering

   if (!digitalRead(readPin)) delayMicroseconds(40);  // PDP from slave (60-240us)
   else return; // TODO: Implement missing device handeling as no response happened on time

   if (!digitalRead(readPin))
   {
      while (!digitalRead(readPin)){} // Wait slave to stop PDP and pull the bus high
   }else{
      return; // TODO: Implement missing device handeling as no response happened on time
   }
   deviceFound = true; 
}

void writeOne(){
   digitalWrite(busDrivePin, BUS_LOW);
   delayMicroseconds(10);  // 1-15us
   digitalWrite(busDrivePin, BUS_RELEASE);
   delayMicroseconds(5);
}

void writeZero(){
   digitalWrite(busDrivePin, BUS_LOW);
   delayMicroseconds(85);   // 60-120us
   digitalWrite(busDrivePin, BUS_RELEASE);
   delayMicroseconds(5);
}

/* Note from documentation PDF pg. 10: 
      All data and commands are transmitted least significant
      bit first over the 1-Wire bus.
*/
void write(const uint data){   //
   int bitCount = sizeof(data) * 8;
   uint shiftedData = data;
   for (int i = 0; i < bitCount; i++)
   {  
      if (shiftedData & 1) writeOne();
      else writeZero();      
      shiftedData = shiftedData >> 1; //LSB -> MSB
   }
}


void writeDefaultConfig(){
   resetSequence();
   if (!deviceFound) return; //TODO: Implement error handeling


}




// void convertSequence(){
//    resetSequence
// }




char* getTempValue(){
   resetSequence();
   if (!deviceFound) return; //TODO: Implement error handeling

   // convertSequence();

}


namespace OneWire {
   void init(){
      pinMode(busDrivePin, OUTPUT);
      pinMode(readPin, INPUT);
      writeDefaultConfig();
      digitalWrite(busDrivePin, HIGH);
   }

   char* readValue(OneWire::DataType dataType){
      switch (dataType)
      {
      case DataType::TEMPERATURE:
         return getTempValue();
         break;
      
      default:
         break;
      }
   }


}