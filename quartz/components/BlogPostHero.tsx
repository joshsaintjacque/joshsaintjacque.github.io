import { Date, getDate } from "./Date"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, resolveRelative } from "../util/path"
import {
  getBlogAccent,
  getBlogAssetPath,
  getBlogDescription,
  getBlogSticker,
  normalizeTitle,
} from "../util/blog"

export default (() => {
  const BlogPostHero: QuartzComponent = ({ cfg, fileData }: QuartzComponentProps) => {
    const slug = fileData.slug!
    const accent = getBlogAccent(slug)
    const sticker = getBlogSticker(slug)
    const description = getBlogDescription(fileData)
    const title = normalizeTitle(fileData.frontmatter?.title)
    const tags = fileData.frontmatter?.tags ?? []
    const date = getDate(cfg, fileData)

    return (
      <section
        class="blog-post-hero"
        data-accent={accent.name}
        style={`--blog-card-accent: ${accent.color}; --blog-card-accent-soft: ${accent.soft};`}
      >
        <div class="blog-post-hero__shell">
          <div class="blog-post-hero__body">
            <p class="blog-post-hero__eyebrow">Software notes from Josh Saint Jacque</p>
            <h1 class="blog-post-hero__title">{title}</h1>
            {description && <p class="blog-post-hero__description">{description}</p>}
            {tags.length > 0 && (
              <ul class="blog-post-hero__tags">
                {tags.map((tag) => (
                  <li>
                    <a class="blog-pill" href={resolveRelative(slug, `tags/${tag}` as FullSlug)}>
                      {tag}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div class="blog-post-hero__meta">
            {date && (
              <span class="blog-post-hero__date">
                <Date date={date} locale={cfg.locale} />
              </span>
            )}
            <img
              class="blog-post-hero__sticker"
              src={getBlogAssetPath(slug, sticker.file)}
              alt={sticker.alt}
            />
          </div>
        </div>
      </section>
    )
  }

  return BlogPostHero
}) satisfies QuartzComponentConstructor
