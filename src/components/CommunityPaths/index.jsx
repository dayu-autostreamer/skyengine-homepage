import React from 'react';
import Link from '@docusaurus/Link';
import {useLocaleText} from '../LocaleText';
import styles from './styles.module.css';

export default function CommunityPaths() {
  const t = useLocaleText();
  const paths = [
    {
      path: 'contributing',
      title: t('Contribute', '参与贡献'),
      description: t(
        'Start with feedback, documentation, experiments, or code.',
        '从问题反馈、文档、实验或代码开始。',
      ),
    },
    {
      path: 'committee',
      title: t('Meet the team', '认识维护团队'),
      description: t('Meet the project chair and maintainers.', '了解项目主席、维护者及其职责。'),
    },
    {
      path: 'support',
      title: t('Get help', '寻求帮助'),
      description: t(
        'Find support and research collaboration contacts.',
        '找到使用咨询、问题反馈与研究合作入口。',
      ),
    },
  ];

  return (
    <div className={styles.paths}>
      {paths.map(({path, title, description}) => (
        <Link className={styles.card} to={`/community/${path}/`} key={path}>
          <strong>
            {title}
            <span aria-hidden="true"> →</span>
          </strong>
          <span>{description}</span>
        </Link>
      ))}
    </div>
  );
}
