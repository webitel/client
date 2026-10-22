/** [Claude] `type` query of a new gateway card, set by the create popup */
export const GatewayType = {
	Register: 'reg',
	Trunking: 'trunk',
} as const;

export type GatewayType = (typeof GatewayType)[keyof typeof GatewayType];
