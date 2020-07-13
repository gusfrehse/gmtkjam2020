let mod = (x, y) => ((y + (x % y)) % y)

let pallete = [
    [111, 255, 233],
    [ 91, 192, 190],
    [ 58,  80, 107],
    [ 28,  37,  65],
    [ 11,  19,  43]
]

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}