export const SingleSignOnType = {
  FACEBOOK: 'facebook',
  OPENID: 'openid',
}

export type SingleSignOnType = (typeof SingleSignOnType)[keyof typeof SingleSignOnType];
