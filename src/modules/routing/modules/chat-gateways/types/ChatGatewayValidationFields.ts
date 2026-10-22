import type { RegleSchemaFieldStatus } from '@regle/schemas';
import type { ChatGatewayCard } from '@webitel/api-services/validations';
import type { CardValidationFields } from '@webitel/ui-datalist/card';

/** [Claude] a metadata field, or a webchat section with fields of its own */
type MetadataFieldStatus = RegleSchemaFieldStatus & {
	$fields?: Record<string, RegleSchemaFieldStatus>;
};

/**
 * [Claude] The card's validation statuses, as the tabs read them. The schema
 * keeps `metadata` loose (it is shared by every provider and keeps unknown
 * keys), so regle infers no named fields for it; they are spelled out here.
 */
export type ChatGatewayValidationFields = Omit<
	CardValidationFields<ChatGatewayCard>,
	'metadata'
> & {
	metadata?: {
		$fields?: Record<string, MetadataFieldStatus>;
	};
};
