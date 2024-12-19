#ifndef COMMUNICATION_H
#define COMMUNICATION_H

#define SERIAL_SPEED 115200

namespace Communication {
   enum Status{
      UNKNOWN,
      DISCONNECTED,
      CONNECTED
   };
}
#endif
