// helpers

const hiddenKeys = new WeakMap();

const lightSwitch = function () {
    const hiddenProps = {};
    for (let key in this) {
        if (!key.startsWith('$')) {
            hiddenProps[key] = this[key];
            delete this[key];
        }
    }
    hiddenKeys.set(this, hiddenProps);
};

const getter = function (key) {
    const hiddenProps = hiddenKeys.get(this) || {};
    if (key in this) {
        return this[key];
    } else if (key in hiddenProps) {
        return hiddenProps[key];
    }
    return undefined;
};

module.exports = { lightSwitch, getter }

// example

const artObject = {
    $redRose: 11101,
    metroStations: ['Park Kultury', 'Delovoy Center'],
    busStops: ['B', 'c910', '379'],
    $city: 10101,
    towers: ['Oko', 'Neva'],
    $getTransports() {
        const stations = this.$getter('metroStations')
        const stops = this.$getter('busStops')
        return [...stations, ...stops]
    },
    $lightSwitch: lightSwitch,
    $getter: getter,
}

artObject.$lightSwitch()

// basic tests

console.log('towers' in artObject) //-> false
console.log(artObject.$getter('towers')) //-> [ 'Oko', 'Neva' ]
console.log(artObject.$redRose) //-> 11101
console.log(artObject.$getTransports()) //-> [ 'Park Kultury', 'Delovoy Center', 'B', 'c910', '379' ]
