#### LilyGo T-Display mqtt tester
> Purpose of this project is to get data from sensors and send it throught MQTT to be processed in backend and then return data back to board to control connected actuators



#### TTGO T-Display GPIO pinout

![ttgo_tdispaly_gpio.jpg](/img/ttgo_tdispaly_gpio.jpg)


#### ESP32 GPIO 34-39 are input only 
> Note! On Lilygo TTGO T-Display there are only pins 36-39 

![ttgo_gpio_34-39.png](/img/ttgo_gpio_34-39.png)


#### About libraries

- TFT_eSPI
  - manually included in lib folder as the PIO TFT_eSPI library didn't work
  - Including is done with double quotes instead of <> -notation `#include "TFT_eSPI.h"`