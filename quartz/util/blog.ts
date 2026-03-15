import { GlobalConfiguration } from "../cfg"
import { QuartzPluginData } from "../plugins/vfile"
import { FullSlug, joinSegments, pathToRoot } from "./path"

export interface BlogAccent {
  name: string
  color: string
  soft: string
}

export interface BlogSticker {
  file: string
  alt: string
}

const BLOG_ACCENTS: BlogAccent[] = [
  { name: "tomato", color: "#ff7a59", soft: "#ffd8cc" },
  { name: "tangerine", color: "#ff9f45", soft: "#ffe1bf" },
  { name: "gold", color: "#f2c94c", soft: "#fff1b3" },
  { name: "lime", color: "#b9e769", soft: "#edf9cc" },
  { name: "mint", color: "#61d095", soft: "#d0f4df" },
  { name: "sky", color: "#74c0fc", soft: "#d7efff" },
  { name: "violet", color: "#9b8cff", soft: "#e0dcff" },
  { name: "pink", color: "#ff8cc6", soft: "#ffd9eb" },
]

const BLOG_STICKERS: BlogSticker[] = [
  { file: "lightning-bolt.png", alt: "Lightning bolt illustration" },
  { file: "quality-shield.png", alt: "Quality shield illustration" },
]

function hashSlug(slug: string): number {
  let hash = 0
  for (const char of slug) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  }
  return hash
}

export function isBlogRoute(slug?: string): boolean {
  return typeof slug === "string" && slug.startsWith("blog/")
}

export function isBlogLandingRoute(slug?: string): boolean {
  return slug === "blog/index"
}

export function isBlogPostRoute(slug?: string): boolean {
  return typeof slug === "string" && isBlogRoute(slug) && !slug.endsWith("/index")
}

export function normalizeTitle(title: unknown, fallback = "Untitled"): string {
  if (Array.isArray(title)) {
    for (const entry of title) {
      const normalized = normalizeTitle(entry, "")
      if (normalized.length > 0) {
        return normalized
      }
    }
    return fallback
  }

  if (typeof title === "string") {
    const normalized = title.trim()
    return normalized.length > 0 ? normalized : fallback
  }

  return fallback
}

export function getBlogAccent(slug: string): BlogAccent {
  return BLOG_ACCENTS[hashSlug(slug) % BLOG_ACCENTS.length]!
}

export function getBlogSticker(slug: string): BlogSticker {
  const index = Math.floor(hashSlug(slug) / BLOG_ACCENTS.length) % BLOG_STICKERS.length
  return BLOG_STICKERS[index]!
}

export function getBlogAssetPath(currentSlug: string, file: string): string {
  return joinSegments(pathToRoot(currentSlug as FullSlug), "static", "blog", file)
}

export function getBlogDescription(page: QuartzPluginData): string {
  const description = page.frontmatter?.description ?? page.description
  return typeof description === "string" ? description.trim() : ""
}

export function getBlogPosts(
  allFiles: QuartzPluginData[],
  cfg: GlobalConfiguration,
): QuartzPluginData[] {
  return allFiles
    .filter((file) => isBlogPostRoute(file.slug))
    .sort((a, b) => {
      const aDate = a.dates?.[cfg.defaultDateType]
      const bDate = b.dates?.[cfg.defaultDateType]

      if (aDate && bDate) {
        return bDate.getTime() - aDate.getTime()
      } else if (aDate) {
        return -1
      } else if (bDate) {
        return 1
      }

      return normalizeTitle(a.frontmatter?.title).localeCompare(
        normalizeTitle(b.frontmatter?.title),
      )
    })
}
