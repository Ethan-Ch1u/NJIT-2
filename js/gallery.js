// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/
//Part 2 constructor 


function swapPhoto() {


	//if the current index is greater than or equal to the length of mImages and an if that statement is true, set the current index to 0


	if(mCurrentIndex >= mImages.length){
	mCurrentIndex = 0;
}
if(mCurrentIndex < 0 ){
	mCurrentIndex = mImages.length - 1;
}
//Accesses the 'photo' in the HTML document by creating 3 variables, for location, description, and date
	
	//Add code here to access the #slideShow element.
	document.getElementById('photo').src = mImages[mCurrentIndex].img;
	var loc = document.getElementsByClassName('location');
	loc[0].innerHTML = 'location: ' + mImages[mCurrentIndex].location;
	var des = document.getElementsByClassName('description');
	des[0].innerHTML = 'description: ' + mImages[mCurrentIndex].description;
	var dt = document.getElementsByClassName('date');
	dt[0].innerHTML = 'date: ' + mImages[mCurrentIndex].date;

	mLastFrameTime = 0;
	mCurrentIndex += 1;
	//Access the img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string
	console.log('swap photo');
}

// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
let mJson = "";

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'images.json'; 



function fetchJSON(){
	mRequest.onreadystatechange = function (){
		if(this.readyState == 4 && this.status == 200){
			mJson = JSON.parse(mRequest.responseText);
			iterateJSON(mJson);
		}
	}
	mRequest.open("GET", mUrl, true);
	mRequest.send();
	
}

function iterateJSON(){
	//for loop that access the mImages array by using the variable x as the index
	
	for (x = 0; x < mJson.images.length; x++) {
		mImages[x] = new GalleryImage();
		mImages[x].location = mJson.images[x].imgLocation;
		mImages[x].description = mJson.images[x].description;
		mImages[x].date = mJson.images[x].date;
		mImages[x].img = mJson.images[x].imgPath;
	}
}

//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {

		//offset the #nextPhoto image so that it is flush with the right side of the #nav div

	$("#nextPhoto").position({
		my: "right top",
  		at: "right top",
  		of: "#nav"
	});
	// This initially hides the photos' metadata information
	//$('.details').eq(0).hide();
	fetchJSON();
	//Add a click handler to the img.moreIndicator that Add a class attribute value = “rot270” if the element currently has a class value with “rot90”; else remove the “rot270” class and add “rot90”, causing the arrow to animate upside down.

	$( ".moreIndicator" ).click(function() {
  		if($(this).hasClass("rot90")){
			$(this).removeClass("rot90")
			$(this).addClass("rot270")
			$( ".details" ).slideToggle( "slow")
		}else{
			$(this).removeClass("rot270");
			$(this).addClass("rot90")
			$( ".details" ).slideToggle( "slow")

		}
	});
	
});


window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);



//Assigns data from JSON file to file that will be used on slideshow
function GalleryImage() {
	var location
	var description
	var date 
	var source 
	//implement me as an object to hold the following data about an image:
	//1. location where photo was taken
	//2. description of photo
	//3. the date when the photo was taken
	//4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
}


//Click handlers that goes to the next photo or the previous photo in the array order
$(document).ready( function() {

	
	$("#nextPhoto").click(function(){
		if(mCurrentIndex >= mImages.length){
			mCurrentIndex = 0;
		}
if(mCurrentIndex < 0 ){
	mCurrentIndex = mImages.length - 1;
}
//Accesses the 'photo' in the HTML document by creating 3 variables, for location, description, and date
	
	//Add code here to access the #slideShow element.
	swapPhoto();
	});
		$("#prevPhoto").click(function(){
			mCurrentIndex -= 2;
		if(mCurrentIndex >= mImages.length){
			mCurrentIndex = 0;
		}
if(mCurrentIndex < 0 ){
	mCurrentIndex = mImages.length - 1;
}
//Accesses the 'photo' in the HTML document by creating 3 variables, for location, description, and date
	
	//Add code here to access the #slideShow element.
	swapPhoto();
	});
});

