class Splash {

 constructor() {
   
  this.splashBorder = 100;
  fill(255);
  stroke(255, 0, 0)
  rect(this.splashBorder, this.splashBorder, windowWidth-this.splashBorder*2, windowHeight-this.splashBorder*2);
  fill(0, 0, 222);
  noStroke()
   
  this.title = createDiv("Convolution Reverb");
  this.title.style('color:deeppink');
  this.title.style('font-family: Arial, Helvetica, sans-serif');
  this.title.position(this.splashBorder+20, this.splashBorder+20);
  
  this.name = createDiv("Mengyi Yang");
  this.name.position(this.splashBorder+20, this.splashBorder+60);
  
  this.info = createDiv("My project is to creating a front end of p5.js function to making a convolution reverb");
  
  this.info.position(this.splashBorder+20, this.splashBorder+100);
  this.info.size(windowWidth-this.splashBorder*2-50, windowHeight-this.splashBorder*2-50)
  
}
 
  hide(){
    this.title.remove()
    this.name.remove()
    this.info.remove()
  }
}

