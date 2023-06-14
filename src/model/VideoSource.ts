import AttributeType from './AttributeType.js';

/**
 * Source information about the video.
 */
export default class VideoSource {
  /**
   * The URL where the video is stored.
   */
  'uri'?: string;
  'type'?: string;

  static readonly discriminator?: string = undefined;

  static readonly attributeTypeMap: Array<AttributeType> = [
    {
      name: 'uri',
      baseName: 'uri',
      type: 'string',
      format: '',
    },
    {
      name: 'type',
      baseName: 'type',
      type: 'string',
      format: '',
    },
  ];

  static getAttributeTypeMap(): Array<AttributeType> {
    return VideoSource.attributeTypeMap;
  }
}
