import React from 'react';
import OriginalDocsVersionDropdown from '@theme-original/NavbarItem/DocsVersionDropdownNavbarItem';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import {
  useVersions,
  useActiveDocContext,
  useDocsPreferredVersion,
} from '@docusaurus/plugin-content-docs/client';
import {useHistorySelector} from '@docusaurus/theme-common';
import {translate} from '@docusaurus/Translate';

function SingleVersionDropdown({
  version,
  docsPluginId,
  mobile,
  dropdownActiveClassDisabled,
  dropdownItemsBefore,
  dropdownItemsAfter,
  versions,
  ...props
}) {
  const context = useActiveDocContext(docsPluginId);
  const {savePreferredVersionName} = useDocsPreferredVersion(docsPluginId);
  const suffix = useHistorySelector(({location}) => `${location.search}${location.hash}`);
  const currentDoc =
    context.alternateDocVersions[version.name] ??
    version.docs.find(({id}) => id === version.mainDocId);

  return (
    <DropdownNavbarItem
      {...props}
      mobile={mobile}
      label={
        mobile
          ? translate({id: 'theme.navbar.mobileVersionsDropdown.label', message: 'Versions'})
          : version.label
      }
      to={mobile ? undefined : currentDoc.path}
      isActive={dropdownActiveClassDisabled ? () => false : undefined}
      items={[
        {
          label: version.label,
          to: `${currentDoc.path}${suffix}`,
          isActive: () => context.activeVersion === version,
          onClick: () => savePreferredVersionName(version.name),
        },
      ]}
    />
  );
}

export default function DocsVersionDropdownNavbarItem(props) {
  const {activeDoc: communityDoc} = useActiveDocContext('community');
  const versions = useVersions(props.docsPluginId);
  if (communityDoc) return null;
  // Classic renders a plain link for one version; keep the same dropdown UI as Dayu.
  // Use the built-in component for multiple versions or custom menu entries.
  if (
    versions.length !== 1 ||
    props.versions ||
    props.dropdownItemsBefore?.length ||
    props.dropdownItemsAfter?.length
  ) {
    return <OriginalDocsVersionDropdown {...props} />;
  }
  return <SingleVersionDropdown {...props} version={versions[0]} />;
}
