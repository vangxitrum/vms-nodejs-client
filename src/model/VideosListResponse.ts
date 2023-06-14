import AttributeType from './AttributeType.js';
import Video from './Video.js';

export default class VideosListResponse {
  'videos': Array<Video>;
  'total': number;

  static readonly discriminator?: string = undefined;

  static readonly attributeTypeMap: Array<AttributeType> = [
    {
      name: 'videos',
      baseName: 'videos',
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
