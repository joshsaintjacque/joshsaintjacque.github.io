import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Josh Saint Jacque",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "joshsaintjacque.github.io",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        title: "Instrument Serif",
        header: "Syne",
        body: "Outfit",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f4",
          lightgray: "#e6e1d9",
          gray: "#a09890",
          darkgray: "#3d3733",
          dark: "#1a1612",
          secondary: "#c03030",
          tertiary: "#1d7a5c",
          highlight: "rgba(192, 48, 48, 0.06)",
          textHighlight: "#f5c75d55",
        },
        darkMode: {
          light: "#100f14",
          lightgray: "#262430",
          gray: "#6e6a78",
          darkgray: "#cdc8d4",
          dark: "#f0edf5",
          secondary: "#ff7849",
          tertiary: "#4dd8a4",
          highlight: "rgba(255, 120, 73, 0.08)",
          textHighlight: "#e6b83f44",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
