#include "ui.h"
#include <TFT_eSPI.h>
#include "communication/communication.h"
#include "communication/debug.h"
#include "board/board.h"


void drawMenu(String, String, String);
void clearScreen(u_int8_t, u_int8_t, u_int8_t, u_int8_t);


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
   String text;
};
Item wifiItem;
Item mqttItem;
Item settingsItem;
Item voltageItem;
Item items[4];
int focusedIndex = 1;
int lastSpriteIndex = 2;
int lastItemIndex = 3;


void initMenu() {
   wifiItem.text = "WIFI";
   mqttItem.text = "MQTT";
   settingsItem.text = "Settings";
   voltageItem.text = "Voltage";
   for (int i = 0; i < 3; i++){ items[i].position = i; }
   items[0] = wifiItem;
   items[1] = mqttItem;
   items[2] = settingsItem;
   items[3] = voltageItem;
   for (int i = 0; i <= lastSpriteIndex; i++)   // Sprite templates are created here
   {
      itemSprites[i].createSprite(
                        UI_MENU_ITEM_WIDTH, 
                        UI_MENU_ITEM_HEIGHT
                     );
      itemSprites[i].fillSprite(UI_TRANSPARENCY_COLOR);
   }
}


void drawMenu(String t1 = items[0].text, String t2 = items[1].text, String t3 = items[2].text){
   Debugging::debug("DRAWING MENU");
   String texts[3] = {t1, t2, t3};
   clearScreen(   // Clear screen menu propotion of screen
      0,
      0,
      UI_MENU_WIDTH,
      UI_MENU_HEIGHT
   );
   for (int i = 0; i <= lastSpriteIndex; i++)
   {
      if (texts[i] != "")  // First draw existing texts
      {
         itemSprites[i].fillSprite(UI_TRANSPARENCY_COLOR); // Bottom color (purple) which will be filtered out when pushing
         itemSprites[i].drawString(
            texts[i],
            7,
            7,
            UI_MENU_ITEM_FONT_SIZE
         );
         itemSprites[i].drawRoundRect(       // Rectangles 2px
            0, 
            0, 
            UI_MENU_ITEM_WIDTH,
            UI_MENU_ITEM_HEIGHT,
            UI_MENU_ITEM_ROUNDNESS,
            TFT_RED
         );
         int x = i == 1 ? UI_MENU_ITEM_FOCUS_X : UI_MENU_ITEM_DEFAULT_X;
         int y = (UI_MENU_ITEM_SPACING * (i + 1)) + (UI_MENU_ITEM_HEIGHT * i);
         itemSprites[i].pushSprite(          // Show rectangles
            x,
            y,
            UI_TRANSPARENCY_COLOR            // Filter bottom color (purple) out
         );
      }
   }
}


void clearScreen(u_int8_t xs = 0, u_int8_t ys = 0, u_int8_t xe = TFT_HEIGHT, u_int8_t ye = TFT_WIDTH){
   tft.fillRect(  // By default will clear whole screen
      xs,
      ys,
      xe,
      ye,
      TFT_BLACK
   );
}


void drawFullScreenText(const String text){
   tft.drawCentreString(
      text, 
      TFT_HEIGHT / 2, 
      TFT_WIDTH / 2, 
      4
   );
}

namespace UI{
   State state;

   void init(){
      tft.init();
      tft.setRotation(DISPLAY_ROTATION);  // 1 = position (0, 0) is at the top left when buttons are on right (horizontal)
      clearScreen();
      initMenu();
      setState(MENU);
   }

   void loop(){
   };

   State getState(){
      return state;
   }   

   void menuMove(Direction direction){
      int hidePos = -1;
      int prvFocusedIndex = focusedIndex;
      if (focusedIndex > 0             && direction == UP)     { focusedIndex--; }
      if (focusedIndex < lastItemIndex && direction == DOWN)   { focusedIndex++; }
      if (focusedIndex != prvFocusedIndex)
      {
         Debugging::debug("MOVING IN MENU");
         if (focusedIndex == 0 )             hidePos = 1;
         if (focusedIndex == lastItemIndex ) hidePos = 2;
         drawMenu(
            focusedIndex <= 0 ? "" : items[focusedIndex - 1].text,
            items[focusedIndex].text,
            focusedIndex >= lastItemIndex ? "" : items[focusedIndex + 1].text
         );
      }
   }
   

   void setState(State nextState){
      if (state != nextState)
      {
         switch (nextState){
            case MENU:
               Board::backLight(true);
               clearScreen();
               drawMenu();
               Debugging::debug("UI STATE: MENU");
               break;
            case FULL_SCREEN:
               Debugging::debug("UI STATE: FULL_SCREEN");
               break;
            case STARTING:
               clearScreen();
               Board::backLight(true);
               drawFullScreenText("STARTING");
               Debugging::debug("UI STATE: STARTING");
               break;
            case STOPPING:
               clearScreen();
               Board::backLight(true);
               drawFullScreenText("STOPPING");
               Debugging::debug("UI STATE: STOPPING");
               break;
            case OFF:
               clearScreen();
               Board::backLight(false);
               Debugging::debug("UI STATE: OFF");
               break;
            default:
               break;
         }
         state = nextState; // Finally set internal state
      }
   }
}