//==================================================================================================
//	Settings
//==================================================================================================
const canvas2Colour = "white"; //#3a3335
const rectColours2 = ["#00b2d6", "#FF0000", "#FFFF00", "#FFC0CB"];

//==================================================================================================
//	Shapes
//==================================================================================================
class Shape2 {
  constructor() {
    this.x = Math.floor(Math.random() * canvas2.width); //random
    this.y = Math.floor(Math.random() * canvas2.height); //random
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
    
    // If a shape2 reaches the end of the canvas2 move it to the other side
    if (this.y + this.r <= 0) {
      // Top -> Bottom
      this.y = Math.ceil(canvas2.height) + this.r;
      this.x = this.x - this.r;
    } else if (this.x - this.r >= canvas2.width) {
      // Right -> Left
      this.x = 0 - this.r;
      this.y = this.y - this.r;
    } else if (this.y - this.r >= canvas2.height) {
      // Bottom -> Top
      this.y = 0 - this.r;
      this.x = this.x - this.r;
    } else if (this.x + this.r <= 0) {
      // Left -> Right
      this.x = Math.ceil(canvas2.width) + this.r;
      this.y = this.y - this.r;
    }
  }
}

class Rectangle2 extends Shape2 {
  constructor() {
    super();
    this.color = rectColours2[Math.floor(Math.random() * rectColours2.length)];
    this.lineWidth = 6;
    this.deg = Math.random() * 180; // Rotation

    this.draw = function() {
      canvas2.ctx.save(); // Saves the coordinate system

      canvas2.ctx.translate(this.x, this.y); // Move canvas2 to where we want our shape to be drawn
      canvas2.ctx.rotate(this.deg); // Rotate around the start point of the line

      canvas2.ctx.beginPath();
      canvas2.ctx.rect(0, 0, this.r / 3, this.r);
      canvas2.ctx.lineWidth = this.lineWidth;
      canvas2.ctx.fillStyle = this.color;
      canvas2.ctx.fill();

      canvas2.ctx.restore(); // Restores the coordinate system back to (0,0)
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
  canvas2.shapes = [];
  //Rectangle2s
  for (i = 0; i < 30; i++) {
    const rect = new Rectangle2();
    rect.draw();
    canvas2.shapes.push(rect);
  }
}

//==================================================================================================
//	canvas2
//==================================================================================================
const canvas2 = document.querySelector(".particles-2");
canvas2.size = function() {
  this.width = window.innerWidth;
  this.height = window.innerHeight;
  this.style.width = window.innerWidth + "px";
  this.style.height = window.innerHeight + "px";
};

canvas2.resize = function() {
  // Do I want any breakpoints here?
  // Only trigger events if canvas2 size is now bigger than it were
  if (this.width >= window.innerWidth && this.height >= window.innerHeight) {
    return;
  }
  canvas2.init();
};

canvas2.init = function() {
  canvas2.ctx = this.getContext("2d");
  canvas2.ctx.imageSmoothingEnabled = true;
  canvas2.isTapped = false;
  canvas2.size();
  canvas2.fill(canvas2Colour);
  initShapes();
};

canvas2.fill = function(colour) {
  canvas2.ctx.fillStyle = colour;
  canvas2.ctx.fillRect(0, 0, this.width, this.height);
};

canvas2.redraw = function() {
  canvas2.fill(canvas2Colour);
  canvas2.fill("transparent");
  canvas2.shapes.forEach(function(shape) {
    shape.update();
    shape.draw();
  });
  requestAnimationFrame(canvas2.redraw);
};

//==================================================================================================
//	Init
//==================================================================================================
document.addEventListener("DOMContentLoaded", function(event) {
  canvas2.init();
  requestAnimationFrame(canvas2.redraw);
  window.addEventListener(
    "resize",
    function() {
      canvas2.resize();
    },
    false
  );
});
