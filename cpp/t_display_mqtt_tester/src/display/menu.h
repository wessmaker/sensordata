#ifndef MENU_H
#define MENU_H
#include <string>
namespace Menu{
   
   class Item {
   private:
      std::string name;
   public:
      Item(std::string name);
      ~ Item();
   };

   void init();
   void refresh();
}
#endif