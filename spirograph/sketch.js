// Something spirograph
// see https://css-doodle.com/

const width = 520;
const height = 520;
const margin = 40;

const r = new Rune({
    container: '#sketch',
    width: width + 2 * margin,
    height: height + 2 * margin,
    debug: false,
});

r.rect(0, 0, width + 2 * margin, height + 2 * margin).fill('#050A30');
const g = r.group(margin, margin);

const total = 50;

for (let i = 0; i < total; i++) {
    const size = width * (i / total) * 0.8;
    r.rect(0, 0, size, size, g)
        .round(size * 0.3)
        .stroke('hsv', 10 + 4 * i, 70, 68, Math.random() * 0.9)
        .strokeWidth(1.5)
        .fill('none')
        .move((width - size) / 2, (width - size) / 2)
        .rotate(i * 5, width / 2, width / 2);
}

r.draw();
