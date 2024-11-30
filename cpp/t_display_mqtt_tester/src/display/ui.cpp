#include "ui.h"
#include <TFT_eSPI.h>
#include "communication/communication.h"
#include "communication/debug.h"
#include "board/board.h"

void defaultScreen();
void clearScreen();
void drawMenu(int);
void initItems();


TFT_eSPI tft = TFT_eSPI(TFT_WIDTH, TFT_HEIGHT);
TFT_eSprite menuSprite = TFT_eSprite(&tft);
TFT_eSprite menuItemTemplate = TFT_eSprite(&tft);
TFT_eSprite mqttSprite = TFT_eSprite(&tft);
TFT_eSprite wifiSprite = TFT_eSprite(&tft);

TFT_eSprite itemSprite1 = TFT_eSprite(&tft);
TFT_eSprite itemSprite2 = TFT_eSprite(&tft);
TFT_eSprite itemSprite3 = TFT_eSprite(&tft);
TFT_eSprite itemSprites[3] = {itemSprite1, itemSprite2, itemSprite3};

struct Item {
   int position;
};

Item wifiItem;
Item mqttItem;
Item settingsItem;
Item voltageItem;
Item items[] = {wifiItem, mqttItem, settingsItem, voltageItem};


void initItems(){
   for (int i = 0; i < 5; i++)
   {
      if (i < 3)
      {
         itemSprites[i].createSprite(
                           UI_MENU_ITEM_WIDTH, 
                           UI_MENU_ITEM_HEIGHT - 100
                        );
         itemSprites[i].setRotation(DISPLAY_ROTATION);
         itemSprites[i].fillSprite(TFT_CYAN);
         itemSprites[i].drawRect(   // Rectangle 1px
                           0, 
                           0, 
                           UI_MENU_ITEM_WIDTH, 
                           UI_MENU_ITEM_HEIGHT, 
                           TFT_RED
                        );
         itemSprites[i].drawRect(   // Double rectangle widht
                           1, 
                           1, 
                           UI_MENU_WIDTH - (2 * UI_CONNECTION_ITEM_WIDTH) - 1, 
                           UI_MENU_ITEM_HEIGHT - 1, 
                           TFT_RED
                        );
      }
   }
}

void drawMenu(int hidePos = -1){
   for (int i = 0; i < 3; i++)
   {
      switch (i)
      {
      case 1:
         itemSprites[i].fillSprite(TFT_YELLOW);
         break;
      case 2:
         itemSprites[i].fillSprite(TFT_ORANGE);
         break;
      case 3:
         itemSprites[i].fillSprite(TFT_BLUE);
         break;
            
      default:
         break;
      }

      if (i != hidePos)
      {
         if (i != 2)    // Top and bottom sprites without indentation
         {
            itemSprites[i].pushSprite(
                           UI_MENU_ITEM_DEFAULT_X,
                           UI_MENU_HEIGHT - UI_MENU_ITEM_SPACING - (50 * (2 + i))
                        );
         }
         else           // Middle sprite with indentation
         {
            itemSprites[i].pushSprite(
                           UI_MENU_ITEM_DEFAULT_X + UI_MENU_ITEM_FOCUS_TRAVERSE,
                           UI_MENU_HEIGHT - UI_MENU_ITEM_SPACING - (50 * (1 + i))
                        );
         }
      }
      else  // Push sprite to 2x the screen dimensions to hide it
      {
         itemSprites[i].pushSprite(TFT_WIDTH * 2, TFT_HEIGHT * 2, UI_TRANSPARENCY_COLOR);
      }
   }
}




void clearScreen(){
   tft.fillScreen(TFT_BLACK);
}

void defaultScreen(){
   // clear_screen();
}










int s;


namespace UI{
   State state;

   void init(){
      tft.init();
      tft.setRotation(DISPLAY_ROTATION);  // 1 = position (0, 0) is at the bottom left when buttons are on right (horizontal)
      clearScreen();
      initItems();
      drawMenu();
      defaultScreen();
   }
   
   void loop(){
      drawMenu();  
   };


   State getState(){
      return state;
   }   

   void setState(State nextState){
      state = nextState;
      switch (state){
         case SELECTING:
            defaultScreen();
            break;
         case FULL_SCREEN:
            break;
         case SCREEN_SAVER:
            break;
         case OFF:
            Debugging::debug("Set UI OFF");
            clearScreen();
            break;
         default:
            break;
      }
   }
   void refresh(){};
   void toggleFullScreen(){};
}