import React from 'react';
import data from '@site/src/data/community.json';
import {useLocaleText} from '../LocaleText';

export default function CommunityContacts() {
  const t = useLocaleText();

  return (
    <ul>
      {data.contacts.map(({id, email}) => {
        const person = data.people.find((member) => member.id === id);
        return (
          <li key={id}>
            <strong>{t(person.name.en, person.name.zh)}</strong>
            {' — '}
            <a href={`mailto:${email}`}>{email}</a>
          </li>
        );
      })}
    </ul>
  );
}
