import AttributeType from './AttributeType.js';
import Metadata from './Metadata.js';

export default class VideoCreationPayload {
  /**
   * The title of your new video.
  */
 'title': string;
 /**
  * A brief description of your video.
 */
'description'?: string;
 /**
  * A list of key value pairs that you use to provide metadata for your video. These pairs can be made dynamic, allowing you to segment your audience. Read more on [dynamic metadata](https://api.video/blog/endpoints/dynamic-metadata).
 */
'metadata'?: Array<Metadata>;
/**
 * A list of tags you want to use to describe your video.
 */
'tags'?: Array<string>;
  /**
   * This let you know your video's qualities
   */
  'qualities'?: Array<string>;
  /**
   * Whether your video can be viewed by everyone, or requires authentication to see it. A setting of false will require a unique token for each view. Default is true. Tutorials on [private videos](https://api.video/blog/endpoints/private-videos).
   */
  'public'?: boolean;
  /**
   * Indicates if your video is a 360/immersive video.
   */
  'panoramic'?: boolean;
  /**
   * Enables mp4 version in addition to streamed version.
   */
  'mp4_support'?: boolean;

  static readonly discriminator?: string = undefined;

  static readonly attributeTypeMap: Array<AttributeType> = [
    {
      name: 'title',
      baseName: 'title',
      type: 'string',
      format: '',
    },
    {
      name: 'description',
      baseName: 'description',
      type: 'string',
      format: '',
    },
    {
      name: 'metadata',
      baseName: 'metadata',
      type: 'Array<Metadata>',
      format: '',
    },
    {
      name: 'tags',
      baseName: 'tags',
      type: 'Array<string>',
      format: '',
    },
    {
      name: 'qualities',
      baseName: 'qualities',
      type: 'Array<string>',
      format: '',
    },
    {
      name: 'public',
      baseName: 'public',
      type: 'boolean',
      format: '',
    },
    {
      name: 'panoramic',
      baseName: 'panoramic',
      type: 'boolean',
      format: '',
    },
    {
      name: 'mp4_support',
      baseName: 'mp4_support',
      type: 'boolean',
      format: '',
    },
  ];

  static getAttributeTypeMap(): Array<AttributeType> {
    return VideoCreationPayload.attributeTypeMap;
  }
}
