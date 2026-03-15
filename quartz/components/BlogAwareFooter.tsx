import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"
import { getBlogAssetPath, isBlogRoute } from "../util/blog"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const BlogAwareFooter: QuartzComponent = ({
    cfg,
    displayClass,
    fileData,
  }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? {}

    if (isBlogRoute(fileData.slug)) {
      const slug = fileData.slug!
      return (
        <footer class={`${displayClass ?? ""} blog-footer-breakout blog-footer`}>
          <div class="blog-footer-shell">
            <img
              class="blog-footer__headshot"
              src={getBlogAssetPath(slug, "headshot.png")}
              alt="Josh Saint Jacque"
            />
            <p>© {year} Josh Saint Jacque. All rights reserved.</p>
            <ul>
              {Object.entries(links).map(([text, link]) => (
                <li>
                  <a href={link}>{text}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      )
    }

    return (
      <footer class={`${displayClass ?? ""}`}>
        <p>
          {i18n(cfg.locale).components.footer.createdWith}{" "}
          <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a> © {year}
        </p>
        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
      </footer>
    )
  }

  BlogAwareFooter.css = style
  return BlogAwareFooter
}) satisfies QuartzComponentConstructor
