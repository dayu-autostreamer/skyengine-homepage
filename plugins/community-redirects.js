export const communityRedirects = [
  {from: 'docs/community/', to: 'community/'},
  {from: 'docs/community/contributing/', to: 'community/contributing/'},
  {
    from: 'docs/community/contact/',
    to: 'community/support/',
    defaultHash: '#project-contact',
    anchors: {
      contact: 'project-contact',
      'contact-us': 'project-contact',
      联系我们: 'project-contact',
    },
  },
];

export default function communityRedirectsPlugin({baseUrl}) {
  return {
    name: 'skyengine-community-redirects',
    async contentLoaded({actions}) {
      for (const {from, to, ...options} of communityRedirects) {
        const data = await actions.createData(
          `${from.replaceAll('/', '-')}.json`,
          JSON.stringify({to: baseUrl + to, ...options}),
        );
        actions.addRoute({
          path: baseUrl + from,
          exact: true,
          component: '@site/src/components/CommunityRedirect/index.jsx',
          modules: {redirectData: data},
        });
      }
    },
  };
}
