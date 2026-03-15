import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import FolderContent from "./FolderContent"
import { Date, getDate } from "../Date"
import { SortFn } from "../PageList"
import { FullSlug, resolveRelative } from "../../util/path"
import {
  getBlogAccent,
  getBlogAssetPath,
  getBlogDescription,
  getBlogPosts,
  getBlogSticker,
  isBlogLandingRoute,
  normalizeTitle,
} from "../../util/blog"

interface BlogAwareFolderContentOptions {
  showFolderCount: boolean
  showSubfolders: boolean
  sort?: SortFn
}

const defaultOptions: BlogAwareFolderContentOptions = {
  showFolderCount: true,
  showSubfolders: true,
}

export default ((opts?: Partial<BlogAwareFolderContentOptions>) => {
  const options: BlogAwareFolderContentOptions = { ...defaultOptions, ...opts }
  const DefaultFolderContent = FolderContent(options)

  const BlogAwareFolderContent: QuartzComponent = (props: QuartzComponentProps) => {
    if (!isBlogLandingRoute(props.fileData.slug)) {
      return <DefaultFolderContent {...props} />
    }

    const { cfg, fileData } = props
    const posts = getBlogPosts(props.allFiles, cfg)

    return (
      <div class="blog-folder-page">
        <section class="blog-landing-hero">
          <span class="blog-label blog-label--tilted">Latest thinking</span>
          <h2 class="blog-landing-hero__title">Simplify, Ship, Repeat</h2>
          <p class="blog-landing-hero__description">
            Thoughts on software development by Josh Saint Jacque
          </p>
        </section>

        <section class="blog-landing-section">
          <h3 class="blog-landing-section__title">
            <span class="blog-label">Latest Articles</span>
          </h3>

          <div class="blog-card-grid">
            {posts.map((page) => {
              const slug = page.slug!
              const accent = getBlogAccent(slug)
              const sticker = getBlogSticker(slug)
              const date = getDate(cfg, page)
              const href = resolveRelative(fileData.slug!, page.slug! as FullSlug)
              const tags = page.frontmatter?.tags ?? []

              return (
                <a
                  class="blog-post-card"
                  href={href}
                  data-accent={accent.name}
                  style={`--blog-card-accent: ${accent.color}; --blog-card-accent-soft: ${accent.soft};`}
                >
                  <div class="blog-post-card__body">
                    <h4 class="blog-post-card__title">{normalizeTitle(page.frontmatter?.title)}</h4>
                    <p class="blog-post-card__description">{getBlogDescription(page)}</p>
                    {tags.length > 0 && (
                      <ul class="blog-post-card__tags">
                        {tags.map((tag) => (
                          <li>
                            <span class="blog-pill">{tag}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div class="blog-post-card__meta">
                    {date && (
                      <span class="blog-post-card__date">
                        <Date date={date} locale={cfg.locale} />
                      </span>
                    )}
                    <img
                      class="blog-post-card__sticker"
                      src={getBlogAssetPath(fileData.slug!, sticker.file)}
                      alt={sticker.alt}
                    />
                  </div>
                </a>
              )
            })}
          </div>
        </section>
      </div>
    )
  }

  BlogAwareFolderContent.css = DefaultFolderContent.css
  return BlogAwareFolderContent
}) satisfies QuartzComponentConstructor
