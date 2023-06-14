import AttributeType from './AttributeType.js';

export default class Metadata {
  /**
   * The constant that defines the data set.
   */
  'key'?: string;
  /**
   * A variable which belongs to the data set.
   */
  'value'?: string;

  static readonly discriminator?: string = undefined;

  static readonly attributeTypeMap: Array<AttributeType> = [
    {
      name: 'key',
      baseName: 'key',
      type: 'string',
      format: '',
    },
    {
      name: 'value',
      baseName: 'value',
      type: 'string',
      format: '',
    },
  ];

  static getAttributeTypeMap(): Array<AttributeType> {
    return Metadata.attributeTypeMap;
  }
}
