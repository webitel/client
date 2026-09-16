import type { ApiLicenseV1 } from '@webitel/api-services/gen/models';
import type { DatalistTableHeader } from '@webitel/ui-datalist';
import { FormatDateMode } from '@webitel/ui-sdk/enums';
import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';
import { formatDate } from '@webitel/ui-sdk/utils';

import { byUserStaticHeaders } from '../stores/datalist/_internals/byUserStaticHeaders';

export const buildLicenseByUserHeaders = (
	licenses: ApiLicenseV1[],
): DatalistTableHeader[] => {
	const licenseHeaders: DatalistTableHeader[] = licenses.map(
		({ id, name, product, notAfter }, index) => ({
			value: id as string,
			name: product,
			text: (name || product || '').concat(
				` (${formatDate(+(notAfter ?? 0), FormatDateMode.DATE)})`,
			),
			field: `license.${id}`,
			show: index < 5,
			sort: SortSymbols.NONE,
		}),
	);

	return [
		...byUserStaticHeaders,
		...licenseHeaders,
	];
};
