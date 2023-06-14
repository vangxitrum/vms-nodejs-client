import AttributeType from './AttributeType.js';

export default class TokenCreationPayload {
  /**
   * Time in seconds that the token will be active. A value of 0 means that the token has no exipration date. The default is to have no expiration.
   */
  'ttl'?: number;

  static readonly discriminator?: string = undefined;

  static readonly attributeTypeMap: Array<AttributeType> = [
    {
      name: 'ttl',
      baseName: 'ttl',
      type: 'number',
      format: '',
    },
  ];

  static getAttributeTypeMap(): Array<AttributeType> {
    return TokenCreationPayload.attributeTypeMap;
  }
}
