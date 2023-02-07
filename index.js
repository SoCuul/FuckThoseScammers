//Import modules
import Piscina from 'piscina'

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
import {
    fakeEmail,
    fakePassword
} from './functions.js'

//Send requests
while (true) {
    const requestActions = []

    //Create requests array
    for (let i = 0; i < threadCount; i++) {
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