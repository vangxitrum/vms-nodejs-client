import AttributeType from './AttributeType.js';
import UploadToken from './UploadToken.js';

export default class TokenListResponse {
  'data': Array<UploadToken>;
  'total': number;

  static readonly discriminator?: string = undefined;

  static readonly attributeTypeMap: Array<AttributeType> = [
    {
      name: 'data',
      baseName: 'data',
      type: 'Array<UploadToken>',
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
    return TokenListResponse.attributeTypeMap;
  }
}
