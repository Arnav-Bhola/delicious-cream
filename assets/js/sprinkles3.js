//==================================================================================================
//	Settings
//==================================================================================================
const canvas3Colour = "white"; //#3a3335
const rectColours3 = ["#00b2d6", "#FF0000", "#FFFF00", "#FFC0CB"];

//==================================================================================================
//	Shapes
//==================================================================================================
class Shape3 {
  constructor() {
    this.x = Math.floor(Math.random() * canvas3.width); //random
    this.y = Math.floor(Math.random() * canvas3.height); //random
    this.r = Math.floor(10 + 5 * Math.random());
    this._step = this.step = 0.2 + Math.random();
    this.direction = 360 * Math.random(); // Move to a random direction
  }

  update() {
    
    // Move (x,y) based on the direction
    let angleRad = this.direction * (Math.PI / 180); //angle in radians
    this.x = this.x + this.step * Math.cos(angleRad);
    this.y = this.y + this.step * Math.sin(angleRad);

    // Slow down step (if accelerated) to match original _step
    if (this._step < this.step) {
      this.step -= this._step / this.step * 0.1;
    }
    
    // If a shape3 reaches the end of the canvas3 move it to the other side
    if (this.y + this.r <= 0) {
      // Top -> Bottom
      this.y = Math.ceil(canvas3.height) + this.r;
      this.x = this.x - this.r;
    } else if (this.x - this.r >= canvas3.width) {
      // Right -> Left
      this.x = 0 - this.r;
      this.y = this.y - this.r;
    } else if (this.y - this.r >= canvas3.height) {
      // Bottom -> Top
      this.y = 0 - this.r;
      this.x = this.x - this.r;
    } else if (this.x + this.r <= 0) {
      // Left -> Right
      this.x = Math.ceil(canvas3.width) + this.r;
      this.y = this.y - this.r;
    }
  }
}

class Rectangle3 extends Shape3 {
  constructor() {
    super();
    this.color = rectColours3[Math.floor(Math.random() * rectColours3.length)];
    this.lineWidth = 6;
    this.deg = Math.random() * 180; // Rotation

    this.draw = function() {
      canvas3.ctx.save(); // Saves the coordinate system

      canvas3.ctx.translate(this.x, this.y); // Move canvas3 to where we want our shape to be drawn
      canvas3.ctx.rotate(this.deg); // Rotate around the start point of the line

      canvas3.ctx.beginPath();
      canvas3.ctx.rect(0, 0, this.r / 3, this.r);
      canvas3.ctx.lineWidth = this.lineWidth;
      canvas3.ctx.fillStyle = this.color;
      canvas3.ctx.fill();

      canvas3.ctx.restore(); // Restores the coordinate system back to (0,0)
    };
    return this;
  }

  update() {
    super.update();
    if (pointer.x < this.x) {
      this.deg += this.step/this._step * 0.005;
    } else if (pointer.x >= this.x) {
      this.deg -= this.step/this._step * 0.005;
    }
  }
}

function initShapes() {
  canvas3.shapes = [];
  //Rectangle3s
  for (i = 0; i < 30; i++) {
    const rect = new Rectangle3();
    rect.draw();
    canvas3.shapes.push(rect);
  }
}

//==================================================================================================
//	canvas3
//==================================================================================================
const canvas3 = document.querySelector(".particles-3");
canvas3.size = function() {
  this.width = window.innerWidth;
  this.height = window.innerHeight;
  this.style.width = window.innerWidth + "px";
  this.style.height = window.innerHeight + "px";
};

canvas3.resize = function() {
  // Do I want any breakpoints here?
  // Only trigger events if canvas3 size is now bigger than it were
  if (this.width >= window.innerWidth && this.height >= window.innerHeight) {
    return;
  }
  canvas3.init();
};

canvas3.init = function() {
  canvas3.ctx = this.getContext("2d");
  canvas3.ctx.imageSmoothingEnabled = true;
  canvas3.isTapped = false;
  canvas3.size();
  canvas3.fill(canvas3Colour);
  initShapes();
};

canvas3.fill = function(colour) {
  canvas3.ctx.fillStyle = colour;
  canvas3.ctx.fillRect(0, 0, this.width, this.height);
};

canvas3.redraw = function() {
  canvas3.fill(canvas3Colour);
  canvas3.fill("transparent");
  canvas3.shapes.forEach(function(shape) {
    shape.update();
    shape.draw();
  });
  requestAnimationFrame(canvas3.redraw);
};

//==================================================================================================
//	Init
//==================================================================================================
document.addEventListener("DOMContentLoaded", function(event) {
  canvas3.init();
  requestAnimationFrame(canvas3.redraw);
  window.addEventListener(
    "resize",
    function() {
      canvas3.resize();
    },
    false
  );
});
