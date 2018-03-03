///
/// Ethan Nichols
/// Ethan.Thomas.Nichols@gmail.com
/// 3 / 2 / 2018
///
/// This script is for messing with video thumbnails
/// Messing with overlay data for the thumbnail
/// As well as accessing data for the thumbnail, like images and links
///

"use strict"

///Add mouse hover events to all of the thumbnails
function AddHoverEvents() {
    
    ///Get a list of all the thumbnails
    let thumbnails = document.querySelectorAll("#thumbnail");
    
    
    thumbnails.forEach(function(e) {
        
        //Check if the thumbnail doesn't have a mouse event
        if (!e.mouseEvent) {
            
            //Only add the mouse event to the static image div
            //There is another div that has a gif of the video
            //This makes sure that only 1 mouse event is created
            if (e.parentElement.getAttribute("use-hovered-property") != null) {
                e.parentElement.onmouseenter = DisplayOverlay;
                e.mouseEvent = true;
            }
        }
    });
}

///Display the add to playlist button
function DisplayOverlay() {
    console.log(this.querySelector("a"));
}

function OverlayUpdate() {
    window.requestAnimationFrame(OverlayUpdate);

    AddHoverEvents();
}