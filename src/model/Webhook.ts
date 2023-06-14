import AttributeType from './AttributeType.js';

export default class Webhook {
  /**
   * Unique identifier of the webhook
   */
  'id'?: string;
  /**
   * When an webhook was created, presented in ISO-8601 format.
   */
  'created_at'?: Date;
  /**
   * A list of events that will trigger the webhook.
   */
  'events'?: Array<string>;
  /**
   * URL of the webhook
   */
  'url'?: string;

  static readonly discriminator?: string = undefined;

  static readonly attributeTypeMap: Array<AttributeType> = [
    {
      name: 'id',
      baseName: 'id',
      type: 'string',
      format: '',
    },
    {
      name: 'created_at',
      baseName: 'created_at',
      type: 'Date',
      format: 'date-time',
    },
    {
      name: 'events',
      baseName: 'events',
      type: 'Array<string>',
      format: '',
    },
    {
      name: 'updated_at',
      baseName: 'updated_at',
      type: 'Date',
      format: 'date-time',
    },
    {
      name: 'url',
      baseName: 'url',
      type: 'string',
      format: '',
    },
  ];

  static getAttributeTypeMap(): Array<AttributeType> {
    return Webhook.attributeTypeMap;
  }
}
