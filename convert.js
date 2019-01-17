module.exports = {
    distance: {
        toMetric: ft => (parseFloat(ft) / 3.2808).toFixed(1),
        toImperial: m => (parseFloat(m) * 3.2808).toFixed(1)
    },
    weight: {
        toMetric: lbs => (parseFloat(lbs) / 2.20462).toFixed(1),
        toImperial: kg => (parseFloat(kg) * 2.20462).toFixed(1)
    }
};