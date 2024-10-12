import htmlToPdfmake from 'html-to-pdfmake';
import { JSDOM } from 'jsdom';

interface ContentReplacer {
  [key: string]: string;
}
export const getHtmlContent = (html: string, replacers: ContentReplacer) => {
  const { window } = new JSDOM();
  Object.entries(replacers).forEach(([key, value]) => {
    html = html.replaceAll(`{{ ${key} }}`, value);
  });
  return htmlToPdfmake(html, { window });
};
