import type { Options, HTMLElement } from "node-html-parser";

export type ParseHtml = (
  data: string,
  options?: Partial<Options>
) => HTMLElement;

/**
 *
 * @param {string} html - the html content to clean
 * @returns only the text content of the html, removing all unnecessary tags to get recipe content from
 */
export const cleanHtml = async (html: string) => {
  const parse = (await import("node-html-parser")).parse;

  const tagsToRemove = [
    'script:not([type="application/ld+json"])',
    "style",
    "svg",
    "a",
    "button",
    "footer",
    "header",
    "nav",
    "aside",
    "form",
    "input",
    "noscript",
    "iframe",
  ];

  // Parse the HTML content
  const root = parse(html);

  // Remove unwanted tags
  tagsToRemove.forEach((tag) => {
    root.querySelectorAll(tag).forEach((el) => el.remove());
  });

  // Extract Open Graph meta tags
  const ogData: { title?: string; description?: string; image?: string } = {};
  root.querySelectorAll("meta").forEach((meta) => {
    const property = meta.getAttribute("property");
    const content = meta.getAttribute("content");
    if (property && content) {
      if (property === "og:title") ogData.title = content;
      if (property === "og:description") ogData.description = content;
      if (property === "og:image") ogData.image = content;
    }
  });

  // Extract the title tag content
  const title = root.querySelector("title")?.text || "";
  if (!ogData.title) ogData.title = title;

  const cleanedText = root.text
    .trim()
    // Replace multiple newlines with a single newline
    .replace(/[\n\r]+/g, "\n")
    // Replace multiple spaces with a single space
    .replace(/\s+/g, " ");

  // Return cleaned content
  return {
    ogData,
    textContent: cleanedText,
  };
};
