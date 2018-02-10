// Based on "Structured Square Series - Inward" by Roger Coqart
// Originally published in "Computer Graphics and Art" vol1 no3, 1976
// See: http://recodeproject.com/artwork/v1n3structure-square-series-inwards

int margin = 16;
int padding = 9;
int squares = 17;
int square_size = 17;

void setup() {
    size(465, 465);
    background(#ffffff);
    stroke(#000000);
    noFill();

    drawBorder();
    for (int row = 0; row < squares; row++) {
        for (int col = 0; col < squares; col++) {
            drawSquare(row, col);
        }
    }

    save("out.png");
}

void drawBorder() {
    rect(0, 0, width - 1, height - 1);
}

void drawSquare(int row, int col) {
    pushMatrix();
    translate(
        col * (square_size + padding) + margin,
        row * (square_size + padding) + margin
    );

    rect(0, 0, square_size, square_size);

    int count = radius(row, col);
    // int count = horizontal(row, col);
    // int count = vertical(row, col);
    int[] strokes = randomStrokes(count);
    for (int i = 0; i < strokes.length; i++) {
        drawLine(row, col, strokes[i]);
    }

    popMatrix();
}

void drawLine(int row, int col, int style) {
    int top = 0;
    int left = 0;
    int right = square_size;
    int bottom = square_size;
    int mid = (square_size + 1) / 2;

    if (style == 0) line(mid, top, mid, bottom);
    if (style == 1) line(left, mid, right, mid);
    if (style == 2) line(left, top, right, bottom);
    if (style == 3) line(right, top, left, bottom);
    if (style == 4) line(mid, top, right, mid);
    if (style == 5) line(right, mid, mid, bottom);
    if (style == 6) line(mid, bottom, left, mid);
    if (style == 7) line(left, mid, mid, top);
}

int[] randomStrokes(int count) {
    int[] result = new int[count];
    int[] strokes = {0, 1, 2, 3, 4, 5, 6, 7};
    shuffle(strokes);
    for (int i = 0; i < count; i++) {
        result[i] = strokes[i];
    }
    return result;
}

void shuffle(int[] array) {
    for (int i = 0; i < array.length; i++) {
        int j = int(random(i, array.length));
        int tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
    }
}

int radius(int row, int col) {
    int mid = (squares - 1) / 2;
    return max(abs(row - mid), abs(col - mid));
}

int horizontal(int row, int col) {
    return max(0, floor((col + 1) / 2));
}

int vertical(int row, int col) {
    return max(0, floor((row + 1) / 2));
}