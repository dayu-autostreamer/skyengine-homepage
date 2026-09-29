import React from 'react';
import clsx from 'clsx';
import FactoryIllustration from '@site/static/img/skyengine-factory.svg';
import SchedulingIllustration from '@site/static/img/skyengine-scheduling.svg';
import ExperimentsIllustration from '@site/static/img/skyengine-experiments.svg';
import {useLocaleText} from '../LocaleText';
import styles from './styles.module.css';

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} aria-hidden="true" focusable="false" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  const t = useLocaleText();
  const features = [
    {
      Svg: FactoryIllustration,
      title: t('Flexible Manufacturing Simulation', '柔性制造仿真'),
      description: t(
        'SkyEngine models jobs, machines, AGVs, and material flow in a shared factory environment, supporting finite buffers and dynamic disturbances for realistic scheduling experiments.',
        '天工将作业、机器、AGV 与物料流转纳入统一的工厂环境，支持有限缓冲与动态扰动，为制造调度研究提供贴近实际约束的仿真场景。',
      ),
    },
    {
      Svg: SchedulingIllustration,
      title: t('Joint Production-Transport Scheduling', '生产运输联合调度'),
      description: t(
        'Connect process scheduling, task assignment, and path planning through pluggable algorithm components. Explore coordinated decisions across production and transport.',
        '通过可插拔的算法组件，连接工序调度、任务分配与路径规划，灵活组合不同策略，探索生产与运输之间的协同决策。',
      ),
    },
    {
      Svg: ExperimentsIllustration,
      title: t('Algorithm Experiments & Analysis', '算法实验与分析'),
      description: t(
        'Train, tune, and test algorithms in a unified experiment workflow. Compare dataset results, monitor runs, inspect event logs, and replay the decisions behind each simulation.',
        '在统一实验流程中训练、调优和测试算法，比较数据集结果，监控运行状态，结合事件日志与回放分析每次仿真背后的调度决策。',
      ),
    },
  ];

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {features.map((feature) => (
            <Feature key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
