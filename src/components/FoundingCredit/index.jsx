import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import data from '@site/src/data/community.json';
import {useLocaleText} from '../LocaleText';
import styles from './styles.module.css';

export default function FoundingCredit({showCommunityLink = false}) {
  const t = useLocaleText();

  return (
    <aside className={styles.credit} aria-label={t('Project origins', '项目发起团队')}>
      <Link
        className={styles.logo}
        href={data.origin.institution.url}
        aria-label={t('Nanjing University website', '南京大学官网')}
      >
        <img
          src={useBaseUrl('/img/community/nanjing-university.jpg')}
          alt={t('Nanjing University', '南京大学')}
          width="440"
          height="140"
        />
      </Link>
      <div className={styles.text}>
        <p className={styles.origin}>
          {t(
            <>
              Founded by <Link href={data.origin.laboratory.url}>Dislab</Link> at{' '}
              <Link href={data.origin.institution.url}>Nanjing University</Link>
            </>,
            <>
              由<Link href={data.origin.institution.url}>南京大学</Link>{' '}
              <Link href={data.origin.laboratory.url}>Dislab</Link> 发起
            </>,
          )}
        </p>
        <p className={styles.welcome}>
          {t(
            'Contributions from academia, industry, and independent developers are welcome.',
            '欢迎高校、企业及独立开发者参与贡献。',
          )}
        </p>
        {showCommunityLink && (
          <Link className={styles.join} to="/community/">
            {t('Join the community →', '参与社区 →')}
          </Link>
        )}
      </div>
    </aside>
  );
}
