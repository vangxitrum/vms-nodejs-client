import AttributeType from './AttributeType.js';
import UploadToken from './UploadToken.js';

export default class TokenListResponse {
  'upload_tokens': Array<UploadToken>;
  'total': number;

  static readonly discriminator?: string = undefined;

  static readonly attributeTypeMap: Array<AttributeType> = [
    {
      name: 'upload_tokens',
      baseName: 'upload_tokens',
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
