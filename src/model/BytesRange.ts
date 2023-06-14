import AttributeType from './AttributeType.js';

export default class BytesRange {
  /**
   * The starting point for the range of bytes for a chunk of a video.
   */
  'from'?: number;
  /**
   * The ending point for the range of bytes for a chunk of a video.
   */
  'to'?: number;
  /**
   * The total number of expected bytes.
   */
  'total'?: number;

  static readonly discriminator?: string = undefined;

  static readonly attributeTypeMap: Array<AttributeType> = [
    {
      name: 'from',
      baseName: 'from',
      type: 'number',
      format: '',
    },
    {
      name: 'to',
      baseName: 'to',
      type: 'number',
      format: '',
    },
    {
      name: 'total',
      baseName: 'total',
      type: 'number',
      format: '',
    },
  ];

  static getAttributeTypeMap(): Array<AttributeType> {
    return BytesRange.attributeTypeMap;
  }
}
