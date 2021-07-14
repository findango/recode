const { cos, sin } = Math;

const width = 720;
const height = 720;
const margin = 40;

const guideline = (rune, fraction) => {
    rune.line(rune.width * fraction, 0, rune.width * fraction, rune.height)
        .stroke('hotpink')
        .strokeWidth(1);
    rune.line(0, rune.height * fraction, rune.width, rune.height * fraction)
        .stroke('hotpink')
        .strokeWidth(1);
};

const settings = {
    a: 0.8,
    b: 2.9,
    c: 0,
    d: 2,
    e: 3,
    f: 1,
    size: 100,
    rotation: 0,
    thickness: 20,
    spacing: 1.5,
    position: { x: 0, y: 0 },
    format: 'svg',
    guidelines: false,
};

let r;
const render = () => {
    document.getElementById('sketch').innerHTML = '';
    r = new Rune({
        container: '#sketch',
        width: width + 2 * margin,
        height: height + 2 * margin,
    });
    background(r, colors.slate);

    if (settings.guidelines) {
        guideline(r, 1 / 3);
        guideline(r, 2 / 3);
    }
    const center = r
        .group(
            (margin + width) / 2 + settings.position.x,
            (margin + height) / 2 + settings.position.y,
        )
        .rotate(
            settings.rotation,
            (margin + width) / 2 + settings.position.x,
            (margin + height) / 2 + settings.position.y,
        );

    const { a, b, c, d, e, f, size, thickness, spacing } = settings;
    for (let i = 0; i < thickness; i += spacing) {
        let path = null;
        for (let t = 0; t <= Math.PI * 2; t += 0.01) {
            const x = (size + i) * (cos(a * t) + cos(b * t) + cos(c * t));
            const y = (size + i) * (sin(d * t) + sin(e * t) + sin(f * t));
            if (!path) {
                path = r.path(0, 0, center).stroke(colors.deep_blue).strokeWidth(1.5).fill('none');
                path.moveTo(x, y);
            } else {
                path.lineTo(x, y);
            }
        }
    }
    r.draw();
};

const pane = new Tweakpane({
    container: document.getElementById('controls'),
});
const xcontrols = pane.addFolder({ title: 'X' });
xcontrols.addInput(settings, 'a', { min: -5, max: 5 });
xcontrols.addInput(settings, 'b', { min: -5, max: 5 });
xcontrols.addInput(settings, 'c', { min: -5, max: 5 });
xcontrols.addButton({ label: '', title: 'Reset' }).on('click', () => {
    settings.a = 0;
    settings.b = 0;
    settings.c = 0;
    pane.refresh();
});
const ycontrols = pane.addFolder({ title: 'Y' });
ycontrols.addInput(settings, 'd', { min: -5, max: 5 });
ycontrols.addInput(settings, 'e', { min: -5, max: 5 });
ycontrols.addInput(settings, 'f', { min: -5, max: 5 });
ycontrols.addButton({ label: '', title: 'Reset' }).on('click', () => {
    settings.d = 0;
    settings.e = 0;
    settings.f = 0;
    pane.refresh();
});
const plotFolder = pane.addFolder({ title: 'Plot' });
plotFolder.addInput(settings, 'thickness', { min: 1, max: 100, step: 1 });
plotFolder.addInput(settings, 'spacing', { min: 0.5, max: 10, step: 0.5 });
plotFolder.addInput(settings, 'rotation', { min: 0, max: 360, step: 1 });
plotFolder.addInput(settings, 'size', { min: 20, max: 200, step: 1 });
plotFolder.addInput(settings, 'position', {
    label: 'position',
    x: { min: -500, max: 500, step: 1 },
    y: { min: -500, max: 500, step: 1 },
});
plotFolder.addInput(settings, 'guidelines');
const file = pane.addFolder({ title: 'File' });
file.addInput(settings, 'format', {
    options: optionsList(['svg', 'png', 'jpg']),
});
file.addButton({ label: '', title: 'Save' }).on('click', () => {
    const d = new Date().format('yyyymmdd-hhMM');
    r.save(`loopy-${d}.${settings.format}`);
});

pane.on('change', render);

render();
