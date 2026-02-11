// @ts-expect-error він там є!
import { fillIconsRepository } from '@webitel/ui-sdk';

import admContactCenter from './adm-contact-center.svg?raw';
import admDirectory from './adm-directory.svg?raw';
import admIntegrations from './adm-integrations.svg?raw';
import admLicense from './adm-license.svg?raw';
import admLicenseUsers from './adm-license-users.svg?raw';
import admLookups from './adm-lookups.svg?raw';
import admMemberReset from './adm-member-reset.svg?raw';
import admPermissions from './adm-permissions.svg?raw';
import admRouting from './adm-routing.svg?raw';
import admSystem from './adm-system.svg?raw';
import admTriggerStart from './adm-trigger-start.svg?raw';

const icons = {
	'adm-contact-center': admContactCenter,
	'adm-directory': admDirectory,
	'adm-integrations': admIntegrations,
	'adm-license-users': admLicenseUsers,
	'adm-license': admLicense,
	'adm-lookups': admLookups,
	'adm-member-reset': admMemberReset,
	'adm-permissions': admPermissions,
	'adm-routing': admRouting,
	'adm-system': admSystem,
	'adm-trigger-start': admTriggerStart,
};

fillIconsRepository({
	icons: Object.entries(icons).map(([iconName, svg]) => ({
		iconName,
		svg,
	})),
});

export default icons;
