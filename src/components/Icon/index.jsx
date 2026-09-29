import React from 'react';

const paths = {
  arrow: 'M4 12h16m-6-6 6 6-6 6',
  cube: 'm12 3 9 5-9 5-9-5 9-5Zm-9 5v9l9 5 9-5V8M12 13v9',
  route: 'M6 5h8a4 4 0 0 1 0 8h-4a4 4 0 0 0 0 8h8M3 2h6v6H3zM18 18h3v3h-3z',
  chart: 'M4 3v17h17M8 15l4-5 4 2 5-7',
  book: 'M12 6v15M3 4h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5v15h-5a4 4 0 0 0-4 2 4 4 0 0 0-4-2H3V4Z',
  code: 'm8 5-7 7 7 7m8-14 7 7-7 7m-3-16-2 20',
  layers: 'm12 3 10 5-10 5L2 8l10-5ZM2 13l10 5 10-5M2 18l10 5 10-5',
  download: 'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5',
  pause: 'M8 5v14M16 5v14',
  play: 'm8 4 12 8-12 8V4Z',
  github:
    'M9 19c-4 1-4-2-6-2m12 5v-4a3.5 3.5 0 0 0-1-3c3-.3 6-1.5 6-6a5 5 0 0 0-1.4-3.5A4.6 4.6 0 0 0 18.5 2S17 1.7 14.8 3a13 13 0 0 0-6.6 0C6 1.7 4.5 2 4.5 2a4.6 4.6 0 0 0-.1 3.5A5 5 0 0 0 3 9c0 4.5 3 5.7 6 6a3.5 3.5 0 0 0-1 3v4',
};
export default function Icon({name, size = 22, ...props}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={paths[name] || paths.arrow} />
    </svg>
  );
}
