// Some functions for generating waves

const Point = (x, y) => ({ x, y });

/**
 * Generate a 2D point from polar coordinates, angle and radius
 * @param {number} a - angle in radians
 * @param {number} r - radius
 * @returns {Object} Point {x,y}
 */
const polarToXY = (angle, radius) => Point(Math.cos(angle) * radius, Math.sin(angle) * radius);

/**
 * Returns a point on a sine wave at time t (0-1)
 * @param {number} freq - frequency, wave will repeat this many times over t
 * @param {number} phase - phase shift, 0 to 1
 * @param {number} amp - amplitude
 * @param {number} t - time, 0 to 1
 */
const sine = (freq, phase, amp, t) => {
    const p = polarToXY((t * freq + phase) * Math.PI * 2, amp);
    return p.y;
};

const square = (freq, phase, amp, t) => {
    const y = sine(freq, phase, amp, t);
    return y >= 0 ? amp : -amp;
};

const sawtooth = (freq, phase, amp, t) => {
    return ((t * freq + phase + 0.5) % 1) * 2 * amp - amp;
};

const triangle = (freq, phase, amp, t) => {
    const y = sawtooth(freq, phase + 0.25, amp * 2, t);
    return Math.abs(y) - amp;
};
