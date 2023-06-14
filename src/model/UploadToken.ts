import AttributeType from './AttributeType.js';

export default class UploadToken {
  /**
   * The unique identifier for the token you will use to authenticate an upload.
   */
  'value'?: string;
  /**
   * Time-to-live - how long the upload token is valid for.
   */
  'ttl'?: number;
  /**
   * When the token was created, displayed in ISO-8601 format.
   */
  'created_at'?: Date;
  /**
   * When the token expires, displayed in ISO-8601 format.
   */
  'expired_at'?: Date;

  static readonly discriminator?: string = undefined;

  static readonly attributeTypeMap: Array<AttributeType> = [
    {
      name: 'value',
      baseName: 'value',
      type: 'string',
      format: '',
    },
    {
      name: 'ttl',
      baseName: 'ttl',
      type: 'number',
      format: '',
    },
    {
      name: 'created_at',
      baseName: 'created_at',
      type: 'Date',
      format: 'date-time',
    },
    {
      name: 'expired_at',
      baseName: 'expired_at',
      type: 'Date',
      format: 'date-time',
    },
  ];

  static getAttributeTypeMap(): Array<AttributeType> {
    return UploadToken.attributeTypeMap;
  }
}
