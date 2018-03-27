///
/// Ethan Nichols
/// Ethan.Thomas.Nichols@gmail.com
/// 3 / 2 / 2018
///
/// This script is for the pseudo playlist
/// This script displays the videos in the playlist
/// This script adds the functionality of the playlist
///

"use strict"

//Queue of videos that will be watched
let videoQueue = [];
let currentVideo = 0;

//The canvas and 2d context
let canvasPlaylist;
let canvasCtx;

//The y offset of the video buttons
let yOffset = 0;

//Playlist control variables
let loop = false;

///Video that has been added to the queue
class QueuedVideo {
    
    //Create the video
    constructor(imageSRC, name, URL) {
        
        //Set information about the playlist button
        this.image = new Image();
        this.image.src = imageSRC;
        this.name = name;
        this.URL = URL;
        this.playing = false;
        this.hovering = false;
        
        //Distance between items in the playlist button
        this.padding = 1;
        
        //The position and size of the button
        this.x = 0;
        this.y = 0;
        this.width = 373;
        this.height = 50;
    }
    
    //Display the video on the canvas
    display(ctx, queuePos) {
        
        ctx.fillStyle = "#282828";
        if (this.playing) {
            ctx.fillRect(this.x, this.y, this.width, this.height);
        } else {
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
        
        //Tint the video button if the mouse is hovering over it
        if (this.hovering) {
            ctx.fillStyle = "#888888";
            ctx.fillRect(this.x, this.y, this.width, this.height);
            console.log(this.name);
        }
        
        //Set the offset of the video button
        this.y = this.height * queuePos - yOffset;
        
        //Display the image thumbnail
        ctx.drawImage(this.image, this.padding, this.y + this.padding, (this.height - this.padding * 2) * 1.8, this.height - this.padding * 2);
        
        //Display the name of the video
        ctx.fillStyle = (this.playing) ? "white" : "black";
        ctx.font = "16px 'YouTube Noto'";
        ctx.fillText(this.name, (this.height - this.padding * 2) * 1.9, this.y + this.padding + 14);
    }
    
    //Test if the button is clicked
    click(pos) {
        
        //Set the video url if the button is clicked
        if (pos.x > this.x && pos.x < this.x + this.width &&
        pos.y > this.y && pos.y < this.y + this.height) {
            this.play();
        } else {
            this.stop();
        }
    }
    
    play() {
        SetVideo(this.URL, 1);
        this.playing = true;
    }
    stop() {
        this.playing = false;
    }
    
    //Test if the mouse is hovering over the button
    hover(pos) {
        
        //Set if the video button is being hovered over
        if (pos.x > this.x && pos.x < this.x + this.width &&
        pos.y > this.y && pos.y < this.y + this.height) {
            this.hovering = true;
        } else {
            this.hovering = false;
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
    
    canvasPlaylist.onclick = PlaylistClick;
    canvasPlaylist.onmousewheel = PlaylistScroll;
    
    //Remove scrolling when hovering over the playlist canvas
    canvasPlaylist.onmousemove = function(e) {
        document.querySelector("body").style.overflow = "hidden";
        for (let i=0; i<videoQueue.length; i++) {
            videoQueue[i].hover(MousePosition(canvasPlaylist, e));
        }
    }
    //Enable hovering when the mouse leaves the canvas
    canvasPlaylist.onmouseout = function(e) {
        document.querySelector("body").style.overflow = null;
        for (let i=0; i<videoQueue.length; i++) {
            videoQueue[i].hover(MousePosition(canvasPlaylist, e));
        }
    }
    
    //Run the update canvas function
    UpdateCanvas();
}

///Add a video to the queue of videos
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

///Get the mouse position relative to the element
function MousePosition(canvas, evt) {
    
    //Get the rectangle of the element
    let rect = canvasPlaylist.getBoundingClientRect();
    
    //Return the relative X and Y position
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

///Run when the playlist canvas is clicked
function PlaylistClick(e) {
    
    //Get the mouse position
    let mousePos = MousePosition(canvasPlaylist, e);
    
    //Test all the playlist buttons if they've been clicked
    for (let i=0; i<videoQueue.length; i++) {
        
        //Skip the video if it's already playing
        if (videoQueue[i].playing) {continue;}
        
        videoQueue[i].click(mousePos);
        
        //If the video is player set the current playing video and return
        if (videoQueue[i].playing) {
            
            //Stop the current video if another video is clicked
            if (currentVideo != i) {
                videoQueue[currentVideo].stop();
            }
            currentVideo = i;
        }
    }
}

//Allow scrolling through the playlist to see hidden videos
function PlaylistScroll(e) {
    
    //Disable scrolling for the page
    document.querySelector("body").style.overflow = "hidden";
    
    //If the playlist doesn't have 5 videos don't scroll and set no offset
    if (videoQueue.length <= 5) {
        yOffset = 0;
        return;
    }

    //Get the direction the mouse is scrolling
    let dir = e.deltaY / Math.abs(e.deltaY);
    
    //Set the new offset of the videos
    yOffset += dir * 5;
    
    //Restrict the scroll to the length of videos in the playlist
    if (yOffset >= (videoQueue.length - 5) * videoQueue[0].height) {
        yOffset = (videoQueue.length - 5) * videoQueue[0].height;
    }
    
    //Make sure the scroll doesn't go below 0
    if (yOffset < 0) {
        yOffset = 0;
    }
}

///Play the next video in the queu
function NextVideo() {
    
    //Stop the current video
    videoQueue[currentVideo].stop();

    //Get the next video
    currentVideo = (currentVideo+1) % videoQueue.length;
    
    //Stop the playlist if loop isn't enabled
    if (currentVideo == 0 && !loop) {return;} 
    
    //Play the next video
    videoQueue[currentVideo].play();
}

//Update the canvas display and dimensions
function UpdateCanvas() {
    
    //Animation callback
    requestAnimationFrame(UpdateCanvas);
    
    //Set the height of the canvas
    canvasPlaylist.height = videoQueue.length * 50;
    canvasPlaylist.style.height = (videoQueue.length * 50).toString() + "px";
    
    //If there are no videos in the playlist return
    if (videoQueue.length == 0) {return;}
    
    //Limit the height of the playlist to 5 videos
    if (videoQueue.length * videoQueue[0].height >= 250) {
        canvasPlaylist.height = 250;
        canvasPlaylist.style.height = "250px";
    }
    
    //Draw the background
    canvasCtx.fillStyle = "#fafafa";
    canvasCtx.fillRect(0, 0, canvasPlaylist.width, canvasPlaylist.height);
    
    //Draw all the videos in the queue
    for (let i=0; i<videoQueue.length; i++) {
        videoQueue[i].display(canvasCtx, i);
    }
}