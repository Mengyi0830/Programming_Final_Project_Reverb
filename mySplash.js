class Splash {

 constructor() {
   
  this.splashBorder = 100;
  fill(255);
  stroke(255, 0, 0)
  rect(this.splashBorder, this.splashBorder, windowWidth-this.splashBorder*2, windowHeight-this.splashBorder*2);
  
   
   fill(0, 0, 222);
  strokeWeight(3)
   
  line(windowWidth-this.splashBorder-40, this.splashBorder+20,windowWidth-this.splashBorder-20, this.splashBorder+40)
   line(windowWidth-this.splashBorder-20, this.splashBorder+20,windowWidth-this.splashBorder-40, this.splashBorder+40)
   
  this.title = createDiv("Convolution Reverb");
  this.title.style('color:deeppink');
  this.title.style('font-family: Arial, Helvetica, sans-serif');
  this.title.position(this.splashBorder+20, this.splashBorder+20);
  
  this.name = createDiv("Mengyi Yang");
  this.name.position(this.splashBorder+20, this.splashBorder+60);
  
  this.info = createDiv("My project is to creating a front end of p5.js function to making a convolution reverb, IR (impulse response) including 2 concert hall at Peabody Institute of Johns Hopkins University.");
   
  
  this.info.position(this.splashBorder+20, this.splashBorder+100);
  this.info.size(windowWidth-this.splashBorder*2-50, windowHeight-this.splashBorder*2-50)
  
 
   
   this.codelink = createA('https://editor.p5js.org/Mengyi0830/sketches/QwOM4Pvz4','view p5.js code');
   
   this.codelink.position(this.splashBorder+20,this.splashBorder+220)
}
 
update(){
       if(mouseX > windowWidth-this.splashBorder-40 && 
          mouseX < windowWidth-this.splashBorder-20 
          && mouseY < this.splashBorder+40 && mouseY > this.splashBorder+20
     ){
     return true
   }
  }
  
  hide(){
    this.title.remove()
    this.name.remove()
    this.info.remove()
 
    this.codelink.remove()
  }
}

