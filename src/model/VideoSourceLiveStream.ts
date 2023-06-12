/**
 * @api.video/nodejs-client
 * api.video is an API that encodes on the go to facilitate immediate playback, enhancing viewer streaming experiences across multiple devices and platforms. You can stream live or on-demand online videos within minutes.
 *
 * The version of the OpenAPI document: 1
 *
 *
 * NOTE: This class is auto generated.
 * Do not edit the class manually.
 */

import AttributeType from './AttributeType.js';
import VideoSourceLiveStreamLink from './VideoSourceLiveStreamLink.js';

/**
 * This appears if the video is from a Live Record.
 */
export default class VideoSourceLiveStream {
  /**
   * The unique identifier for the live stream.
   */
  'liveStreamId'?: string;
  'links'?: Array<VideoSourceLiveStreamLink>;

  static readonly discriminator?: string = undefined;

  static readonly attributeTypeMap: Array<AttributeType> = [
    {
      name: 'liveStreamId',
      baseName: 'liveStreamId',
      type: 'string',
      format: '',
    },
    {
      name: 'links',
      baseName: 'links',
      type: 'Array<VideoSourceLiveStreamLink>',
      format: '',
    },
  ];

  static getAttributeTypeMap(): Array<AttributeType> {
    return VideoSourceLiveStream.attributeTypeMap;
  }
}
