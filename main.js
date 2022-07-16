song1="";
song2="";
song1_status="";
song2_status="";

leftwristX=0;
rightwristX=0;
leftwristY=0;
rightwristY=0;


scoreLeftwrist=0;
scoreRightwrist=0;


function setup()
{
    canvas=createCanvas(500,400)
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video,modalloaded);
    posenet.on("pose", gotposes);
    
}

function modalloaded()
{
    console.log("Posenet is initialized");
}

function gotposes(results)
{
    if (results.length>0)
    console.log(results);

    scoreLeftwrist= results[0].pose.keypoints[9].score;
    console.log("scoreLeftwrist =" + scoreLeftwrist);


    scoreRightwrist= results[0].pose.keypoints[10].score;
    console.log("scoreRightwrist =" + scoreRightwrist);

    leftwristX= results[0].pose.leftWrist.x;
    leftwristY= results[0].pose.leftWrist.y;
    console.log("leftwristX="+leftwristX+",leftwristY="+leftwristY);

    rightwristX= results[0].pose.rightWrist.x;
    rightwristY= results[0].pose.rightWrist.y;
    console.log("rightwristX="+rightwristX+",rightwristY="+rightwristY);


}

function preload()
{
    song1=loadSound("music.mp3");
    song2=loadSound("bdayaudio.mp3");
}

function draw()
{
    image(video,0,0,500,400);

    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();



    
    fill('#FF0000');
    stroke('#FF0000');

    if(scoreLeftwrist>0.2)
    {
    circle(leftwristX,leftwristY,20);
    song1.stop();
    if (song2_status==false)
    {
        song2.play();

        document.getElementById("song").innerHTML = "Playing - Happy Birthday";

    }

    }

    if(scoreRightwrist>0.2)
    {
    circle(rightwristX,rightwristY,20);
    song2.stop();
    if (song1_status==false)
    {
        song1.play();

        document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song";
        
    }


}
}

function play()
{
    song.play();
    song.volume(1);
    song.rate(1);
}



