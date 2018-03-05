"use strict"

let videoQueue = [];

let canvasPlaylist;
let canvasCtx

class QueuedVideo {
    
    constructor(imageSRC, name, URL) {
        this.image = new Image();
        this.image.src = imageSRC;
        this.name = name;
        this.URL = URL;
        
        this.padding = 1;
        
        this.width = 373;
        this.height = 50;
    }
    
    display(ctx, queuePos) {
        ctx.drawImage(this.image, this.padding, this.height * queuePos + this.padding, (this.height - this.padding * 2) * 1.8, this.height - this.padding * 2);
    }
}

function CreateCanvas() {
    canvasPlaylist = document.createElement("canvas");
    canvasPlaylist.id = "canvasPlaylist";
    
    document.querySelector("body").appendChild(canvasPlaylist);
    
    canvasPlaylist.style.zIndex = "10000";
    canvasPlaylist.style.bottom = "210px";
    canvasPlaylist.style.left = "0px";
    canvasPlaylist.style.position = "fixed";
    canvasPlaylist.style.width = "373px";
    canvasPlaylist.style.height = "400px";
    canvasPlaylist.style.border = "none";
    
    canvasPlaylist.width = 373;
    canvasPlaylist.height = 400;
    canvasCtx = canvasPlaylist.getContext("2d");
    
    UpdateCanvas();
}

function AddToQueue(imageSRC, name, URL) {
    
    if (URL.length > 11) {
        URL = URL.split('=')[1].substring(0, 11);
    }
    
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
    
    videoQueue.push(new QueuedVideo(imageSRC, name, URL));
    
    console.log(videoQueue);
}

function UpdateCanvas() {
    requestAnimationFrame(UpdateCanvas);
    
    canvasCtx.fillStyle = "red";
    canvasCtx.fillRect(0, 0, canvasPlaylist.width, canvasPlaylist.height);
    
    canvasCtx.fillStyle = "black";
    canvasCtx.fillRect(0, 0, canvasPlaylist.width, 50);
    
    for (let i=0; i<videoQueue.length; i++) {
        videoQueue[i].display(canvasCtx, i);
    }
}