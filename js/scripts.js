// @codekit-prepend "jquery.js";
// @codekit-prepend "semantic.js";
// @codekit-prepend "airtable.js";

// CONFIGURE & "Handshake"
var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keyDmRaxoESviMOwB'
});
var base = Airtable.base('appM52ABdf4HMwFMh');
// Check-Check
console.log(base);

// Get Records
base('felines').select({
    view: 'Grid view'
}).firstPage(function(err, records) {
    
    if (err) { console.error(err); return; }

    records.forEach(function(record) {
       
      // Check-Check 
      // console.log('Retrieved', record.get('Name'));
      // console.log( record.fields.Avatar[0].url ); 

      // Display Data
      showKitties(record)

    });
});

// Template Literal
var showKitties = function(record) {

  var template = 
  `
    <section class="ui raised card">
        <div class="image">
           <canvas class="draw" style="background-image:url('${record.fields.Image[0].url}'); background-size: contain; background-repeat: no-repeat; background-position: center;"></canvas>
        </div>
       <div class="content">
           <h3>${record.fields.Name}</h3>
       </div>
    </section>
  `;

  // Display Collected Data
  $('#kitties').append(template);
}

//Draw Stuff
const canvas = document.querySelector('.draw');
const ctx = canvas.getContext('2d');
canvas.width = ($(".image").innerWidth());
canvas.height = ($(".image").innerHeight());
ctx.strokeStyle = 'aquamarine';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;
//ctx.globalCompositeOperation = 'multiply';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
  if (!isDrawing) return; // stop the fn from running when they are not moused down
  console.log(e);
  ctx.beginPath();
  // start from
  ctx.moveTo(lastX, lastY);
  // go to
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];

  // hue++;
  // if (hue >= 360) {
  //   hue = 0;
  // }
  // if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
  //   direction = !direction;
  // }

  // if(direction) {
  //   ctx.lineWidth++;
  // } else {
  //   ctx.lineWidth--;
  // }

}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});


canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);


