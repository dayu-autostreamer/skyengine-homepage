import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import HomepageFeatures from '../components/HomepageFeatures';
import FoundingCredit from '../components/FoundingCredit';
import {useLocaleText} from '../components/LocaleText';
import styles from './index.module.css';

function HomepageHeader() {
  const t = useLocaleText();
  return (
    <header className={clsx('hero', styles.heroBackground)}>
      <div className={clsx('container', styles.heroInner)}>
        <ThemedImage
          className={styles.heroLogo}
          alt={t('SkyEngine logo', '天工 SkyEngine 标识')}
          sources={{
            light: useBaseUrl('/img/skyengine-logo-horizontal.svg'),
            dark: useBaseUrl('/img/skyengine-logo-horizontal-white.svg'),
          }}
        />
        <p className={clsx('hero__subtitle', styles.heroSubtitle)}>
          {t(
            'An open platform for manufacturing simulation and joint production-transport scheduling.',
            '面向柔性制造仿真与生产运输联合调度的开放平台。',
          )}
        </p>
        <FoundingCredit showCommunityLink />
        <div className={styles.buttons}>
          <div className="margin-horiz--sm">
            <Link
              className="button button--secondary button--lg"
              to="https://github.com/dayu-autostreamer/skyengine"
            >
              GitHub
            </Link>
          </div>
          <div className="margin-horiz--sm">
            <Link
              className="button button--secondary button--lg"
              to="https://github.com/dayu-autostreamer/skyengine/archive/refs/heads/main.zip"
            >
              {t('Download', '下载')}
            </Link>
          </div>
          <div className="margin-horiz--sm">
            <Link className="button button--secondary button--lg" to="/docs/">
              {t('Get Started', '开始使用')}
            </Link>
          </div>
        </div>
      </div>
      <ThemedImage
        className={styles.heroWave}
        alt=""
        aria-hidden="true"
        sources={{
          light: useBaseUrl('/img/bg-wave-light.svg'),
          dark: useBaseUrl('/img/bg-wave-dark.svg'),
        }}
      />
    </header>
  );
}

export default function Home() {
  const t = useLocaleText();
  return (
    <Layout
      title={t('Manufacturing Simulation & Scheduling', '柔性制造仿真与调度平台')}
      description={t(
        'SkyEngine brings factory simulation, pluggable scheduling algorithms, and experiment analysis together in an open platform.',
        '天工将工厂仿真、可插拔调度算法和实验分析融为一体，为柔性制造研究与演示提供共同环境。',
      )}
    >
      <HomepageHeader />
      <main>
        <h1 className={styles.visuallyHidden}>
          {t('SkyEngine — Manufacturing Simulation & Scheduling', '天工 — 柔性制造仿真与调度平台')}
        </h1>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
