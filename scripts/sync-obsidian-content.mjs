#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, "..")

const defaultVaultBlog = path.join(
  process.env.HOME ?? "",
  "workspace",
  "Obsidian Vault",
  "30 - Permanent",
  "Blog",
)

const sourceDir = path.resolve(process.env.OBSIDIAN_BLOG_DIR ?? defaultVaultBlog)
const destDir = path.join(repoRoot, "content", "blog")

function rmRecursive(dir) {
  if (!fs.existsSync(dir)) return
  fs.rmSync(dir, { recursive: true, force: true })
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function copyTree(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`Source does not exist (create it in Obsidian): ${src}`)
    ensureDir(dest)
    return
  }
  const stat = fs.statSync(src)
  if (!stat.isDirectory()) {
    throw new Error(`Source is not a directory: ${src}`)
  }
  rmRecursive(dest)
  ensureDir(path.dirname(dest))
  fs.cpSync(src, dest, { recursive: true })
  console.log(`Synced ${src} -> ${dest}`)
}

copyTree(sourceDir, destDir)
