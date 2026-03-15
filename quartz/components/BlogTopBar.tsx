import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, resolveRelative } from "../util/path"
import { getBlogAssetPath } from "../util/blog"

export default (() => {
  const BlogTopBar: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
    const slug = fileData.slug!
    return (
      <div class="blog-topbar-breakout">
        <div class="blog-topbar-shell">
          <a class="blog-brand" href={resolveRelative(slug, "blog/index" as FullSlug)}>
            <img
              class="blog-brand__mark"
              src={getBlogAssetPath(slug, "ruby.png")}
              alt="Ruby gem mascot"
            />
            <span>Blog</span>
          </a>

          <div class="blog-socials">
            <a
              class="blog-social"
              href="https://bsky.app/profile/joshsaintjacque.com"
              target="_blank"
              rel="noreferrer"
            >
              <img
                class="blog-social__icon"
                src={getBlogAssetPath(slug, "butterfly.png")}
                alt="Bluesky"
              />
              <span>Bluesky</span>
            </a>
            <a
              class="blog-social"
              href="https://www.linkedin.com/in/josh-saint-jacque-61208a17/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                class="blog-social__icon"
                src={getBlogAssetPath(slug, "briefcase.png")}
                alt="LinkedIn"
              />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    )
  }

  return BlogTopBar
}) satisfies QuartzComponentConstructor
