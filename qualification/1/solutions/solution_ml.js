const MAX_POINTS = 4; // количество точек в прямоугольнике

/**
 * Получить случайное целое число в диапазоне [0...max]
 *
 * @param {number} max максимальное значение
 * @returns {number} случайное целое число в диапазоне [0...max]
 */
function getRandomInt(max) {
    return Math.trunc(Math.random() * max);
}

/**
 * Получить случайную точку в диапазоне [0...xMax] и [0...yMax]
 *
 * @param {number} xMax максимальная координата x
 * @param {number} yMax максимальная координата y
 * @returns {Array} случайная точка в формате [x, y]
 */
function getRandomPoint(xMax, yMax) {
    return [getRandomInt(xMax), getRandomInt(yMax)];
}

/**
 * Рисование случайных прямоугольников
 *
 * @param {number} N количество прямоугольников
 * @param {number} xMax максимальная координата x
 * @param {number} yMax максимальная координата y
 * @returns {Array} массив прямоугольников в формате `[[[x1, y1], [x2, y2], [x3, y3], [x4, y4]], ...]`
 */
function draw(N, xMax, yMax) {
    const rectangles = [];

    for (let i = 0; i < N; i++) {
        const points = Array.from({ length: MAX_POINTS }, () => getRandomPoint(xMax, yMax));
        rectangles.push(points);
    }

    return rectangles;
}

module.exports = { draw };
