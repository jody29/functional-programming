import changeKey from './change-key.js'

let colors = []

fetch('./src/data/colors.json')
.then(results => results.json())
.then(data => {
    return data.map(obj => {
        colors.push(obj)
    })
})

fetch('./src/data/dataset.json')
.then(results => results.json())
.then(data => {
    return data.map(obj => {
        Object.keys(obj).forEach(key => {
            obj[key] = removeCaps(obj[key])
            obj[key] = removeQuestionMark(obj[key])
            obj[key] = checkIfEmpty(obj[key])
            obj[key] = removeStripes(obj[key])
        })
        return obj
    })
    
})
.then(data => data.map(obj => {
    changeKey('Wat is je favoriete soort huisdier?', 'favPet', obj)
    changeKey('Wat is je oogkleur?', 'eyeColor', obj)
    changeKey('Wat is je favoriete windrichting?', 'favDirection', obj)
    changeKey('Op een schaal van 1 tot 10, hoeveel zin heb je in de Tech Track?', 'excitmentLevel', obj)
    changeKey('Kies zelf of je deze vraag beantwoord.', 'chooseAnswer', obj)
    changeKey('Wat is je favoriete datum?', 'dateFormat', obj)
    changeKey('Wat is je favoriete datum, maar nu in tekst!', 'dateString', obj)
    changeKey('Wat is je favoriete zuivelproduct?', 'favDairy', obj)
    changeKey('Welke kleur kledingstukken heb je aan vandaag? (Meerdere antwoorden mogelijk natuurlijk...)', 'clothColor', obj)
    changeKey('Op welke verdieping van het TTH studeer je het liefst?', 'tthFloor', obj)
    changeKey('Wat wil je worden als je groot bent?', 'futureJob', obj)
    changeKey('Wat wilde je later worden als je groot bent, maar nu toen je zelf 8 jaar was.', 'earlyFutureJob', obj)
    changeKey('Kaas is ook een zoogdier?', 'cheeseAnimal', obj)
    changeKey('Als je later een auto zou kopen, van welk merk zou deze dan zijn?', 'futureCar', obj)
    
    return obj
}))
.then(data => {
    colorToHex(data, 'eyeColor')
    return data
})
.then(data => {
    renderData(data, 'eyeColor')
    console.log(data)
})
.catch(err => {
    console.log(err)
})

function removeSpace(str) {
    return typeof str === 'string' ? str.replaceAll('', '') : str
}

function removeCaps(str) {
    return typeof str === 'string' ? str.toLowerCase() : str
}

function removeQuestionMark(str) {
    return typeof str === 'string' ? str.split(' ').join('') : str
}

function removeStripes(str) {
    return typeof str === 'string' ? str.replaceAll('-', '') : str
}

function checkIfEmpty(str) {
    return typeof str === 'string' && str.length < 1 ? 'geen antwoord' : str
}

function colorToHex(data, key) {
    data.map(obj => {
        let word = obj[key]
        colors.map(item => {
            if (item.color === word) {
                return obj[key] = item.hex
            } else {
                return {[key]: obj[key]}
            }
        })
    })
}

function renderData(data, key) {
    data.map(obj => {
        let div = document.querySelector('div')
        let p = document.createElement('p')
        div.appendChild(p)
        p.setAttribute('style', 'background-color: ' + obj[key])
        p.textContent = obj[key].toUpperCase()
    })  
}



    








