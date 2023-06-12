import AttributeType from './AttributeType.js';

export default class AccessToken {
  /**
   * The access token containing security credentials allowing you to acccess the API. The token lasts for one hour.
   */
  'accessToken'?: string;
  /**
   * The type of token you have.
   */
  'tokenType'?: string;
  /**
   * A token you can use to get the next access token when your current access token expires.
   */
  'refreshToken'?: string;
  /**
   * Lists the time in seconds when your access token expires. It lasts for one hour.
   */
  'expiresIn'?: number;

  static readonly discriminator?: string = undefined;

  static readonly attributeTypeMap: Array<AttributeType> = [
    {
      name: 'accessToken',
      baseName: 'access_token',
      type: 'string',
      format: '',
    },
    {
      name: 'tokenType',
      baseName: 'token_type',
      type: 'string',
      format: '',
    },
    {
      name: 'refreshToken',
      baseName: 'refresh_token',
      type: 'string',
      format: '',
    },
    {
      name: 'expiresIn',
      baseName: 'expires_in',
      type: 'number',
      format: '',
    },
  ];

  static getAttributeTypeMap(): Array<AttributeType> {
    return AccessToken.attributeTypeMap;
  }
}