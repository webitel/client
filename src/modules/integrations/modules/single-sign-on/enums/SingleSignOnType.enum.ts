export const SingleSignOnType = {
	Facebook: 'facebook',
	OpenId: 'openid',
};

export type SingleSignOnType =
	(typeof SingleSignOnType)[keyof typeof SingleSignOnType];
