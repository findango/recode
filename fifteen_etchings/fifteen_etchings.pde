// Sol LeWitt
// Straight lines in four directions and all their possible combinations.

int margin = 18;
int tile_size = 100;

int top = 0;
int bottom = tile_size;
int left = 0;
int right = tile_size;
int mid = tile_size / 2;

void setup() {
    // margin + tile_size;
    size(490, 490);
    noLoop();
}

void draw() {
    background(#ffffff);
    stroke(#000000);
    strokeWeight(1);
    noFill();

    // h = horizontal, v = vertical, r = diagonal-right, l = diagonal-left
    String[] squares = {
        "",   "h",   "r",   "l",
        "v",  "vr",  "vl",  "hr",
        "rl", "hv",  "hvr", "hrl",
        "hl", "vrl", "hvl", "hvrl"
    };

    for (int i = 0; i < 16; i++) {
        int x = margin + (i % 4 * (tile_size + margin));
        int y = margin + (i / 4 * (tile_size + margin));
        drawSquare(x, y, squares[i]);
    }
}

void keyPressed() {
    if (key == ' ') {
        redraw();
    } else if (key == 's' || key == 'S') {
        save("out.png");
    }
}

boolean contains(String pattern, String toCheck) {
    return match(toCheck, pattern) != null;
}

void drawSquare(int x, int y, String sq) {
    if (sq == "") return;

    pushMatrix();
    translate(x, y);

    rect(0, 0, right, bottom);
    if (contains("v", sq)) line(mid, top, mid, bottom);
    if (contains("h", sq)) line(left, mid, right, mid);
    if (contains("r", sq)) line(left, bottom, right, top);
    if (contains("l", sq)) line(left, top, right, bottom);

    popMatrix();
}