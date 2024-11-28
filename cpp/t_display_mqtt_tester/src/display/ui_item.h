#pragma once 
#ifndef UI_ITEM_H
#define UI_ITEM_H
#include <string>

class Item
{
private:
   std::string name;
public:
   Item(std::string name);
   ~Item();
};

#endif