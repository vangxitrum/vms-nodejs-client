import AttributeType from './AttributeType.js';

export default class AuthenticatePayload {
  /**
   * Your account API key. You can use your sandbox API key, or you can use your production API key.
   */
  'apiKey': string;

  static readonly discriminator?: string = undefined;

  static readonly attributeTypeMap: Array<AttributeType> = [
    {
      name: 'apiKey',
      baseName: 'apiKey',
      type: 'string',
      format: '',
    },
    {
      name: 'apiSecret',
      baseName: 'apiSecret',
      type: 'string',
      format: '',
    },
  ];

  static getAttributeTypeMap(): Array<AttributeType> {
    return AuthenticatePayload.attributeTypeMap;
  }
}