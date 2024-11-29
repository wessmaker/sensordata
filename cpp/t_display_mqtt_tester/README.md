#### LilyGo T-Display mqtt tester


> Purpose of this project is to get data from sensors and send it throught MQTT to be processed in backend and then return data back to board to control connected actuators

```mermaid
flowchart TB
   subgraph Setup
      A[START] 
      --> B[INITIALIZE BOARD]
      --> C[CONNECT TO WIFI] 
      --> D[START MQTT CLIENT]
      --> E[START READING GPIO] 
      --> F[CONNECTIONS HANDSHAKE] 
      --> G[PUBLISH & SUBSCRIBE MQTT] 
   end
   subgraph Loop
      G ---> H[READ AND WRITE MQTT DATA] 
      .-> I[CONTROL ACTUATORS]
      .-> J[READ INPUTS]
      .-> K[STORE ACTUATOR DATA]
      .-> H
   end
```
#### TTGO T-Display GPIO pinout

![ttgo_tdispaly_gpio.jpg](/img/ttgo_tdispaly_gpio.jpg)


#### ESP32 GPIO 34-39 are input only 
> Note! On Lilygo TTGO T-Display there are only pins 36-39 

![ttgo_gpio_34-39.png](/img/ttgo_gpio_34-39.png)
