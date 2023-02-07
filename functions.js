//Import variables
import { firstNames, lastNames, domains } from './names.js'


//Misc
export function randomNumber (min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
export function randomNumbers (quantity, min, max) {
    const numbers = []

    while (numbers.length < quantity) {
        numbers.push(randomNumber(min, max))
    }

    return numbers.join('')
}

export function randomValue (array) {
    return array[ Math.floor(Math.random() * array.length) ]
}
export function generatePassword (length, symbols = true) {
    const charset = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789${symbols ? '!@#$%&' : ''}`
    let retVal = ""

    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n))
    }

    return retVal
}


//Generate fake data
export function fakeEmail () {
    return `${randomValue(firstNames)}.${randomValue(lastNames)}${randomNumbers(3, 1, 9)}@${randomValue(domains)}`.toLowerCase()
}
export function fakePassword () {
    return generatePassword(randomNumber(12, 16))
}