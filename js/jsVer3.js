"use strict";

// default angle valuee that can be changed
var angle = 50;

var inputValues = {
};

// after page loads, get dimmensions of wrapper and images and position them
function positionImages() {
    angle = parseInt( $('#angle-input').val() );
    inputValues["wrapperHeight"] = $('#output-wrapper').height();
    inputValues["wrapperWidth"] = $('#output-wrapper').width();
    inputValues["botImageHeight"] = $('#abs-img-camera').height();
    inputValues["botImageWidth"] = $('#abs-img-camera').width();

    var halfAngle = angle / 2;
    // calc width of canvas (between 300 and 600px - if we keep height of 300px)
    var topWidth = 2 * Math.ceil( Math.tan(halfAngle * Math.PI/180) * (inputValues["wrapperHeight"] - inputValues["botImageHeight"]/2 ) ) + 50 + 40 + 40;
    if (topWidth > 600) { topWidth = 600; }
    if (topWidth < 300) { topWidth = 300}
    
    var canvas = document.getElementById("field-canvas");
    canvas.width = topWidth;

    // top image gets width betwee two small vertical lines
    $('#abs-img-view, #white-line-wrapper').css("width", topWidth - 118);
    $('#abs-img-view').css("max-height", 100);
    inputValues["topImageHeight"] = $('#abs-img-view').height();
    inputValues["topImageWidth"] = $('#abs-img-view').width();
    $('#abs-img-view').css({
        "top" : 0,
        "left" : (inputValues.wrapperWidth - inputValues.topImageWidth)/2,
        "display" : "block"
    });
    $('#abs-img-camera').css({
        "bottom" : -1 * inputValues["botImageHeight"],
        "left" : (inputValues.wrapperWidth - inputValues.botImageWidth)/2,
        "display" : "block"
    });
    $('#white-line-wrapper').css({
        "top" : 30,
        "left" : (inputValues.wrapperWidth - inputValues.topImageWidth)/2,
        "display" : "block"
    });
    $('#distance-value-left').css({
        "top" : (inputValues["topImageHeight"] / 2 + 0.9*inputValues["wrapperHeight"])/2 + 8,
        "left" : (inputValues["wrapperWidth"] - topWidth)/2 + 5,
        "display" : "block"
    });
    $('#distance-value-right').css({
        "top" : (inputValues["topImageHeight"] / 2 + 0.9*inputValues["wrapperHeight"])/2 + 8,
        "right" : (inputValues["wrapperWidth"] - topWidth)/2 + 5,
        "display" : "block"
    });
}

function getInputValues() {
    inputValues.unit = $('input[name="unit"]:checked').val();
    inputValues.distance = parseFloat( $('#distance').val() );
    console.log(`input values:`);
    console.log(inputValues);
}

function writeOutputs() {
    $('#horizont-value').text( `${horizont.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})} ${inputValues.unit}`);
    $('#distance-value-left, #distance-value-right').text( `${(inputValues.distance).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})} ${inputValues.unit}`);
    $('#area-value').text ( `${area.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})} ${inputValues.unit}²` );
    $('#area-value').css({
        "top" : inputValues["topImageHeight"] + 20,
        "left" : (inputValues["wrapperWidth"] - $('#area-value').width() ) / 2,
        "display" : "block"
    });    
    $('#horizont-value').css("left", ( inputValues.wrapperWidth - $('#horizont-value').width() )/2);
    $('#horizont-value').css("display", "block");
}

var area;
var horizont;
function calculate() {

    if ( (!isNaN(inputValues.distance)) && (inputValues.distance != null) ) {        
        area = angle / 360 * Math.PI * inputValues.distance * inputValues.distance;
        horizont = 2 * ( inputValues.distance * Math.tan(angle/2  * Math.PI/180) );
        writeOutputs()
        makeCanvas1();
    }else{
        $('#output-wrapper').css("display","none");
    }

}

function makeCanvas1() {

  // this factor represents 1% of width and can be scaled
  let wScale = 1;  //0.9 to scale width
  let wFactor = $('#field-canvas').width() / 100;
  let hFactor = $('#field-canvas').height() / 100;

  // Start drawing
  var canvas = document.getElementById("field-canvas");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#000000";
  ctx.lineWidth="2";

  // verticals
  ctx.beginPath();
  ctx.moveTo( 0, inputValues.topImageHeight/2);
  ctx.lineTo( 40, inputValues.topImageHeight/2);
  ctx.moveTo( 0, 99.5*hFactor);
  ctx.lineTo( 40, 99.5*hFactor);
  ctx.moveTo( 20, inputValues.topImageHeight/2);
  ctx.lineTo( 20, inputValues.topImageHeight/2 + (90*hFactor - inputValues.topImageHeight/2)/2 );
  ctx.moveTo( 20, inputValues.topImageHeight/2 + (90*hFactor - inputValues.topImageHeight/2)/2 + 10*hFactor);
  ctx.lineTo( 20, 99.5*hFactor);

  ctx.moveTo( 100*wFactor, inputValues.topImageHeight/2);
  ctx.lineTo( 100*wFactor - 40, inputValues.topImageHeight/2);
  ctx.moveTo( 100*wFactor, 99.5*hFactor);
  ctx.lineTo( 100*wFactor - 40, 99.5*hFactor);
  ctx.moveTo( 100*wFactor - 20, inputValues.topImageHeight/2);
  ctx.lineTo( 100*wFactor - 20, inputValues.topImageHeight/2 + (90*hFactor - inputValues.topImageHeight/2)/2 );
  ctx.moveTo( 100*wFactor - 20, inputValues.topImageHeight/2 + (90*hFactor - inputValues.topImageHeight/2)/2 + 10*hFactor);
  ctx.lineTo( 100*wFactor - 20, 99.5*hFactor);

  ctx.stroke();

  ctx.lineWidth="1";
  //angle
  ctx.beginPath();
  ctx.moveTo( 50*wFactor-25, 99*hFactor);
  ctx.lineTo( 60, inputValues.topImageHeight/2);
  ctx.moveTo( 50*wFactor+25, 99*hFactor);
  ctx.lineTo( 100*wFactor - 60, inputValues.topImageHeight/2);

  // ctx.moveTo( 60, inputValues.topImageHeight/2 - 20 );
  // ctx.lineTo( 60, inputValues.topImageHeight/2 + 20 );
  // ctx.moveTo( 100*wFactor - 60, inputValues.topImageHeight/2 - 20 );
  // ctx.lineTo( 100*wFactor - 60, inputValues.topImageHeight/2 + 20 );
   ctx.stroke();

  // semi circle
  var inputAngle = angle;
  if (angle < 22) {inputAngle = 22};
  if (angle > 60) {inputAngle = 60};
  var angleFactor = 0.08 + (inputAngle - 22) * 0.09 / 38;
  ctx.beginPath();
  ctx.arc( 50*wFactor, 100*hFactor+10, 40 * hFactor, (1.5 - angleFactor) *Math.PI , (1.5 + angleFactor) *Math.PI);
  ctx.stroke();

  //text
  ctx.font = "16px Arial";
  ctx.fillStyle="#000000";  
  ctx.fillText(`${angle}°`, 48*wFactor, 70*hFactor);
} // makeCanvas1() ends here




// ***** key input limitations *****

$("#distance").keydown(function (e) {
    //Allow: backspace, delete, tab, escape, enter, period, decimal point
    if ($.inArray(e.keyCode, [8, 46, 9, 27, 13, 190, 110 ]) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) || 
        // Allow: Ctrl+V
        (e.keyCode == 86 && e.ctrlKey === true) ||
         // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
             // let it happen, don't do anything
             return;
    }
    // Ensure that it is a number and stop the keypress
    if ( (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)  ) {
        e.preventDefault();
    }
});
// Amount between 0 and 1,000,000,000
$("#loan_input_1 input, #loan_input_2 input, #loan_input_3 input").on("change", function(){
    if ( ( parseInt( $(this).val() ) > 1000000000) ) {
        $(this).val('1000000000');
    }
    if ( ( parseInt( $(this).val() ) < 0) ) {
        $(this).val('0');
    }
});

// ***** key input limitations ENDS *****

// *****   Click handlers   ******

$('#calcButton').on("click", function(){
  $('#output-wrapper').css("display","block");
  positionImages();
 	getInputValues();
 	calculate();
});

// *****   Click handlers ENDS ******


$(window).on("load", function(){    
    positionImages();
    getInputValues();
    calculate();
})
