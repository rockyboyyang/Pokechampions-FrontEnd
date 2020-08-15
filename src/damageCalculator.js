
function getRandomFloat(min, max) {
    return JSON.parse((Math.random() * (max - min) + min).toFixed(2));
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function isCritical() {
    if(randomIntFromInterval(1, 24) === 12) return 1.5
    else return 1 
}

let weather = 1;
let stab = 1
let type = 1
let burn = 1

const damageOutput = (level, power, attack, defense, weather, stab, burn, targetType, targetType2) => {
    let critical = isCritical();
    let random = getRandomFloat(0.85,1)
    let modifier = weather * critical * random * stab * burn * targetType * targetType2
    let damage = (((((2 * level) / 5) + 2) * power * (attack / defense)) / 50) + 2
    let totalDamage = Math.floor(damage * modifier)
    
    
}

console.log(damageOutput(50, 110, 114, 70, weather, 1.5, 1, 0.5, 0.5))