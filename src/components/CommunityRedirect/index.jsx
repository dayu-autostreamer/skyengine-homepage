import React from 'react';
import Head from '@docusaurus/Head';
import {Redirect, useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useLocaleText} from '../LocaleText';

export default function CommunityRedirect({redirectData: {to, defaultHash = '', anchors = {}}}) {
  const t = useLocaleText();
  const {siteConfig} = useDocusaurusContext();
  const {search, hash} = useLocation();
  let anchor = hash.slice(1);
  try {
    anchor = decodeURIComponent(anchor);
  } catch {
    // Keep malformed fragments intact.
  }
  const fragment = Object.hasOwn(anchors, anchor) ? `#${anchors[anchor]}` : hash || defaultHash;
  const destination = to + search + fragment;

  return (
    <>
      <Head>
        <title>{t('SkyEngine Community', '天工社区')}</title>
        <link rel="canonical" href={siteConfig.url + to} />
        <meta name="robots" content="noindex, follow" />
      </Head>
      <Redirect to={destination} />
      <main className="container margin-vert--lg">
        <h1>{t('SkyEngine Community', '天工社区')}</h1>
        <a href={destination}>{t('Continue to the community page', '进入社区页面')}</a>
      </main>
    </>
  );
}
