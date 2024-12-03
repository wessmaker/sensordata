#include "ui.h"
#include <TFT_eSPI.h>
#include "communication/communication.h"
#include "communication/debug.h"
#include "controller/controller.h"


void drawMenu(String, String, String);
void clearScreen(u_int8_t, u_int8_t, u_int8_t, u_int8_t);

TFT_eSPI tft = TFT_eSPI(TFT_WIDTH, TFT_HEIGHT);
TFT_eSprite itemSprite1 = TFT_eSprite(&tft);
TFT_eSprite itemSprite2 = TFT_eSprite(&tft);
TFT_eSprite itemSprite3 = TFT_eSprite(&tft);
TFT_eSprite itemSprites[3] = {itemSprite1, itemSprite2, itemSprite3};

struct Item {
   int position;
   String text;
};

Item item1;
Item item2;
Item item3;
Item item4;
Item items[4];
int focusedIndex = 1;
int lastSpriteIndex = 2;
int lastItemIndex = 3;


void initMenu() {
   for (int i = 0; i < 3; i++) items[i].position = i; 
   item1.text = "WIFI";
   item2.text = "MQTT";
   item3.text = "Settings";
   item4.text = "Board";
   items[0] = item1;
   items[1] = item2;
   items[2] = item3;
   items[3] = item4;
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
   clearScreen(            // Clear screen menu propotion of screen
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
            6,
            6,
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
         itemSprites[i].drawRoundRect(       // Rectangles 2px
            1, 
            1, 
            UI_MENU_ITEM_WIDTH - 1,
            UI_MENU_ITEM_HEIGHT - 1,
            UI_MENU_ITEM_ROUNDNESS - 1,
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
   State state = OFF;   //This HAS to be initialized to OFF

   void init(){
      tft.init();
      tft.setRotation(DISPLAY_ROTATION);  // 1 = position (0, 0) is at the top left when buttons are on right (horizontal)
      initMenu();
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
               Controller::backLight(true);
               focusedIndex = 1;
               clearScreen();
               drawMenu();
               Debugging::debug("UI STATE: MENU");
               break;
            case FULL_SCREEN:
               Debugging::debug("UI STATE: FULL_SCREEN");
               Controller::backLight(true);
               break;
            case STARTING:
               clearScreen();
               Controller::backLight(true);
               drawFullScreenText("STARTING");
               Debugging::debug("UI STATE: STARTING");
               break;
            case STOPPING:
               clearScreen();
               Controller::backLight(true);
               drawFullScreenText("STOPPING");
               Debugging::debug("UI STATE: STOPPING");
               break;
            case OFF:
               clearScreen();
               Controller::backLight(false);
               Debugging::debug("UI STATE: OFF");
               break;
            default:
               break;
         }
         state = nextState; // Finally set internal state
      }
   }
}