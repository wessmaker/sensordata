#include "onewire.h"


const int busDrivePin = 25;
const int readPin = 33;

#define DATA_REQUEST_INTERVAL 2000

#define BUS_LOW 1       // Turn transistor ON making voltage drop on PULLUP resistor
#define BUS_RELEASE 0  // Turn transistor OFF releasing the bus for slave (device)


char* temperature = "NOT_FOUND";
ulong tempConvertTime = 0;
u_int16_t readTempTimeout = 2000;
bool dataQueried = false;



/*
   Note that the Read Scratchpad [BEh] command can
   follow the Skip ROM command only if there is a single
   slave device on the bus. In this case, time is saved by
   allowing the master to read from the slave without send-
   ing the device’s 64-bit ROM code.
*/                               
                                    // From documentation https://www.analog.com/media/en/technical-documentation/data-sheets/DS18B20.pdf
const uint8_t skipRom = 0xCC;       // Skip ROM [CCh]
const uint8_t convertTemp = 0x44;      // Convert T [44h]
const uint8_t readTemp =  0xBE;  // Read Scratchpad [BEh]

/*
   Resolution = 12 bit (config bits 6 & 5 are set to 1)
   Highest temperature = 85°  
   Lowest temperature = 0°
*/
const uint8_t tempRes = 0x60;
const uint16_t tempHigh = 0x0550;
const uint16_t tempLow = 0x0000;





void writeReset(){
   digitalWrite(busDrivePin, BUS_LOW);
   delayMicroseconds(500);    //Reset pulse (480-640us)
   digitalWrite(busDrivePin, BUS_RELEASE);
   delayMicroseconds(75);     //After reset keep HIGH (15-60us)
   
   if (!digitalRead(readPin)) delayMicroseconds(60);  // PDP from slave (60-240us)
   else return; // TODO: Implement missing device handeling as no response happened on time
   
   while (!digitalRead(readPin)){}  //Wait until device finishes PDP if still going
}


void writeOne(){
   digitalWrite(busDrivePin, BUS_LOW);
   delayMicroseconds(10);  // 1-15us
   digitalWrite(busDrivePin, BUS_RELEASE);
   delayMicroseconds(55);  // Remaining 55 of 65 - 10us
}


void writeZero(){
   digitalWrite(busDrivePin, BUS_LOW);
   delayMicroseconds(80);   // 60-120us
   digitalWrite(busDrivePin, BUS_RELEASE);
   delayMicroseconds(10);
}

/* Note from documentation PDF pg. 10: 
      All data and commands are transmitted least significant
      bit first over the 1-Wire bus.
*/
void write(uint8_t data){
   writeReset();
   for (int i = 0; i < 8; i++)
   {  
      if (data & 1) writeOne();
      else writeZero();      
      data = data >> 1;    //LSB first (1-wire protocol)
   }
}


bool readBit(){
   digitalWrite(busDrivePin, BUS_LOW);       // Start read
   delayMicroseconds(10);
   digitalWrite(busDrivePin, BUS_RELEASE);   // Allow device to write
   delayMicroseconds(10);
   bool readBit = digitalRead(readPin);      // Read device bit
   delayMicroseconds(60);                    // Wait for reading sequence to finish (>55us)
   return readBit;
}


void storeTemp(){
   writeReset();
   write(readTemp);
   ulong startTime = millis();
   int bitCount = 0;
   int tempBitValue = 0x00;
   while (bitCount < 12)
   {
      if (millis() - startTime > readTempTimeout) return;   //Exit if reading takes too long
      tempBitValue |= readBit();
      tempBitValue <<= 1;
      bitCount++;
   }
}


void queryTemp(){
   //Calling device to convert temperature
   if (millis() % DATA_REQUEST_INTERVAL < 50 && !dataQueried) 
   {
      writeReset();
      write(convertTemp);
      tempConvertTime = millis();
      dataQueried = true;
   }
   
   //Waiting device to convert temperature (<750ms in 12-bit mode)
   if (tempConvertTime - millis() > 750) storeTemp();


   writeReset();
   write(skipRom);
   write(convertTemp);


}




namespace OneWire {

   void loop(){
      queryTemp();
   }



   void init(){
      pinMode(busDrivePin, OUTPUT);
      pinMode(readPin, INPUT);
      digitalWrite(busDrivePin, HIGH);
   }

   char* getData(OneWire::DataType dataType){
      switch (dataType)
      {
         case DataType::TEMPERATURE:
            return temperature;
            break;
         
         default:
            break;
      }
   }

}