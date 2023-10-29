@ColorPlayer("48% 0.27 274 / 1", (color) => console.log(color))
class Piano {
  @Color("L", "10%")
  playA(octave) {
    console.log("A" + octave);
  }

  @Color("C", "0.15")
  playB(octave) {
    console.log("B" + octave)
  }

  @Color("H", "0.03")
  playC(octave) {
    console.log("C" + octave);
  }

  @Color("L", "10%")
  playD(octave) {}

  @Color("C", "0.15")
  playE(octave) {}

  @Color("H", "0.1")
  playF(octave) {}

  @Color("a", "0.4")
  playG(octave) {}
}

export function ColorPlayer(initialColor, cb) {
  return function (originalConstructor) {
    // новый метод парсинга цвета по OKLCH
    function parseColors(color) {
      const [L, C, H, _delimiter, a] = color.split(" ").map(parseFloat);
      return { L, C, H, a };
    }

    // новый метод преобразования цвета в строку по OKLCH
    function stringifyColor({ L, C, H, a }) {
      return `${L.toFixed(2)}% ${C.toFixed(2)} ${H.toFixed(2)} / ${a.toFixed(2)}`;
    }

    // Создаем новый конструктор
    function newConstructor(...args) {
      const instance = new originalConstructor(...args);

      instance._parseColor = parseColors;

      instance._stringifyColor = stringifyColor;

      // Инициализируем начальный цвет и колбэк
      instance._initialColor = instance._parseColor(initialColor);
      instance._cb = cb;

      return instance;
    }

    // Копируем прототип
    newConstructor.prototype = originalConstructor.prototype;

    // Вызываем колбэк с начальным цветом
    cb(stringifyColor(parseColors(initialColor)));

    return newConstructor;
  };
}

export function Color(component, coeff) {
  return function (value, { kind, name }) {
    if (kind === "method") {
      return function (...args) {
        // Получаем текущий цвет
        let currentColor = this._initialColor;

        // Вычисляем изменение на основе октавы
        let change = (args[0] - 3) * parseFloat(coeff);

        switch (component) {
          case "L":
            currentColor.L += change;
            currentColor.L = Math.min(Math.max(currentColor.L, 0), 100);
            break;
          case "C":
            currentColor.C += change;
            currentColor.C = Math.min(Math.max(currentColor.C, 0), 0.37);
            break;
          case "H":
            currentColor.H += change;
            currentColor.H = (currentColor.H + 360) % 360;
            break;
          case "a":
            currentColor.a += change;
            currentColor.a = Math.min(Math.max(currentColor.a, 0), 1);
            break;
        }

        // Обновляем цвет
        this._initialColor = currentColor;

        // Вызываем колбэк с новым цветом
        this._cb(this._stringifyColor(currentColor));

        // Вызываем метод
        return value.call(this, ...args);

      }
    }
  }
}

const piano = new Piano(); // console.log("48.00% 0.27 274.00 / 1.00")
piano.playA(2) // console.log("38.00% 0.27 274.00 / 1.00")
piano.playA(4) // console.log("48.00% 0.27 274.00 / 1.00")
piano.playB(3) // console.log("48.00% 0.27 274.00 / 1.00")
