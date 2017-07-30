var canv = document.getElementById("paint");
var ctx = canv.getContext("2d");
ctx.font = "18px Serif";

var arr = []; 
var tempArr = [];

var sorting = false;	

var maxKey = 1;
var sx = 580; 

var startTimer;
var milSec;

var fast = true;

document.getElementById("buttons2").style.visibility = "hidden";

function key(key){
    this.key = key;
    this.x = 0;
    this.bottom = 350;
    this.inset = 0;
    
    this.setKey = setKey;
    this.graphics = graphics;
    
    if(this.key > maxKey){
		 maxKey = this.key;
	 }
    
    function setKey(value)
	{
    	this.key = value;
    	if(value > 9)
    		this.inset = 4;
    	else
    		this.inset = 0;
    }
    
    function graphics(){
    	var grd = ctx.createLinearGradient(0,350,0,150);
    	grd.addColorStop(0,"red");
    	grd.addColorStop(1,"darkred");
    	ctx.fillStyle = grd;
    	ctx.fillRect(this.x, this.bottom-this.key*300/maxKey, 10, this.key*300/maxKey);
    	ctx.fillStyle = "white";
    	ctx.fillRect(this.x, this.bottom-this.key*300/maxKey, 10, 2);
    	ctx.fillText(this.key, this.x-this.inset, this.bottom-10-this.key*300/maxKey);
    }
}

// adds a new key to the array with a value of the input field.
function add(){
	if(arr.length < 20){
		var t = Math.floor(Number(document.getElementById("inputField").value));
		t = t || 1;
		
        var x = new key(t);
        check(x);
            
        arr[arr.length] = x;
        sx -= 10;
        updateLocation(20);
    }
	document.getElementById("inputField").value = "";
}

// adds 1 key with a random value to the array.
function addRandom(){
	if (arr.length < 20) {
		var x = new key(Math.ceil(Math.random() * 99));
		check(x);

		arr[arr.length] = x;
		sx -= 10;
		updateLocation(20);
		
	}
	
}

// checks for valid input.
function check(k){
	 if(k.key < 1)
		 k.key = 1;
	 else if(k.key > 99)
		 k.key = 99;
	    
	 if(k.key > 9)
		 k.inset = 4;
	 else
		 k.inset = 0;
	 
}

function setup(mil)
{
	milSec = mil;
}

// updates the location of all rectangles.
function updateLocation(width)
{
	for(var index = 0; index < arr.length; index++){
		arr[index].x = sx+(index+1)*width;	
	}
	paintAllComponents();
}

// paints all components.
function paintAllComponents()
{
    ctx.clearRect(0, 0, canv.width, canv.height);
    for(var index = 0; index < arr.length; index++){
    	arr[index].graphics();
    }
}



// initiates the execution of the sorting algorithm.
function initSort(){
    if(arr.length > 1){

    	setup(300);
    	
    	// timer that calls the insertionSort function every 300 milSec. 
    	startTimer = setInterval(function(){bogoSort();}, milSec);
    	
    	changeButtonVisibility();
    	sorting = true;
	}
}

// sorts all keys with bogo sort.
function bogoSort(){
	if(!isSorted()){
		for(var i = 0; i < arr.length; i++)
		{
    		tempArr[i] = new key(arr[i].key);
    	}
		for(var i = 0; i < arr.length; i++){
			var pos = Math.floor(Math.random()*tempArr.length);
			arr[i].setKey(tempArr[pos].key);
			tempArr.splice(pos, 1);
		}
	    paintAllComponents();
	}
	else {
		clearInterval(startTimer);
		makeAllButtonsInvisible();
		setTimeout(function(){stopAndClear();}, 3000);
	}
}

function isSorted(){
	for(var i = 0; i < arr.length-1; i++){
		if(arr[i].key > arr[i+1].key)
			return false;
	}
	return true;
}

// makes certain buttons invisible to prevent the user from causing any errors.
function changeButtonVisibility(){
	if(!sorting){
		document.getElementById("buttons").style.visibility = "hidden";
		document.getElementById("buttons2").style.visibility = "visible";
	}
	else {
		document.getElementById("buttons").style.visibility = "visible";
		document.getElementById("buttons2").style.visibility = "hidden";
	}
}

function makeAllButtonsInvisible(){
	document.getElementById("buttons").style.visibility = "hidden";
	document.getElementById("buttons2").style.visibility = "hidden";
}

// pauses the algorithm or continues it. 
function pausePlay(){

	if(sorting){
		clearInterval(startTimer);
		sorting = false;
	}
	else{
		sorting = true;
		startTimer = setInterval(function(){bogoSort();}, milSec);
	}
}

// resets everything. 
function stopButton(){
	sorting = true;
	stopAndClear();
}

// stops the timer and resets all variables to their initial settings. 
function stopAndClear(){
	clearInterval(startTimer);
	//ctx.clearRect(0, 0, canv.width, canv.height);
	
	maxKey = 1;
	sx = 580;
	arr.splice(0, arr.length);

	changeButtonVisibility();
	sorting = false;
	fast=true;
	
}
function bClear()
{
	arr.pop();
	paintAllComponents();
	updateLocation(20);	
	sx+=10;
}
function faster()
{	
	if(sorting)
	{
		clearInterval(startTimer);
		if(fast==false)
		{
		setup(300);		
		startTimer = setInterval(function(){bogoSort();}, milSec);
		fast=true;
		}
		else if(fast==true)
		{
		setup(100);
		startTimer = setInterval(function(){bogoSort();}, milSec);
		fast=false;
		}		
	}
	else
	{
		clearInterval(startTimer);
	}
}
