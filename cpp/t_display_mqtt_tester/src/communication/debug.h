#ifndef DEBUG_H
#define DEBUG_H


namespace Debugging{
  bool isOn();
  void init();
  void loop();
  void debug(const String);
  void debug(const int);
}

#endif