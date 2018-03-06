"use strict"

//Queue of videos that will be watched
let videoQueue = [];

//The canvas and 2d context
let canvasPlaylist;
let canvasCtx

//Video that has been added to the queue
class QueuedVideo {
    
    //Create the video
    constructor(imageSRC, name, URL) {
        this.image = new Image();
        this.image.src = imageSRC;
        this.name = name;
        this.URL = URL;
        
        this.padding = 1;
        
        this.x = 0;
        this.y = 0;
        this.width = 373;
        this.height = 50;
    }
    
    //Display the video on the canvas
    display(ctx, queuePos) {
        
        //Display the image thumbnail
        ctx.drawImage(this.image, this.padding, this.height * queuePos + this.padding, (this.height - this.padding * 2) * 1.8, this.height - this.padding * 2);
        
        this.y = this.height * queuePos;
        
        //Display the name of the video
        ctx.fillStyle = "white";
        ctx.font = "16px 'YouTube Noto'";
        ctx.fillText(this.name, (this.height - this.padding * 2) * 1.9, this.height * queuePos + this.padding + 14);
    }
    
    testClick(pos) {
        
        console.log(this.y);
        
        if (pos.x > this.x && pos.x < this.x + this.width &&
           pos.y > this.y && pos.y < this.y + this.height) {
            console.log(this.name);
            SetVideo(this.URL, 1);
        }
    }
}

//Create the canvas to display the videos in the queue
function CreateCanvas() {
    
    //Create the canvas element
    canvasPlaylist = document.createElement("canvas");
    canvasPlaylist.id = "canvasPlaylist";
    
    //Add the video to the document
    document.querySelector("body").appendChild(canvasPlaylist);
    
    //Set display information for the canvas
    canvasPlaylist.style.zIndex = "10000";
    canvasPlaylist.style.bottom = "210px";
    canvasPlaylist.style.left = "0px";
    canvasPlaylist.style.position = "fixed";
    canvasPlaylist.style.width = "373px";
    canvasPlaylist.style.height = "400px";
    canvasPlaylist.style.border = "none";
    
    //Set the width and height of the canvas and get the context
    canvasPlaylist.width = 373;
    canvasPlaylist.height = 400;
    canvasCtx = canvasPlaylist.getContext("2d");
    
    //Run the update canvas function
    UpdateCanvas();
}

//Add a video to the queue of videos
function AddToQueue(imageSRC, name, URL) {
    
    //Get the video if from the URL provided
    if (URL.length >= 11) {
        URL = URL.split('=')[1].substring(0, 11);
    }
    
    //Remove spaces and new lines from the video name
    while (name.charAt(0) == ' ' ||
           name.charAt(0) == "\n" ||
           name.charAt(name.length - 1) == ' ' ||
           name.charAt(name.length - 1) == "\n") {
        if (name.charAt(0) == ' ' || name.charAt(0) == "\n") {
            name = name.substr(1, name.length - 1);
        }
        if (name.charAt(name.length - 1) == ' ' ||
           name.charAt(name.length - 1) == "\n") {
            name = name.substr(0, name.length - 1);
        }
    }
    
    //Create a new queueVideo and add it to the queue
    videoQueue.push(new QueuedVideo(imageSRC, name, URL));
}

function MousePosition(canvas, evt) {
    let rect = canvasPlaylist.getBoundingClientRect();
    
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

//Update the canvas display and dimensions
function UpdateCanvas() {
    
    //Animation callback
    requestAnimationFrame(UpdateCanvas);
    
    canvasPlaylist.height = videoQueue.length * 50;
    canvasPlaylist.style.height = (videoQueue.length * 50).toString() + "px";
    
    if (videoQueue.length == 0) {return;}
    
    //Limit the height of the playlist to 5 videos
    if (videoQueue.length * videoQueue[0].height >= 250) {
        canvasPlaylist.height = 250;
        canvasPlaylist.style.height = "250px";
    }
    
    //Draw the background
    canvasCtx.fillStyle = "black";
    canvasCtx.fillRect(0, 0, canvasPlaylist.width, canvasPlaylist.height);
    
    //Draw all the videos in the queue
    for (let i=0; i<videoQueue.length; i++) {
        videoQueue[i].display(canvasCtx, i);
        canvasPlaylist.onclick = function(e) {
            videoQueue[i].testClick(MousePosition(canvasPlaylist, e));
        }
    }
}