song="";
leftwristx="";
leftwristy="";
rightwristx="";
rightwristy="";

function preload(){
song= loadSound("music.mp3")
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide()
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded(){
    console.log("Model is loaded");
}

function draw(){
    image(video, 0, 0, 600, 500);
fill("#FF0000");
stroke("#FF0000");

if (scoreRightWrist> 0.2)
circle(rigthWristX, rightWristY,20);
if(rightWristY>0 && rightWrist<100)    
{
    document.getElementById("speed").innerHTML = "Speed = 0.5x";
    song.rate(0.5)
}
else if(rightWirstY>100 && rightWristY<200)
{
    document.getElementById("speed").innerHTML = "Speed= 1x";
    song.rate(1) 
}
else if(rightWristY>200 && rightWristY<300)
{
    document.getElementById("speed").innerHTML="Speed=1.5x";
    song.rate(1.5);
}
else if(rightWristY>300 && rightWristY<400)
{
    document.getElementById("speed").innerHTML = "Speed = 2x";
    song.rate(2);
}
else if(rightWristY>400 && rightWristY<500)
{
    document.getElementById("speed").innerHTML = "Speed = 2.5x";
    song.rate(2.5);
}

if(scoreLeftWrist > 0.2)
circle("leftWristX,leftWristY,20");
InNumberleftWristY= Number (leftWristY);
remove_decimals = floor (leftWristY);
volume= remove_decimals/500;
document.getElementById("volume").innerHTML="Volume =" + volume;
song.setVolume(volume)
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreRightWrist = result[0].pose.keypoints[10].score;
        scoreLeftWrist = result[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist= " + scoreLeftWrist);
        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.rightWrist.y;
        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
        console.log(leftwristx, leftwristy, rightwristx, rightwristy);
    }
}

function Start(){
song.play();
song.setVolume(0.5);
song.rate(1);
}

function Pause(){
song.pause();
}