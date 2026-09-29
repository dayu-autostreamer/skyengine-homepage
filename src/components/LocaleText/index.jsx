import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

/** Local copy stays paired at its point of use. Markdown uses native Docusaurus i18n. */
export function useLocaleText() {
  const {
    i18n: {currentLocale},
  } = useDocusaurusContext();
  return (en, zh) => (currentLocale === 'zh' ? zh : en);
}
