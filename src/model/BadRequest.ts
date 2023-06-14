import AttributeType from './AttributeType.js';

export default class BadRequest {
  'type'?: string;
  'title'?: string;
  'name'?: string;
  'status'?: number;
  'problems'?: Array<BadRequest>;

  static readonly discriminator?: string = undefined;

  static readonly attributeTypeMap: Array<AttributeType> = [
    {
      name: 'type',
      baseName: 'type',
      type: 'string',
      format: '',
    },
    {
      name: 'title',
      baseName: 'title',
      type: 'string',
      format: '',
    },
    {
      name: 'name',
      baseName: 'name',
      type: 'string',
      format: '',
    },
    {
      name: 'status',
      baseName: 'status',
      type: 'number',
      format: '',
    },
    {
      name: 'problems',
      baseName: 'problems',
      type: 'Array<BadRequest>',
      format: '',
    },
  ];

  static getAttributeTypeMap(): Array<AttributeType> {
    return BadRequest.attributeTypeMap;
  }
}
