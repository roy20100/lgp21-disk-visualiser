// js/visualization.js

// Set up the canvas for visualization
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Variables for pinch-zoom and pan interactions
let scale = 1;
let originX = 0;
let originY = 0;
let lastX = 0;
let lastY = 0;
let isDragging = false;

// Function to draw the disk visualization
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(originX, originY);
    ctx.scale(scale, scale);
    // Add your drawing logic here
    // Example: draw a circle
    ctx.beginPath();
    ctx.arc(150, 150, 50, 0, Math.PI * 2);
    ctx.fillStyle = '#00f';
    ctx.fill();
    ctx.restore();
}

draw();

// Handle touch and mouse events for pinch-zoom and pan
canvas.addEventListener('mousedown', (e) => {
    lastX = e.offsetX;
    lastY = e.offsetY;
    isDragging = true;
});

canvas.addEventListener('mouseup', () => {
    isDragging = false;
});

canvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const dx = e.offsetX - lastX;
        const dy = e.offsetY - lastY;
        originX += dx;
        originY += dy;
        lastX = e.offsetX;
        lastY = e.offsetY;
        draw();
    }
});

canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    const zoom = e.deltaY < 0 ? 1.1 : 0.9;
    scale *= zoom;
    draw();
});

canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
        isDragging = true;
    }
});

canvas.addEventListener('touchmove', (e) => {
    if (isDragging) {
        const dx = e.touches[0].clientX - lastX;
        const dy = e.touches[0].clientY - lastY;
        originX += dx;
        originY += dy;
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
        draw();
    }
});

canvas.addEventListener('touchend', () => {
    isDragging = false;
});

// Handle tap-to-select interaction
canvas.addEventListener('click', (e) => {
    const x = (e.offsetX - originX) / scale;
    const y = (e.offsetY - originY) / scale;
    // Implement your selection logic here
    alert(`Tapped at: (${x.toFixed(2)}, ${y.toFixed(2)})`);
});
