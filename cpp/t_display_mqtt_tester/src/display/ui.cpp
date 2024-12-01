#include "ui.h"
#include <TFT_eSPI.h>
#include "communication/communication.h"
#include "communication/debug.h"
#include "board/board.h"

void changeMenuTexts(String, String, String);
void createMenu();
void drawMenuRect(int);
void drawMenu(int);
void clearScreen();

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


void changeMenuTexts(String t1, String t2, String t3){
   String texts[3] = {t1, t2, t3};
   for (int i = 0; i <= lastSpriteIndex; i++)
   {
      itemSprites[i].fillSprite(TFT_BLACK);
      if (texts[i] != "")
      {
         itemSprites[i].drawString(
               texts[i],
               7,
               7,
               UI_MENU_ITEM_FONT_SIZE
            );
      }
   }
}




void createMenu() {
   wifiItem.text = "WIFI";
   mqttItem.text = "MQTT";
   settingsItem.text = "Settings";
   voltageItem.text = "Voltage";
   for (int i = 0; i < 3; i++){ items[i].position = i; }
   items[0] = wifiItem;
   items[1] = mqttItem;
   items[2] = settingsItem;
   items[3] = voltageItem;
   for (int i = 0; i <= lastSpriteIndex; i++)
   {
      itemSprites[i].createSprite(
                        UI_MENU_ITEM_WIDTH, 
                        UI_MENU_ITEM_HEIGHT
                     );
      itemSprites[i].fillSprite(UI_TRANSPARENCY_COLOR);
   }

   changeMenuTexts(items[0].text, items[1].text, items[2].text);
}





void drawMenuRect(int hidePos){
   for (int i = 0; i <= lastSpriteIndex; i++)
   {
      if (i != hidePos)
      {
         itemSprites[i].drawRoundRect(   // Rectangle 1px
            0, 
            0, 
            UI_MENU_ITEM_WIDTH,
            UI_MENU_ITEM_HEIGHT,
            UI_MENU_ITEM_ROUNDNESS,
            TFT_RED
         );
         itemSprites[i].drawRoundRect(   // Double rectangle widht
            1, 
            1, 
            UI_MENU_ITEM_WIDTH - 1,
            UI_MENU_ITEM_HEIGHT - 1,
            UI_MENU_ITEM_ROUNDNESS,
            TFT_RED
         );
      }
   }
}


void drawMenu(int hidePos){
   for (int i = 0; i <= lastSpriteIndex; i++)
   {
      if (items[i].text == "")
      {
         int x = i == 1 ? UI_MENU_ITEM_FOCUS_X : UI_MENU_ITEM_DEFAULT_X;
         int y = (UI_MENU_ITEM_SPACING * (i + 1)) + (UI_MENU_ITEM_HEIGHT * i);
         itemSprites[i].pushSprite(
            x,
            y,
            UI_TRANSPARENCY_COLOR
         );
         Debugging::debug("DRAWING");
         Debugging::debug(i);

      }
      else
      {
         hidePos = i;
         itemSprites[hidePos].pushSprite(TFT_HEIGHT * 10, TFT_WIDTH * 10); //Push sprite outside screen to hide it
         itemSprites[hidePos].fillSprite(TFT_BLACK);
         Debugging::debug("HIDING");
         Debugging::debug(i);
      }
   }
   drawMenuRect(hidePos); // Recreate rectangles to 
}






void clearScreen(){
   tft.fillScreen(TFT_BLACK);
}


namespace UI{
   State state;

   void init(){
      tft.init();
      tft.setRotation(DISPLAY_ROTATION);  // 1 = position (0, 0) is at the top left when buttons are on right (horizontal)
      tft.setTextColor(TFT_WHITE, TFT_ORANGE);
      clearScreen();
      createMenu();
      drawMenu(-1);
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
         if (focusedIndex == 0 )             hidePos = 1;
         if (focusedIndex == lastItemIndex ) hidePos = 2;
         changeMenuTexts(
            focusedIndex <= 0 ? "" : items[focusedIndex - 1].text,
            items[focusedIndex].text,
            focusedIndex >= lastItemIndex ? "" : items[focusedIndex + 1].text
         );
         drawMenu(hidePos);
      }
   }



   void setState(State nextState){
      state = nextState;
      switch (state){
         case SELECTING:
            clearScreen();
            drawMenu(-1);
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