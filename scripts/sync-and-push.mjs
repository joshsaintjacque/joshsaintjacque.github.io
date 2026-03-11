#!/usr/bin/env node

import { execFileSync } from "node:child_process"

const run = (command, args, options = {}) => {
  execFileSync(command, args, { stdio: "inherit", ...options })
}

const capture = (command, args) =>
  execFileSync(command, args, { encoding: "utf8" }).trim()

run("npm", ["run", "sync"])

const status = capture("git", ["status", "--porcelain"])

if (!status) {
  console.log("No changes after sync.")
  process.exit(0)
}

const branch = capture("git", ["branch", "--show-current"])

if (!branch) {
  throw new Error("Cannot push while HEAD is detached.")
}

const timestamp = new Date().toISOString().replace(/\.\d{3}Z$/, "Z")
const message = `chore: sync ${timestamp}`

console.log(`Committing changes with message: "${message}"`)

run("git", ["add", "-A"])
run("git", ["commit", "-m", message])
run("git", ["push", "origin", branch])
