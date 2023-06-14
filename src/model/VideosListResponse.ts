import AttributeType from './AttributeType.js';
import Video from './Video.js';

export default class VideosListResponse {
  'data': Array<Video>;
  'total': number;

  static readonly discriminator?: string = undefined;

  static readonly attributeTypeMap: Array<AttributeType> = [
    {
      name: 'data',
      baseName: 'data',
      type: 'Array<Video>',
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
    return VideosListResponse.attributeTypeMap;
  }
}
