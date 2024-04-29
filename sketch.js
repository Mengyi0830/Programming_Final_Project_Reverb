//Griswold & Friedberg IR recorded in Griswold Hall and Friedberg Hall 

/*Griswold & Friedberg Picture come from school website:
https://peabody.jhu.edu/explore-peabody/our-history/neighborhood-architecture/our-concert-halls/     */

/* Anechoic Orchestra Recording from University of York, Openair Website
www.openairlib.net 
Sourse website : https://webfiles.york.ac.uk/OPENAIR/Anechoic/anechoic-orchestra/Anechoic%20Orchestral/    */

var mode = 0;
let Music,con,Convolved
var drywet,LP,LPR,HP,HPR,pretime
let audioStarted = false;
var order,timeout
var GWimag,FBimag
let pbutton,sbutton

function preload(){

  
  Music = loadSound('14_Orchestral.wav');
  Convolved = loadSound('14_Orchestral.wav');
  con = createConvolver('IRfile/GriswoldIR.wav'); 
  con.addImpulse('IRfile/FriedbergIR.wav');  
  FBimag = loadImage('imagine/Friedberg.jpg');
  GWimag = loadImage('imagine/Griswold.jpg');

}


function setup() {
  createCanvas(2000,2000)
  //setup for stop/play button
  sbutton = createButton('stop');
  pbutton = createButton('play');
  pbutton.mousePressed(playafterclick);
  sbutton.mousePressed(stopSound);
  //fft
  FFT = new p5.FFT()
  // My Code
  Convolved.disconnect();
  setIR()
  selectIR()
  SetLPFilter()
  SetHPFilter()

  con.chain(LOWPASS,HIGHPASS)
  mySelect.changed(changeIR);
  
  splash = new Splash();
  getAudioContext().suspend();
}


function setIR(){
  //DWSlider's
  DWslider = createSlider(0,1,0.1,0.01);
  
  con.process(Convolved);
}
function selectIR(){
  mySelect = createSelect();
  
  // Add IR options.
  mySelect.option('Griswold','1');
  mySelect.option('Firedberg','2');
  
}
function SetLPFilter(){
  LPslider = createSlider(0,22000,22000,1)
  
  LOWPASS = new p5.LowPass(); 
}
function SetHPFilter(){
  HPslider = createSlider(0,22000,0,1)
  
  HIGHPASS = new p5.HighPass();
}

function DrywetPercent(){
  drywet = DWslider.value()
  Convolved.amp(drywet)
  Music.amp(1-drywet)
}

function rtLPFilter(){
  LP = LPslider.value()
  LOWPASS.freq(LP) 
}

function rtHPFilter(){
  HP = HPslider.value()
  HIGHPASS.freq(HP) 
}


function changeIR(){
  con.toggleImpulse(order)
  stopSound()
  playSound()
}



//switch ir without restart the music, so choose loop()
function playSound(){
  Music.loop();
  Convolved.loop();
}


//pause sound
function stopSound(){
  Convolved.pause();
  Music.pause();
}

//play sound after click button play
function playafterclick(){
  Convolved.pause();
  Music.pause();
  Convolved.play();
  Music.play();
}


function draw() {

  //UI of reverb
  

  if (mouseIsPressed == true && splash.update() == true) {
    mode = 1;

  }
  if (mode == 1) {
    
        if (!audioStarted) {
        userStartAudio();
        audioStarted = true;
      playSound()
    }
  background(255)
  if(order === 1){
   fill(255,254,179)
   rect(50,50,1050,500,30)
  }else{
  fill(177,100,122)
  rect(50,50,1050,500,30)
  }
  

  HPslider.position(700,400);
  HPslider.size(200)
  DWslider.position(100,400);
  DWslider.size(200);
  LPslider.position(400,400);
  LPslider.size(200);
  sbutton.position(500,320)
  pbutton.position(600,320)
    
    
  //drywettext
  stroke(20,56,21)
  fill(111,203,159)
  rect(100,430,map(DWslider.value(),0,1,0,250),80)
  noFill()
  rect(100,430,250,80)
  
  fill(251,46,1)
  textSize(30)
  text('Dry/Wet',140,480);
  
   //LPtext
    
  fill(102,101,71)
  rect(370,430,map(LPslider.value(),0,22000,0,280),80)
  noFill()
  rect(370,430,280,80) 
  fill(111,203,159)
  textSize(25)
  text('Low Pass Frequency',400,480);
  
  // HP
  fill(251,46,1)
  rect(690,430,map(HPslider.value(),0,22000,0,280),80)
  noFill();
  rect(690,430,280,80);
  fill(102,101,71);
  textSize(25);
  text('High Pass Frequency',720,480);
  
   
  mySelect.position(100,320);
  mySelect.size(200);
  //title
  fill(78,109,158);
  textSize(60);
  text('Peabody IR Reverb',340,105);
  
    
  splash.hide();  
  DrywetPercent();
  rtLPFilter();
  rtHPFilter(); 
  
  //ir switch
  I = mySelect.selected()
  if (I === '1'){
    order = 0
  }else{
    order = 1
  }
   if (order === 0){
    image(GWimag,100,120)
  }
  if (order === 1){
    image(FBimag,100,120)
    }        

  // the fft fucntion
    rect(500,120,500,180)
  
  let spectrum = FFT.analyze();
  noStroke();
  fill(255, 0, 255);
  for (let i = 0; i< spectrum.length; i++){
  let x = map(i, 0, spectrum.length, 0, 500);
  let h =   -map(spectrum[i], 0, 255, 180, 0);
  fill(20);
  rect(x+500, 300, width / spectrum.length, h )
  } 
  }
   
}


