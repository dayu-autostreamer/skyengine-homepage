import React from 'react';
import Layout from '@theme/Layout';
import {useLocaleText} from '../LocaleText';

export default function EmptyBlog() {
  const t = useLocaleText();
  return (
    <Layout
      title={t('Blog', '博客')}
      description={t(
        'Project updates and research notes from SkyEngine.',
        '天工的项目动态与研究笔记。',
      )}
    >
      <main className="empty-page container">
        <h1>{t('Blog', '博客')}</h1>
      </main>
    </Layout>
  );
}
