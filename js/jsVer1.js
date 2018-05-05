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
    inputValues["topImageHeight"] = $('#abs-img-view').height();
    inputValues["topImageWidth"] = $('#abs-img-view').width();
    inputValues["botImageHeight"] = $('#abs-img-camera').height();
    inputValues["botImageWidth"] = $('#abs-img-camera').width();
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

    var halfAngle = angle / 2;
    // calc width of canvas. It cant be more then 600px cause of website width and can't be less then width of top image + 100px
    var topWidth = 2 * Math.ceil( Math.tan(halfAngle * Math.PI/180) * (inputValues["wrapperHeight"] - inputValues["botImageHeight"]/2 ) ) + 50 + 40 + 40;
    if (topWidth > 600) { topWidth = 600; }
    if (topWidth < inputValues.topImageWidth + 100) { topWidth = inputValues.topImageWidth + 100}
    console.log (topWidth);
    
    var canvas = document.getElementById("field-canvas");
    canvas.width = topWidth;

}

function getInputValues() {
    inputValues.unit = $('input[name="unit"]:checked').val();
    inputValues.distance = parseFloat( $('#distance').val() );
    console.log(`input values:`);
    console.log(inputValues);
}

//writes all outputs
var area;
function writeOutputsRepayment1() {
}

function calculate() {


    if ( (!isNaN(inputValues.distance)) && (inputValues.distance != null) ) {
        area = angle / 360 * Math.PI * inputValues.distance * inputValues.distance;

        makeCanvas1();
    }else{
        // MAKE SOME WARNING
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

  ctx.moveTo( 60, inputValues.topImageHeight/2 - 20 );
  ctx.lineTo( 60, inputValues.topImageHeight/2 + 20 );
  ctx.moveTo( 100*wFactor - 60, inputValues.topImageHeight/2 - 20 );
  ctx.lineTo( 100*wFactor - 60, inputValues.topImageHeight/2 + 20 );


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
  ctx.fillText(`${angle}°`, 48*wFactor, 68*hFactor);
  ctx.fillText(`${(inputValues.distance).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})} ${inputValues.unit}`, 10, inputValues.topImageHeight/2 + (90*hFactor - inputValues.topImageHeight/2)/2 + 6*hFactor);
  ctx.fillText(`${(inputValues.distance).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})} ${inputValues.unit}`, 100 * wFactor - 100, inputValues.topImageHeight/2 + (90*hFactor - inputValues.topImageHeight/2)/2 + 6*hFactor);
  ctx.fillText(`${area.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})} ${inputValues.unit}²`, 41*wFactor, inputValues["topImageHeight"] + 50);


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
    positionImages();
 	getInputValues();
 	calculate();
});

// *****   Click handlers ENDS ******

 $(function(){
    positionImages();
    getInputValues();
    calculate();
 })
