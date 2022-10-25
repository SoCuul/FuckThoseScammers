//Import modules
import Piscina from 'piscina'

//Import variables
import { firstNames, lastNames, domains } from './names.js'
import { threadCount } from './config.js'

//Check for spammer file
const spammerFile = process.argv[2]

if (!spammerFile) {
    console.log('[Error] No spammer file was provided as a command-line argument.')
    process.exit(1)
}

//Create piscina instance
const worker = new Piscina({
    filename: `./spammers/${spammerFile}`,
    minThreads: threadCount
})

//Misc functions
function randomNumber (min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
function randomNumbers (quantity, min, max) {
    const numbers = []

    while (numbers.length < quantity) {
        numbers.push(randomNumber(min, max))
    }

    return numbers.join('')
}
function randomValue (array) {
    return array[Math.floor(Math.random() * array.length)]
}
function generatePassword (length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&"
    let retVal = ""

    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n))
    }

    return retVal
}

//Generate fake data
function fakeEmail () {
    return `${randomValue(firstNames)}.${randomValue(lastNames)}${randomNumbers(3, 1, 9)}@${randomValue(domains)}`.toLowerCase()
}
function fakePassword () {
    return generatePassword(randomNumber(12, 16))
}

//Send requests
while (true) {
    const requestActions = []

    //Create requests array
    for (let i = 0; i <= threadCount; i++) {
        requestActions.push(() => worker.run({
            email: fakeEmail(),
            password: fakePassword(),
            index: i
        }))
    }

    //Send requests
    const requests = await Promise.all(
        requestActions.map(f => f())
    )

    //Parse requests
    for (const req of requests) {
        if (req.error) console.log(`[Error]  ||  ${req.response || `Email=${req?.email}  ||  Password=${req?.password}`}`)
        else console.log(req.response || `Email=${req?.email}  ||  Password=${req?.password}`)
    }
}