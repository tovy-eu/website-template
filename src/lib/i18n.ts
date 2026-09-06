import en from '../content/en.json';
import nl from '../content/nl.json';

const content = { en, nl } as const;

type Locale = keyof typeof content;

export function t(locale: string | undefined) {
  return content[(locale as Locale) ?? 'en'];
}

export function blogCollection(locale: string | undefined): 'blog-en' | 'blog-nl' {
  return locale === 'nl' ? 'blog-nl' : 'blog-en';
}
