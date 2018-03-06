///
/// Ethan Nichols
/// Ethan.Thomas.Nichols@gmail.com
/// 3 / 2 / 2018
///
/// This script is for the video iframe
/// Allowing the user to search for other videos while watching the current video
/// This script should only mess with data about the video iframe
///

"use strict"

//Iframe that holds the video that doesn't stop playing
let iframeVideo;

//Create the Iframe to hold the video
function SetVideo(link, autoplay = 0) {
    
    //Set the starting embedded video source
    let src = "https://www.youtube.com/embed/";
    
    src += link;

    //Add the autoplay aspect to the video
    src += "?autoplay=" + autoplay;
    
    //TODO
    //Add the ability to start the video at any time
    //This will be useful when the user searches something
    //So the video will continue where they were before they searched
    
    //Set the source of the video
    iframeVideo.src = src;
}

///Get elements for the video
function GetVideoPageElements() {
    
    //Create the iframe and give it an id
    iframeVideo = document.createElement("iframe");
    iframeVideo.id = "playlistVideo";
    
    //Append the iframe to the document
    document.querySelector("body").appendChild(iframeVideo);
    
    //Set information about the iframe video
    iframeVideo.style.zIndex = "10000";
    iframeVideo.style.bottom = "0px";
    iframeVideo.style.left = "0px";
    iframeVideo.style.position = "fixed";
    iframeVideo.style.width = "373px";
    iframeVideo.style.height = "210px";
    iframeVideo.style.border = "none";
}