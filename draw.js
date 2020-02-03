const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const estimate = document.getElementById('estimate');

// dimensions
const margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
};
const width = canvas.width - margin.left - margin.right;
const height = canvas.height - margin.top - margin.bottom;
context.translate(margin.left, margin.top);

// scales
const x = d3.scaleLinear()
    .domain([0, 1])
    .range([0, width]);
const y = d3.scaleLinear()
    .domain([0, 1])
    .range([height, 0]);

function drawY() {
    context.strokeStyle = 'black';
    context.fillStyle = 'black';

    // y-ticks
    const yTicks = y.ticks(1);
    context.beginPath();
    yTicks.forEach((d) => {
        context.moveTo(0, y(d) + 0.5);
        context.lineTo(-6, y(d) + 0.5);
    });
    context.stroke();

    // y-label
    context.textAlign = 'right';
    context.textBaseline = 'middle';
    yTicks.forEach((d) => {
        context.fillText(d, -9, y(d));
    });

    // y-axis
    context.beginPath();
    context.moveTo(-6.5, 0 + 0.5);
    context.lineTo(0.5, 0 + 0.5);
    context.lineTo(0.5, height + 0.5);
    context.lineTo(-6.5, height + 0.5);
    context.stroke();
}

function drawX() {
    context.strokeStyle = 'black';
    context.fillStyle = 'black';

    // x-ticks
    const xTicks = x.ticks(1);
    context.beginPath();
    xTicks.forEach((d) => {
        context.moveTo(x(d), height + 0);
        context.lineTo(x(d), height + 6);
    });
    context.stroke();

    // x-label
    context.textAlign = 'right';
    context.textBaseline = 'top';
    xTicks.forEach((d) => {
        context.fillText(d, x(d) + 3, height + 9);
    });

    // x-axis
    context.beginPath();
    context.moveTo(-6.5, height + 0.5);
    context.lineTo(width, height + 0.5);
    context.stroke();
}

function distance(p) {
    return p.x * p.x + p.y * p.y;
}

function generatePoints(n) {
    const points = new Array(n);

    for (let i = 0; i < n; ++i) {
        points[i] = {
            x: Math.random(),
            y: Math.random()
        };
    }

    return points;
}

function clear() {
    context.clearRect(-margin.left, -margin.top, canvas.width + margin.right, canvas.height + margin.top);
}

function drawCircle(p) {
    context.beginPath();
    context.arc(x(p.x), y(p.y), 1, 0, 2 * Math.PI, false);
    context.fill();
}

function draw(n) {
    clear();
    drawX();
    drawY();

    const points = generatePoints(n);
    let numberPointsCircle = 0;

    for (const p of points) {
        const dist = distance(p);

        if (dist >= 1) {
            context.fillStyle = 'red';
        } else {
            numberPointsCircle++;
            context.fillStyle = 'blue';
        }

        drawCircle(p);
    }

    estimate.innerText = 4 * numberPointsCircle / n;
}