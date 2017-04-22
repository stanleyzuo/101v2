var items = [];

function setup() {
  createCanvas(windowWidth, 2200);
  for(var i = 0; i < toDo.length; i++) {
    var string = toDo[i];
    items.push(new Item(string, 20, (i*20)+100));
  }
  console.log(items.length);
  console.log(items[0]);
}

function draw() {
  background(86,6,140);
  fill(255);
  noStroke();
  textSize(20);
  textAlign(LEFT);
  text("Things to Do: " +items.length, 20, 50);
  for (var i = 0; i < items.length; i++) {
    items[i].display();
    if (items[i].clicked()) {
      items.splice(i, 1);
    }
  }
  textSize(40);
  textAlign(CENTER);
  fill(255);
  stroke(0);
  strokeWeight(5);
  if(items.length < 1){
    text("Congratulations, you have done everything!", width/2, 710/2);
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
