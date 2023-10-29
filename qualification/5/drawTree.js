// Кеширование вычислений синусов и косинусов
const sinCache = {};
const cosCache = {};

function getCachedSin(angle) {
    if (!sinCache[angle]) {
        sinCache[angle] = Math.sin(angle * Math.PI / 180);
    }
    return sinCache[angle];
}

function getCachedCos(angle) {
    if (!cosCache[angle]) {
        cosCache[angle] = Math.cos(angle * Math.PI / 180);
    }
    return cosCache[angle];
}

// Вспомогательная функция для отрисовки линии
function drawLine(x, y, angle, len, level, widthCache, colorCache) {
    ctx.beginPath();
    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(angle * Math.PI / 180);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);

    if (!widthCache[level]) {
        widthCache[level] = computeWidth(level);
    }
    if (!colorCache[level]) {
        colorCache[level] = computeColor(level);
    }

    ctx.strokeStyle = colorCache[level];
    ctx.lineWidth = widthCache[level];

    ctx.stroke();
    ctx.restore();
}

// Вспомогательная функция для добавления новых ветвей в стек
function addBranches(x, y, angle, len, level, angleOffset, stack) {
    const newLevel = level + 1;
    const newX = x + len * getCachedSin(angle);
    const newY = y - len * getCachedCos(angle);

    stack.push({ x: newX, y: newY, angle: angle + angleOffset, level: newLevel });
    stack.push({ x: newX, y: newY, angle: angle - angleOffset, level: newLevel });
}

// Основная функция для отрисовки дерева
function drawTree(startY, angle, level = 0) {
    const startX = canvas.width / 2;
    const stack = [{ x: startX, y: startY, angle, level }];
    const widthCache = {};
    const colorCache = {};

    while (stack.length > 0) {
        const { x, y, angle, level } = stack.pop();
        const len = length * Math.pow(depth, level);

        drawLine(x, y, angle, len, level, widthCache, colorCache);

        if (len >= 12) {
            addBranches(x, y, angle, len, level, angleOffset, stack);
        }
    }
}
