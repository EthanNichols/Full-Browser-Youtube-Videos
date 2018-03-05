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

let baseOverlayButton;

///Add mouse hover events to all of the thumbnails
function AddHoverEvents() {
    
    ///Get a list of all the thumbnails
    let thumbnails = document.querySelectorAll("a#thumbnail");
    
    //Loop through all of the thumbnails
    thumbnails.forEach(function(e) {
        
        //Check if the thumbnail doesn't have a mouse event
        if (!e.mouseEvent) {
            
            //Add the mouse events and set it to have mouse events
            e.parentElement.onmouseover = DisplayOverlay;
            e.parentElement.onmouseout = RemoveOverlay;
            e.mouseEvent = true;
        }
    });
}

/// Create the base button for overlaying tabs
function CreateOverlayBase(element) {
    
    // Return if there is no button to clone
    if (!element.querySelector("#hover-overlays") ||
        !element.querySelector("#hover-overlays").firstChild) {
        return;
    }

    //Clone the one overlay button
    baseOverlayButton = element.querySelector("#hover-overlays").firstChild.cloneNode(false);
    
    //Remove all of the children from the button
    while (baseOverlayButton.firstChild) {
        baseOverlayButton.removeChild(baseOverlayButton.firstChild);
    }
    
    //Add an image to the button
    baseOverlayButton.append(document.createElement("img"));
    baseOverlayButton.querySelector("img").style.width = "100%";
    baseOverlayButton.querySelector("img").style.height = "100%";
    
    //TEMP
    //Set the image of the button
    let imageURL = "Images/PlusControl.png";
    baseOverlayButton.querySelector("img").src = chrome.extension.getURL(imageURL);
    
    //TEMP
    //Offset the button to avoid overlapping buttons
    baseOverlayButton.style.transform = "translateX(-32px)";

    //Add a click event to the overlay button
    baseOverlayButton.onclick = OverlayClick;
}

///Display the add to playlist button
function DisplayOverlay() {
    
    //Create the base button if there isn't one already
    if (baseOverlayButton == null) {
        CreateOverlayBase(this);
        
        if (!baseOverlayButton) {
            return;
        }
    }
    
    //Make the button visible
    baseOverlayButton.style.display = null;
    
    //Add the overlay button over the thumbnail
    this.appendChild(baseOverlayButton);
}

/// Runs when the overlay button is clicked
function OverlayClick() {
    if (!baseOverlayButton) {
        return;
    }
    
    //Get the link element
    let linkElement = this.parentElement.querySelector("a");
    
    //Get the url data for the link
    let localURL = linkElement.pathname + linkElement.search;
    let imageSRC = linkElement.querySelector("img").src;

    let parentCheck = linkElement;
    while (!parentCheck.querySelector("#video-title")) {
        parentCheck = parentCheck.parentElement;
    }
    
    let name = parentCheck.querySelector("#video-title").innerHTML;
    
    AddToQueue(imageSRC, name, URL);
}

/// Hides the overlay buttons from the document
function RemoveOverlay() {
    if (!baseOverlayButton) {
        return;
    }
    baseOverlayButton.style.display = "none";
}

/// Updates the overlay buttons and gets thumbnails
function OverlayUpdate() {
    window.requestAnimationFrame(OverlayUpdate);

    AddHoverEvents();
}