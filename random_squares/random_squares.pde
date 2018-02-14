// Based on "Random Squares" by Herbert Franke
// Originally published in "Computer Graphics and Art" vol1 no2, 1976
// See: http://recodeproject.com/artwork/v1n2random-squares

int margin = 30;

void setup() {
    size(550, 550);
    noLoop();
}

void draw() {
    background(#ffffff);
    stroke(#000000);
    strokeWeight(2);
    noFill();

    drawSquares(200, 20);
    drawSquares(100, 40);
    drawSquares(10, 120);
}

void drawSquares(int count, int size) {
    for (int i = 0; i < count; i++) {
        int x = int(random(margin, width - size - margin));
        int y = int(random(margin, height - size - margin));
        rect(x, y, size, size);
    }
}

void keyPressed() {
    if (key == ' ') {
        redraw();
    } else if (key == 's' || key == 'S') {
        save("out.png");
    }
}
