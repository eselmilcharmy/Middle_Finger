const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let emojis = [];
let intensity = 100;
let speedFactor = 1;
const emoji = '🖕🏼'; // Rain Drops

class Emoji {
    constructor(x, y, size, speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
    }

    fall() {
        this.y += this.speed * speedFactor;
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.font = `${this.size}px serif`;
        ctx.fillText(emoji, this.x, this.y);
    }
}

function createEmojis() {
    emojis = [];
    for (let i = 0; i < intensity; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 20 + 10;
        const speed = Math.random() * 5 + 2;
        emojis.push(new Emoji(x, y, size, speed));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    emojis.forEach(emoji => {
        emoji.fall();
        emoji.draw();
    });
    requestAnimationFrame(animate);
}

createEmojis();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createEmojis();
});

document.getElementById('intensity').addEventListener('input', function() {
    intensity = parseInt(this.value);
    createEmojis();
});

document.getElementById('speed').addEventListener('input', function() {
    speedFactor = parseFloat(this.value);
});
