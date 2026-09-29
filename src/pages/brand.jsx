import React from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Icon from '../components/Icon';
import {useLocaleText} from '../components/LocaleText';
import styles from './brand.module.css';

function Asset({variant, label, white, t}) {
  const stem = `/img/skyengine-logo-${variant}${white ? '-white' : ''}`;
  const svg = useBaseUrl(`${stem}.svg`),
    png = useBaseUrl(`${stem}.png`);
  return (
    <article className={styles.asset}>
      <div className={`${styles.preview} ${white ? styles.dark : ''}`}>
        <img
          src={svg}
          alt={`${label} · ${white ? t('white', '白色') : t('color', '彩色')}`}
          loading="lazy"
        />
      </div>
      <div className={styles.assetInfo}>
        <div>
          <h3>{label}</h3>
          <span>
            {white
              ? t('White / dark backgrounds', '白色版 · 深色背景')
              : t('Color / light backgrounds', '彩色版 · 浅色背景')}
          </span>
        </div>
        <div className={styles.downloads}>
          <a href={svg} download>
            <Icon name="download" size={14} />
            SVG
          </a>
          <a href={png} download>
            PNG
          </a>
        </div>
      </div>
    </article>
  );
}
export default function Brand() {
  const t = useLocaleText();
  const variants = [
    ['horizontal', t('Horizontal lockup', '横版组合')],
    ['icon', t('Symbol', '独立图标')],
    ['vertical', t('Vertical lockup', '竖版组合')],
    ['text', t('Wordmark', '独立字标')],
  ];
  return (
    <Layout
      title={t('Brand assets', '品牌资源')}
      description={t(
        'Download the SkyEngine logo system and learn about its visual identity.',
        '下载天工的完整 Logo 体系，了解标识设计与使用方式。',
      )}
    >
      <main className={`container ${styles.page}`}>
        <span className="eyebrow">SKYENGINE / IDENTITY</span>
        <h1>{t('Made for a connected world.', '为协同而生的标识。')}</h1>
        <p className="page-lead">
          {t(
            'The Chinese character 工, meaning work and manufacturing, sits within an open route. An amber workpiece connects the idea of making with the movement that makes it possible.',
            '以“工”为骨架，用开放的运输路径环绕。琥珀色的工件节点，将制造与流转连接起来，也呼应天工的生产与运输联合调度。',
          )}
        </p>
        <div className={styles.palette}>
          {[
            ['#087f72', t('Jade', '天工青')],
            ['#17312e', t('Ink', '墨绿')],
            ['#c38b40', t('Amber', '工件金')],
            ['#f6f8f5', t('Paper', '素白')],
          ].map(([color, name]) => (
            <div key={color}>
              <span style={{background: color}} />
              <div>
                <b>{name}</b>
                <code>{color.toUpperCase()}</code>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.assetGrid}>
          {[false, true].flatMap((white) =>
            variants.map(([variant, label]) => (
              <Asset key={`${variant}-${white}`} {...{variant, label, white, t}} />
            )),
          )}
        </div>
        <div className={styles.notes}>
          <h2>{t('A consistent mark, wherever it goes.', '在不同场景中，保持一致。')}</h2>
          <p>
            {t(
              'Use the wordmark in navigation, the horizontal logo on the homepage and in presentations, the symbol for avatars and small spaces, and the vertical logo on covers. White variants are designed for dark backgrounds. SVG wordmarks are outlined; PNG files have transparent backgrounds.',
              '导航使用独立字标，首页和演示使用横版组合，头像和小尺寸空间使用图标，封面使用竖版组合。深色背景请使用白色版本。SVG 字标已转为路径，PNG 均保留透明背景。',
            )}
          </p>
          <p>
            {t(
              'Keep clear space of at least one quarter of the symbol width. Do not stretch, rotate, or recolor individual parts. Use the symbol at 24 px or larger, and the horizontal logo at 140 px or larger.',
              '四周至少保留图标宽度四分之一的留白。不要拉伸、旋转或单独更改局部颜色。独立图标建议不小于 24 px，横版组合建议不小于 140 px。',
            )}
          </p>
        </div>
      </main>
    </Layout>
  );
}
