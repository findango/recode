/**
 * Set up bindings between WebMidi inputs and Tweakpane settings.
 * @param pane - Tweakpane instance
 * @param {object} settings - object that is bound to the Tweakpane settings
 * @param {object} opts - options for configuring MIDI channels, bindings to the settings
 */
const bindMidi = (pane, settings, options) => {
    const opts = {
        input: options.input || 0,
        channel: options.channel || 1,
        knobs: options.knobs || {},
        keys: options.keys || {},
        onKeyDown: options.onKeyDown,
        onKeyUp: options.onKeyUp,
    };

    WebMidi.enable((err) => {
        if (err) {
            console.log('Error starting MIDI', err);
            if (opts.onError) {
                opts.onError(err);
            }
            return;
        }
        const input = WebMidi.inputs[opts.input];
        if (!input) {
            console.log('Error getting input', opts.input);
            return;
        }

        input.addListener('controlchange', opts.channel, (event) => {
            const { controller, value } = event;
            const binding = opts.knobs[controller.number];
            if (binding) {
                settings[binding] = value;
                pane.refresh();
            }
        });

        input.addListener('noteon', opts.channel, (event) => {
            const { note, rawVelocity, velocity } = event;
            const binding = opts.keys[note.number];
            if (binding) {
                settings[binding] = rawVelocity;
                pane.refresh();
            }
            if (typeof opts.onKeyDown === 'function') {
                opts.onKeyDown({
                    number: note.number,
                    name: note.name,
                    velocity,
                    rawVelocity,
                });
            }
        });

        input.addListener('noteoff', opts.channel, (event) => {
            const { note } = event;
            const binding = opts.keys[note.number];
            if (binding) {
                settings[binding] = 0;
                pane.refresh();
            }
            if (typeof opts.onKeyUp === 'function') {
                opts.onKeyUp({
                    number: note.number,
                    name: note.name,
                });
            }
        });
    });
};
