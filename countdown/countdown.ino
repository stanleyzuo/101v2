#include <LiquidCrystal.h>
int ledPin = 8;
int ledPin2 = 9;
int ledState = LOW;
int inByte;
unsigned long previousMillis = 0;
const long interval = 1000;

int S = 0; // count seconds
int M = 37; // count minutes
int H = 23; // count hours
int D = 22; // count days

//initialize the library with the numbers of the interface pins
LiquidCrystal lcd(4, 6, 10, 11, 12, 13); // pins connected to LCD

void setup() {
  Serial.begin(9600);
  lcd.begin(16, 2); //set up the LCD's number of columns and rows
  pinMode(ledPin, OUTPUT);
  pinMode(ledPin2, OUTPUT);

  while (Serial.available() <= 0) {
    Serial.println("waiting");
  }
}

void loop() {
  if (Serial.available() > 0) {
    inByte = Serial.read();
    Serial.println(inByte);
  }
    
  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {
    S--;
  
  if (S < 0)
  {
    M--;
    S = 59;
  }
  if (M < 0)
  {
    H--;
    M = 59;
  }
  if (H < 0)
  {
    D--;
    H = 23;
  }
  if (D < 0)
  {
    D = 0;
    H = 0;
    M = 0;
    S = 0;
  }
  if (M > 9)
  {
    lcd.setCursor(8, 1);
    lcd.print(M);
  }
  else
  {
    lcd.setCursor(8, 1);
    lcd.print("0");
    lcd.setCursor(9, 1);
    lcd.print(M);
    lcd.setCursor(10, 1);
    lcd.print(":");
  }

  if (S > 9)
  {
    lcd.setCursor(11, 1);
    lcd.print(S);
  }
  else
  {
    lcd.setCursor(11, 1);
    lcd.print("0");
    lcd.setCursor(12, 1);
    lcd.print(S);
    lcd.setCursor(13, 1);
    lcd.print(" ");
  }

  if (H > 9)
  {
    lcd.setCursor(5, 1);
    lcd.print (H);
  }
  else
  {
    lcd.setCursor(5, 1);
    lcd.print("0");
    lcd.setCursor(6, 1);
    lcd.print(H);
    lcd.setCursor(7, 1);
    // lcd.print(":");
  }

  if (D > 9)
  {
    lcd.setCursor(2, 1);
    lcd.print (D);
  }
  else
  {
    lcd.setCursor(2, 1);
    lcd.print("0");
    lcd.setCursor(3, 1);
    lcd.print(D);
    lcd.setCursor(4, 1);
    lcd.print(":");
  }
    previousMillis = currentMillis;

    if (ledState == LOW) {
      ledState = HIGH;

    } else {
      ledState = LOW;
    }
    digitalWrite(ledPin, ledState);

    if (inByte < 1){
    digitalWrite(ledPin, LOW);
    digitalWrite(ledPin2, HIGH);
    }

    if (S<1 && M<1 && H<1 && D<1){
    digitalWrite(ledPin, LOW);
    digitalWrite(ledPin2, HIGH);
    }
  }

  lcd.setCursor(4, 0);
  lcd.print ("To Do:");
  lcd.setCursor(10, 0);
  lcd.print(inByte);
  lcd.setCursor(4, 1);
  lcd.print("d");
  lcd.setCursor(7, 1);
  lcd.print("h");
  lcd.setCursor(10, 1);
  lcd.print("m");
  lcd.setCursor(13, 1);
  lcd.print("s");

  if (inByte < 100) {
    lcd.setCursor(12,0);
    lcd.print(" ");
  }

  if (inByte < 10) {
    lcd.setCursor(11,0);
    lcd.print(" ");
  }
}
