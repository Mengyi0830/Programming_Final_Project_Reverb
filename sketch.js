//Griswold & Friedberg IR recorded in Griswold Hall and Friedberg Hall 

/*Griswold & Friedberg Picture come from school website:
https://peabody.jhu.edu/explore-peabody/our-history/neighborhood-architecture/our-concert-halls/     */

/* Anechoic Orchestra Recording from University of York, Openair Website
www.openairlib.net 
Sourse website : https://webfiles.york.ac.uk/OPENAIR/Anechoic/anechoic-orchestra/Anechoic%20Orchestral/    */

var mode = 0;
let Music,con,Convolved
var drywet,LP,LPR,HP,HPR
let audioStarted = false;
var order


function preload(){

  
  Music = loadSound('14_Orchestral.wav')
  Convolved = loadSound('14_Orchestral.wav')
  GriswoldIR= loadSound('IRfile/S2_R4_R6_Omi.wav')
  FriedberyIR = loadSound('IRfile/IR_S2_R5_F_Stereo_Dummy.wav')
  Drum = loadSound('drumLoop.mp3') 
  con = createConvolver('IRfile/IR_S2_R5_F_Stereo_Dummy.wav'); 
  con.addImpulse('IRfile/S2_R4_R6_Omi.wav');
}


function setup() {
  createCanvas(2000,2000)
  splash = new Splash();
  // My Code
  Convolved.disconnect();
  setIR()
  selectIR()
  SetLPFilter()
  SetHPFilter()
  con.chain(LOWPASS,HIGHPASS)
  mySelect.changed(changeIR);

}


function setIR(){
  //DWSlider's
  DWslider = createSlider(0,1,0.1,0.01);
  DWslider.position(10,20)
  con.process(Convolved);
}
function selectIR(){
  mySelect = createSelect();
  mySelect.position(50, 100);
  // Add IR options.
  mySelect.option('Griswold','1');
  mySelect.option('Firedberg','2');
  
}
function SetLPFilter(){
  LPslider = createSlider(0,22000,22000,1)
  LPslider.position(10,40);
  LOWPASS = new p5.LowPass(); 
}
function SetHPFilter(){
  HPslider = createSlider(0,22000,0,1)
  HPslider.position(10,60);
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

function mousePressed() { 
    if (!audioStarted) {
        playSound();
        audioStarted = true;
    }
}

//switch ir without restart the music, so choose loop()
function playSound(){
  Convolved.loop();
  Music.loop();
}
//pause sound
function stopSound(){
  Convolved.pause()
  Music.pause()
}

function draw() {

  //UI of reverb
  background(0);
  fill(225)
  rect(50,50,1050,500,30)
  if (mouseIsPressed == true) {
    mode = 1;

  }
  if (mode == 1) {
    splash.hide();  
  }
   
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
 console.log(order)
}


