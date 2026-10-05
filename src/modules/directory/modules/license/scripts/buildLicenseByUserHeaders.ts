import type { ApiLicenseV1 } from '@webitel/api-services/gen/models';
import type { DatalistTableHeader } from '@webitel/ui-datalist';
import { FormatDateMode } from '@webitel/ui-sdk/enums';
import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';
import { formatDate } from '@webitel/ui-sdk/utils';

import { byUserStaticHeaders } from '../stores/datalist/_internals/byUserStaticHeaders';

export const buildLicenseByUserHeaders = (
	licenses: ApiLicenseV1[],
	previousHeaders: DatalistTableHeader[] = [],
): DatalistTableHeader[] => {
	const freshHeaders: DatalistTableHeader[] = [
		...byUserStaticHeaders,
		...licenses.map(({ id, name, product, notAfter }, index) => ({
			value: id as string,
			name: product,
			text: (name || product || '').concat(
				` (${formatDate(+(notAfter ?? 0), FormatDateMode.DATE)})`,
			),
			field: `license.${id}`,
			show: index < 5,
			sort: SortSymbols.NONE,
		})),
	];

	const freshByField = new Map(
		freshHeaders.map((header) => [
			header.field,
			header,
		]),
	);
	const previousFields = new Set(previousHeaders.map((header) => header.field));

	/* keep the user's column order, show/width/sort; drop fields no longer returned by the API */
	const restoredHeaders = previousHeaders.flatMap((previous) => {
		const fresh = freshByField.get(previous.field);
		if (!fresh) return [];

		return [
			{
				...fresh,
				show: previous.show,
				width: previous.width,
				sort: previous.sort,
			},
		];
	});

	const newHeaders = freshHeaders.filter(
		(header) => !previousFields.has(header.field),
	);

	return [
		...restoredHeaders,
		...newHeaders,
	];
};
