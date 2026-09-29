import React from 'react';
import Link from '@docusaurus/Link';
import data from '@site/src/data/community.json';
import {useLocaleText} from '../LocaleText';

export default function CommunityMembers({role}) {
  const t = useLocaleText();
  const members = data.people.filter((person) => person.role === role);

  return (
    <table>
      <thead>
        <tr>
          <th scope="col">{t('Name', '姓名')}</th>
          <th scope="col">{t('Project role', '项目职责')}</th>
        </tr>
      </thead>
      <tbody>
        {members.map((person) => (
          <tr key={person.id}>
            <td>
              <Link href={person.url}>{t(person.name.en, person.name.zh)}</Link>
            </td>
            <td>{t(data.roles[person.role].en, data.roles[person.role].zh)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
