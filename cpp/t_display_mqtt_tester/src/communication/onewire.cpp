// #include "onewire.h"
// #include "debug.h"
// #include <arduino.h>

// /* Communicating with Dallas 18B20 temperature sensor:

//    pinMode(busPin, INPUT);
//       By setting buspin of HOST to INPUT the pull-up resistor not have voltage drop and so DQ line is floting HIGH .
//       SENSOR can then pull line LOW which can be then read by the HOST


//    pinMode(busPin, OUTPUT);
//    digitalWrite(busPin, LOW);
//       By setting the "mode" of buspin to LOW and then setting pinmode as OUTPUT the buspin will be basically shorted to GND. 
//       The pull-up resistor will have voltage drop when current goes throught it to buspin and thus to GND.
//       Voltage drop will be in interpreted as logical LOW by the DQ pin of the SENSOR.
    
//     ______________________________
//    |   HOST              SENSOR   |
//    |   busPin---------+--DQ       |
//    |                  |           |
//    |                 R1  (5.1k)   |
//    |                  |           |
//    |   3.3V-----------+--Vcc      |
//    |   GND---------------GND      |
//    |______________________________|
// */

// #define DATA_REQUEST_INTERVAL 2000

// const int busPin = 15;

// char* temperature = "NOT_FOUND";
// ulong convertTStartTime = 0;
// u_int16_t readTempTimeout = 2000;
// bool dataQueried = false;

// /*
//    From documentation https://www.analog.com/media/en/technical-documentation/data-sheets/DS18B20.pdf
//       Note that the Read Scratchpad [BEh] command can
//       follow the Skip ROM command only if there is a single
//       slave device on the bus. In this case, time is saved by
//       allowing the master to read from the slave without send-
//       ing the device’s 64-bit ROM code.
// */                               
// const uint8_t skipRom      = 0xCC;  // Skip ROM
// const uint8_t convertTemp  = 0x44;  // Convert T
// const uint8_t readTemp     = 0xBE;  // Read Scratchpad

// const uint8_t tempRes      = 0x60;  // Resolution = 12 bit (config bits 6 & 5 are set to 1)
// const uint16_t tempHigh    = 0x0550;// Highest temperature = 85°
// const uint16_t tempLow     = 0x0000;// Lowest temperature = 0°

// bool readBit();


// void busIdle(){   //Forcing bus to HIGH state that no communication running
//    pinMode(busPin, OUTPUT);
//    digitalWrite(busPin, HIGH);
// }
// int looper = 0;


// void writeReset(){
//    Debugging::debug("Writing RESET 1-WIRE");
//    //noInterrupts();
//    pinMode(busPin, OUTPUT);
//    digitalWrite(busPin, LOW);
//    delayMicroseconds(500);    //Starting RESET by pulling LOW (480-640us)
//    pinMode(busPin, INPUT);
//    delayMicroseconds(30);     //After RESET keep bus floating (15-60us)
//    if (!digitalRead(busPin)){
//       Debugging::debug("1-Wire: PDP incoming");
//    } 
//    delayMicroseconds(60);  // PDP from slave (60-240us)

//    busIdle();
//    //interrupts();
// }

// void writeOne(){
//    //noInterrupts();
//    pinMode(busPin, OUTPUT);
//    digitalWrite(busPin, LOW);
//    delayMicroseconds(10);  // 1-15us
//    pinMode(busPin, INPUT);
//    Debugging::debug(digitalRead(busPin));
//    delayMicroseconds(60);
//    busIdle();
//    //interrupts();
// }

// void writeZero(){
//    //noInterrupts();
//    pinMode(busPin, OUTPUT);
//    digitalWrite(busPin, LOW);
//    Debugging::debug(digitalRead(busPin));
//    delayMicroseconds(60);   // 60-120us
//    pinMode(busPin, INPUT);
//    delayMicroseconds(10);
//    busIdle();
//    //interrupts();
// }


// /* Note from documentation PDF pg. 10: 
//       All data and commands are transmitted least significant
//       bit first over the 1-Wire bus.
// */
// void write(uint8_t data){
//    for (int i = 0; i < 8; i++)
//    {  
//       if (data & 0x01) writeOne();
//       else writeZero();      
//       data = data >> 1;    //LSB first (1-wire protocol)
//    }
// }


// bool readBit(){
//    //noInterrupts();
//    pinMode(busPin, OUTPUT);
//    digitalWrite(busPin, LOW);
//    delayMicroseconds(3);
//    pinMode(busPin, INPUT);             // Allow device to write
//    delayMicroseconds(10);
//    bool readBit = digitalRead(busPin); // Read DQ line
//    delayMicroseconds(100);              // Wait for reading sequence to finish (>55us)
//    busIdle();
//    //interrupts();
//    return readBit;
// }



// void queryTemp(){

//    int a = 0;
//    int readedData = 0;
//    writeReset();
//    write(0xCC);
//    Debugging::debug("");
   
//    writeOne();
//    writeZero();
//    writeOne();
//    writeOne();
//    writeOne();
//    writeOne();
//    writeOne();
//    writeZero();

//    while (a < 20)
//    {
//       bool data = readBit();
//       readedData |= data;
//       readedData <<= 1;
//       a++;
//    }
//    Serial.println(readedData);
//    busIdle();
//    // //Calling device to convert temperature
//    // if (millis() % DATA_REQUEST_INTERVAL < 50 && !dataQueried) 
//    // {
//    //    writeReset();
//    //    write(skipRom);
//    //    write(convertTemp);
//    //    convertTStartTime = millis();
//    //    dataQueried = true;
//    // }

//    // //Waiting device to convert temperature (<750ms in 12-bit mode)
//    // if (convertTStartTime - millis() > 750)
//    // {
//    //    u_int8_t bitCount = 0;
//    //    u_int16_t tempBitValue = 0x00;
//    //    ulong readStartTime = millis();
//    //    writeReset();
//    //    write(readTemp);
//    //    while (bitCount < 12)
//    //    {
//    //       if (millis() - readStartTime > readTempTimeout) return;   //Exit if reading takes too long
//    //       tempBitValue |= readBit();
//    //       tempBitValue <<= 1;
//    //       bitCount++;
//    //    }
//    //    convertTStartTime = 0;
//    //    dataQueried = false;
//    // }
// }



// namespace OneWire {

//    void loop(){
//       queryTemp();
//       delay(2500);
//    }

//    void init(){
//       busIdle();
//    }

//    char* getData(OneWire::DataType dataType){
//       switch (dataType)
//       {
//          case DataType::TEMPERATURE:
//             return temperature;
//             break;
         
//          default:
//             break;
//       }
//    }

// }