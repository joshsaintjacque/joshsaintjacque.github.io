import test, { describe } from "node:test"
import assert from "node:assert"
import {
  getBlogAccent,
  getBlogPosts,
  getBlogSticker,
  isBlogLandingRoute,
  isBlogPostRoute,
  isBlogRoute,
  normalizeTitle,
} from "./blog"

describe("blog helpers", () => {
  test("detects blog routes", () => {
    assert.strictEqual(isBlogRoute("blog/index"), true)
    assert.strictEqual(isBlogRoute("blog/on-orchestration"), true)
    assert.strictEqual(isBlogRoute("tags/engineering"), false)
    assert.strictEqual(isBlogRoute(undefined), false)

    assert.strictEqual(isBlogLandingRoute("blog/index"), true)
    assert.strictEqual(isBlogLandingRoute("blog/on-orchestration"), false)

    assert.strictEqual(isBlogPostRoute("blog/on-orchestration"), true)
    assert.strictEqual(isBlogPostRoute("blog/index"), false)
  })

  test("normalizes string and list titles", () => {
    assert.strictEqual(normalizeTitle(" On Orchestration "), "On Orchestration")
    assert.strictEqual(normalizeTitle(["", "Throw More Code Away"]), "Throw More Code Away")
    assert.strictEqual(normalizeTitle(undefined, "Fallback"), "Fallback")
  })

  test("accent and sticker selection are deterministic", () => {
    assert.deepStrictEqual(
      getBlogAccent("blog/on-orchestration"),
      getBlogAccent("blog/on-orchestration"),
    )
    assert.deepStrictEqual(
      getBlogSticker("blog/on-orchestration"),
      getBlogSticker("blog/on-orchestration"),
    )
  })

  test("blog posts are sorted newest first", () => {
    const cfg = { defaultDateType: "modified" } as const
    const posts = getBlogPosts(
      [
        {
          slug: "blog/older",
          frontmatter: { title: "Older" },
          dates: { modified: new Date("2026-03-10") },
        },
        {
          slug: "blog/newer",
          frontmatter: { title: "Newer" },
          dates: { modified: new Date("2026-03-12") },
        },
        {
          slug: "tags/engineering",
          frontmatter: { title: "Tag" },
          dates: { modified: new Date("2026-03-15") },
        },
      ] as any,
      cfg as any,
    )

    assert.deepStrictEqual(
      posts.map((post) => post.slug),
      ["blog/newer", "blog/older"],
    )
  })
})
