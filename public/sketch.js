// Keep track of our socket connection
let pos, cuColor;
let socket = io();
let cont = "";

function setup() {
  createCanvas(600, 600);
  cuColor = 0;
}

function draw() {
  background(255, 0, 0);
  textSize(90);
  fill(0, 102, 153);
  text(cont, 60, 120);
}

socket.on("contador", (msg) => {
  cont = msg;
})