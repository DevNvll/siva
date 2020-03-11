const { IgApiClient } = require("instagram-private-api")
const inquirer = require("inquirer")
const _ = require("lodash")
const { existsSync, readFile, writeFile, accessSync } = require("fs")

async function saveSession(data) {
  const checkpointStatePath = `./session/session.json`

  writeFile(checkpointStatePath, JSON.stringify(data), "utf8", err => {
    if (err) console.log(err)
  })
}

async function login(ig) {
  ig.request.end$.subscribe(async () => {
    const serialized = await ig.state.serialize()
    delete serialized.constants
    await saveSession(serialized)
  })
  const { username } = await inquirer.prompt([
    {
      type: "input",
      name: "username",
      message: "Username"
    }
  ])
  const { password } = await inquirer.prompt([
    {
      type: "password",
      name: "password",
      message: "Password"
    }
  ])
  await ig.account.login(username, password).catch(async err => {
    await ig.challenge.auto(true)
    const { code } = await inquirer.prompt([
      {
        type: "input",
        name: "code",
        message: "Enter code"
      }
    ])
    await ig.challenge.sendSecurityCode(code)
  })
}

const ig = new IgApiClient()
ig.state.proxyUrl = process.env.IG_PROXY
;(async function() {
  const ig = new IgApiClient()
  ig.state.generateDevice("delta")
  ig.state.proxyUrl = process.env.IG_PROXY

  await login(ig)
})()
