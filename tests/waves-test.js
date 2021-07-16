const width = 200;
const height = 50;
const margin = 10;

const sketch = (container) => {
    const r = new Rune({
        container,
        width: width + margin * 2,
        height: height + margin * 2,
    });

    const grid = r.grid({
        x: margin,
        y: margin,
        width: width,
        height: height,
        rows: 3,
        columns: 1,
        gutter: 0,
    });

    return { r, grid };
};

const test = ({ container, wave, freq, phase, amp }) => {
    const s = sketch(container);
    let p;
    for (let i = 0; i < 300; i++) {
        const t = i / 300;
        const x = t * width + margin;
        const y = wave(freq, phase, amp, t);
        if (p) {
            p.lineTo(x, y);
        } else {
            p = s.r.path(0, 25).stroke('hotpink').strokeWidth(1.5).fill('none');
            p.moveTo(x, y);
        }
    }
    s.r.draw();
};

test({ container: '#sine', wave: sine, freq: 1, phase: 0, amp: 20 });
test({ container: '#sine', wave: sine, freq: 2, phase: 0, amp: 20 });
test({ container: '#sine', wave: sine, freq: 4, phase: 0.5, amp: 10 });

test({ container: '#square', wave: square, freq: 1, phase: 0, amp: 20 });
test({ container: '#square', wave: square, freq: 2, phase: 0, amp: 20 });
test({ container: '#square', wave: square, freq: 4, phase: 0.5, amp: 10 });

test({ container: '#triangle', wave: triangle, freq: 1, phase: 0, amp: 20 });
test({ container: '#triangle', wave: triangle, freq: 2, phase: 0, amp: 20 });
test({ container: '#triangle', wave: triangle, freq: 4, phase: 0.5, amp: 10 });

test({ container: '#sawtooth', wave: sawtooth, freq: 1, phase: 0, amp: 20 });
test({ container: '#sawtooth', wave: sawtooth, freq: 2, phase: 0, amp: 20 });
test({ container: '#sawtooth', wave: sawtooth, freq: 4, phase: 0.5, amp: 10 });
