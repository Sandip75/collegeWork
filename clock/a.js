var canvas, ctx;
const W = window.innerWidth;
const H = 7*window.innerHeight/12;
var clock = 0;

//defining  rows and cols 
const rows = 6;
const cols = 3;

var particles = create2DArray(cols, rows);

window.onload = function() {
    canvas = document.getElementById("clock");
    ctx = canvas.getContext("2d");
    
    canvas.width = W;
    canvas.height = H;
    
    createParticles(cols, rows);
    particles[0][0] = null;
    draw();
}

function draw() {
    window.requestAnimationFrame(draw);
    var date = new Date();
    
    // Time
    var hour = date.getHours();
    if (hour > 12) hour-= 12;
    
    var mins = date.getMinutes();
    var secs = date.getSeconds();
    
    // Date
    var weekdays =  ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    
    //month
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December']; 
    var wday = weekdays[ date.getDay() ];
    var month = months[ date.getMonth() ];
    
    
    document.getElementsByTagName("div")[0].innerHTML = wday + "<br>" + date.getDate() + " " + month + " " + date.getFullYear();
    
    //ctx.beginPath();
    ctx.clearRect(0,0,W,H);
    //ctx.lineCap ="round";
    //ctx.closePath();
    
    
        var val = [date.getHours(), mins > 9 ? mins : "0"+mins, secs > 9 ? secs : "0"+secs];
        ctx.font = "20px Bold";
        ctx.fillStyle = "black";
    
    
     // values from 1 to 32 
        for (var i=0; i<rows; i++) {
            ctx.fillText(particles[1][i].value, W/10, i*H/8+H/15+10)
        }
    
      // To see time at bottome 
        for (var i=0; i<val.length; i++) {
            ctx.fillText(val[i], i*W/4+W/4+35, 6*H/8+H/15+10)
        }
    
    // To draw small circle  
        for (var i = 0; i<cols; i++) {
            // Binary
            var num = binary(val[i]);
        
            for (var j=0; j<rows; j++) {
                if (i ==0 && j==0) {
                    continue;
                }
            
                if (num[j] == "1") {
                    particles[i][j].on = true;
                } else {
                    particles[i][j].on = false;
                }
            
            
                particles[i][j].draw();
            }
        }
    }

function binary(num) {
    var output = (num >>> 0).toString(2).split("");
    var len = 6 - output.length;

    for (var i=0; i<len; i++) {
        output.unshift("0")
    }

    return output.join('');
}

function create2DArray(r, c) {
    var arr = new Array(r);
    for (var i=0; i<r; i++) {
        arr[i] = new Array(c);
    }
    return arr
}

function createParticles(cols, rows) {
    for (var i=0; i<cols; i++) {
        for (var j=0; j<rows; j++) {
            particles[i][j] = new BinaryParticle(i, j);
        }
    }
}

function BinaryParticle(i, j) {
    this.i = i;
    this.j = j;
    
    this.x = i * W/4 + W/3;
    this.y = j * H/8 + H/15;
    
    this.on = false;
    this.value = Math.pow(2, (5-j));
    
}

BinaryParticle.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = !this.on ? "#B266FF" : "red";
    ctx.arc(this.x, this.y, 10, 0, 2*Math.PI);
    ctx.fill();
    ctx.closePath();
}