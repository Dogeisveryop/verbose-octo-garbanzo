Status = "";
objects = [];

function setup(){
    canvas = createCanvas(500,350);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}
function start(){
    ODetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("ostatus").innerHTML = "Detecting Object";
    inputt = document.getElementById("input").value;
}
function modelLoaded(){
    console.log("Model_Loaded");
    Status = true;
}
function draw(){
    image(video,0,0,500,400);
    if(Status != ""){
        ODetector.detect(video, gotResults);
        for(i = 0;i < objects.length;i++){
            document.getElementById("ostatus").innerHTML = "Object Detected";
            console.log(objects.length);
            fill("black");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke("black");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == inputt){
                video.stop();
                ODetector.detect(gotResults);
                document.getElementById("found").innerHTML = inputt+" Found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(inputt + "Found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("found").innerHTML = input_text + " Not Found";
            }
        }
    }
}

function gotResults(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}