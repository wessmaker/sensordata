#include "ui.h"
#include <TFT_eSPI.h>
#include "communication/rxtx.h"
#include "communication/debug.h"
#include "controller/controller.h"
#include "communication/wifi.h"
#include "communication/mqtt.h"
#include "util/assertion.h"
void drawMenu(String, String, String);
void clearScreen(u_int8_t, u_int8_t, u_int8_t, u_int8_t);
TFT_eSPI tft = TFT_eSPI(TFT_WIDTH, TFT_HEIGHT);
TFT_eSprite itemSprite1 = TFT_eSprite(&tft);
TFT_eSprite itemSprite2 = TFT_eSprite(&tft);
TFT_eSprite itemSprite3 = TFT_eSprite(&tft);
TFT_eSprite itemSprites[3] = {itemSprite1, itemSprite2, itemSprite3};

TFT_eSprite itemLabel1 = TFT_eSprite(&tft);
TFT_eSprite itemLabel2 = TFT_eSprite(&tft);
TFT_eSprite itemLabel3 = TFT_eSprite(&tft);

struct Item {int position; String menuText;};
Item wifiItem, mqttItem, settingsItem, boardItem, items[4];
int focusedIndex = 1, lastSpriteIndex = 2, lastItemIndex = 3;

void clearScreen(
   u_int8_t xs = 0, 
   u_int8_t ys = 0, 
   u_int8_t xe = TFT_HEIGHT, 
   u_int8_t ye = TFT_WIDTH
){
   tft.fillRect(  // By default will clear whole screen
      xs,
      ys,
      xe,
      ye,
      TFT_BLACK
   );
   Debugging::debug(
      "Cleared screen: " + 
      (String)xs + ", " + 
      (String)ys + ", " + 
      (String)xe + ", " + 
      (String)ye
   );
}

void openItem(const int index){
   if (index < 0)
   {
      Debugging::debug("Incorrect index in openItem!");
      return;
   }
   String debugString = "Focused index in openitem: " + index;
   Debugging::debug(debugString);
   clearScreen();

   itemLabel1.fillSprite(UI_TRANSPARENCY_COLOR);
   itemLabel2.fillSprite(UI_TRANSPARENCY_COLOR);
   itemLabel3.fillSprite(UI_TRANSPARENCY_COLOR);
   /* Decide what to draw depending on the selected item */
   switch (index)
   {
      case 0: {
         Debugging::debug("Set item WIFIITEM");
         String status;
         ASSERT((Wifi::getStatus() == Communication::UNKNOWN), "COmmunication didnt match");
         switch (Wifi::getStatus())
         {
            case Communication::CONNECTED:      { status = "Connected"; break; }
            case Communication::DISCONNECTED:   { status = "Disconnected"; break; }
            default:                            { status = "Unknown"; break; }
         }
         itemLabel1.drawString("WIFI", 0, 0, 4);
         itemLabel2.drawString("Status:", 0, 0, 4);
         itemLabel3.drawString(status, 0, 0, 4);
         break;
      }
         
      case 1: {
         Debugging::debug("Set item MQTTITEM");
         String status;
         switch (MQTT::getStatus())
         {
            case Communication::CONNECTED:      { status = "Connected"; break; }
            case Communication::DISCONNECTED:   { status = "Disconnected"; break; }
            default:                            { status = "Unknown"; break; }
         }
         itemLabel1.drawString("MQTT", 0, 0, 4);
         itemLabel2.drawString("Status:", 0, 0, 4);
         itemLabel3.drawString(status, 0, 0, 4);
         break;
      }

      case 2: {
         Debugging::debug("Set item SETTINGS");
         String status;
         switch (Wifi::getStatus())
         {
            case Communication::CONNECTED:      { status = ""; break; }
            case Communication::DISCONNECTED:   { status = ""; break; }
            default:                            { status = ""; break; }
         }
         itemLabel1.drawString("", 0, 0, 4);
         itemLabel2.drawString(":", 0, 0, 4);
         itemLabel3.drawString(status, 0, 0, 4);
         break;
      }

      case 3: {
         Debugging::debug("Set item BOARD");
         String status;
         switch (Wifi::getStatus())
         {
            case Communication::CONNECTED:      { status = ""; break; }
            case Communication::DISCONNECTED:   { status = ""; break; }
            default:                            { status = ""; break; }
         }
         itemLabel1.drawString("", 0, 0, 4);
         itemLabel2.drawString("", 0, 0, 4);
         itemLabel3.drawString(status, 0, 0, 4);
         break;
      }
      default: {
         break;
      }
   }
   Debugging::debug("Drawing item labels ");
   int x = UI_MENU_ITEM_DEFAULT_X;
   int y1 = UI_MENU_ITEM_SPACING;
   int y2 = y1 + UI_MENU_ITEM_SPACING + UI_MENU_ITEM_HEIGHT;
   int y3 = y2 + UI_MENU_ITEM_SPACING + UI_MENU_ITEM_HEIGHT;
   itemLabel1.pushSprite(x, y1, UI_TRANSPARENCY_COLOR);
   itemLabel2.pushSprite(x, y2, UI_TRANSPARENCY_COLOR);
   itemLabel3.pushSprite(x, y3, UI_TRANSPARENCY_COLOR);
}





void initMenu() {
   //--------- Initializing menu sprites ---------//
   for (int i = 0; i < 3; i++) items[i].position = i; 
   wifiItem.menuText = "WIFI";
   mqttItem.menuText = "MQTT";
   settingsItem.menuText = "Settings";
   boardItem.menuText = "Board";
   items[0] = wifiItem;
   items[1] = mqttItem;
   items[2] = settingsItem;
   items[3] = boardItem;
   for (int i = 0; i <= lastSpriteIndex; i++)   // Sprite templates are created here
   {
      itemSprites[i].createSprite(
                        UI_MENU_ITEM_WIDTH, 
                        UI_MENU_ITEM_HEIGHT
                     );
      itemSprites[i].fillSprite(UI_TRANSPARENCY_COLOR);
   }


   //--------- Initializing item label sprites ---------//
   itemLabel1.createSprite(UI_MENU_ITEM_WIDTH, UI_MENU_ITEM_HEIGHT);
   itemLabel2.createSprite(UI_MENU_ITEM_WIDTH, UI_MENU_ITEM_HEIGHT);
   itemLabel3.createSprite(UI_MENU_ITEM_WIDTH, UI_MENU_ITEM_HEIGHT);
   itemLabel1.fillSprite(UI_TRANSPARENCY_COLOR);
   itemLabel2.fillSprite(UI_TRANSPARENCY_COLOR);
   itemLabel3.fillSprite(UI_TRANSPARENCY_COLOR);
}

void drawMenu(
   String t1 = items[0].menuText, 
   String t2 = items[1].menuText, 
   String t3 = items[2].menuText
){
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
      clearScreen();
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
            focusedIndex <= 0 ? "" : items[focusedIndex - 1].menuText,              //String 1
            items[focusedIndex].menuText,                                           //String 2
            focusedIndex >= lastItemIndex ? "" : items[focusedIndex + 1].menuText   //String 3
         );
      }
   }

   void setState(State nextState){
      if (state != nextState)
      {
         switch (nextState){
            case MENU:
               Controller::backLight(true);
               focusedIndex = 1; //This could be done better, for now cannot go to last focused index
               drawMenu();
               Debugging::debug("UI STATE: MENU");
               break;
            case ITEM:
               Controller::backLight(true);
               Debugging::debug("UI STATE: ITEM");
               openItem(focusedIndex);
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