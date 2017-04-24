var items = [];
var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421'; // fill in your serial port name here
var inData; // for incoming serial data
var outByte = 0;
var cd = 0;
var ch = 0;
var cm = 0;
var cs = 0;

function setup() {
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing
  serial.open(portName); // open a serial port
  
  createCanvas(windowWidth, 2200);
  for(var i = 0; i < 101; i++) {
    var string = toDo[i];
    items.push(new Item(string, 20, (i*20)+170));
  }
  console.log(items.length);
  console.log(items[0]);
}

function draw() {
  background(87,6,140,127);
  fill(255);
  textSize(40);
  stroke(0);
  strokeWeight(5);
  textAlign(CENTER);
  text("101 Things to do before you graduate from NYU", width/2, 50);

  textSize(20);
  noStroke();
  textAlign(RIGHT);
  text("Click on checkbox to mark item as complete", width-20, 100);
  fill(255,0,0)
  textAlign(LEFT);
  text("Things to Do: " +items.length, 20, 100);
  fill(0,255,0);
  text("Things completed: "+(101-(items.length)), 20, 130);

  fill(255);
  for (var i = 0; i < items.length; i++) {
    items[i].display();
    if (items[i].clicked()) {
      items.splice(i, 1);
    }
  }
  textSize(40);
  textAlign(CENTER);
  fill(0,255,0);
  if(items.length < 1){
    text("Congratulations, you have done everything!", width/2, 350);
  }
  
  cd = (30-(day())+16);
  ch = (24-(hour())+10);
  cm = (60-(minute())-1);
  cs = (60- second());
  
  if(cd < 1 && ch < 1 && cm < 1 && ch < 1 && items.length > 0){
    text("It's OK, you don't have to do everything.", width/2, 400);
  }
}

function Item(string,x,y) {
  this.x = x;
  this.y = y;
  this.string = string;
  
  
  this.display = function() {
    text(this.string, this.x, this.y);
  }
  
  this.clicked = function() {
    var d = dist(mouseX, mouseY, this.x, this.y);
    if (d < 15 && mouseIsPressed){ 
      return true;
    } else {
      return false;
    }
  }
}

function mousePressed() {
  for (var i = 0; i < items.length; i++) {
    items[i].clicked();
  }
}

function serialEvent() {
  var inByte = serial.read();
  inData = inByte;
  outByte = int(items.length);
  serial.write(outByte);
  console.log(outByte);
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}

function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    console.log(i + " " + portList[i]);
  }
}


function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}
