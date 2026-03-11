#!/usr/bin/env node

import { execFileSync } from "node:child_process"

const run = (command, args, options = {}) => {
  execFileSync(command, args, { stdio: "inherit", ...options })
}

const capture = (command, args) =>
  execFileSync(command, args, { encoding: "utf8" }).trim()

const captureJson = (command, args) => {
  const out = execFileSync(command, args, { encoding: "utf8" })
  return JSON.parse(out || "[]")
}

const sleepSeconds = (seconds) => {
  try {
    execFileSync("sleep", [String(seconds)], { stdio: "ignore" })
  } catch {
    const end = Date.now() + seconds * 1000
    while (Date.now() < end) {}
  }
}

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
const headSha = capture("git", ["rev-parse", "HEAD"])
run("git", ["push", "origin", branch])

if (branch !== "v4") {
  console.log(`Pushed ${branch}; deploy workflow only runs on v4. Skipping gh watch.`)
  process.exit(0)
}

try {
  execFileSync("gh", ["auth", "status"], { stdio: "pipe" })
} catch {
  console.error("gh is not available or not authenticated; cannot watch deploy run.")
  process.exit(0)
}

const deployWorkflowName = "Deploy Quartz site to GitHub Pages"
const pollIntervalSec = 3
const maxWaitSec = 90
const deadline = Date.now() + maxWaitSec * 1000
let runId = null

while (Date.now() < deadline && !runId) {
  let rows
  try {
    rows = captureJson("gh", [
      "run",
      "list",
      "-b",
      branch,
      "-c",
      headSha,
      "-e",
      "push",
      "-L",
      "20",
      "--json",
      "databaseId,headSha,status,url,workflowName",
    ])
  } catch {
    rows = []
  }
  const match = Array.isArray(rows)
    ? rows.find(
        (r) =>
          r.headSha === headSha && r.workflowName === deployWorkflowName,
      )
    : null
  if (match?.databaseId) {
    runId = match.databaseId
    console.log(`Deploy run: ${match.url ?? runId} (${match.status ?? "unknown"})`)
    break
  }
  sleepSeconds(pollIntervalSec)
}

if (!runId) {
  console.error(
    `No deploy workflow run found for ${headSha} within ${maxWaitSec}s. Check Actions on GitHub.`,
  )
  process.exit(1)
}

run("gh", ["run", "watch", String(runId), "--compact", "--exit-status"])
