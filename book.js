status = "";
img = "";
objects =[];

function preload() {
    img = loadImage("book.jpg");
}

function setup() {
    canvas = createCanvas(600, 370);
    canvas.position(370, 240);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status: Detecting object";
}

function modelLoaded() {
    console.log("model Loaded");
    status = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(img, 0, 0, 600, 370);
    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label+ " " + percent + "%",objects[i].x, objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}