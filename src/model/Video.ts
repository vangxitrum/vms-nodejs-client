import AttributeType from './AttributeType.js';
import Metadata from './Metadata.js';
import VideoAssets from './VideoAssets.js';
import VideoSource from './VideoSource.js';

export default class Video {
  /**
   * The unique identifier of the video object.
   */
  'video_id': string;
  /**
   * When a video was created, presented in ISO-8601 format.
   */
  'created_at'?: Date;
  /**
   * The title of the video content.
   */
  'title'?: string;
  /**
   * A description for the video content.
   */
  'description'?: string;
  /**
   * The date and time the video was updated. Date and time are provided using ISO-8601 UTC format.
   */
  'updated_at'?: Date;
  /**
   * One array of tags (each tag is a string) in order to categorize a video. Tags may include spaces.
   */
  'tags'?: Array<string>;
  /**
   * The date and time the video was published. Date and time are provided using ISO-8601 UTC format.
   */
  'published_at'?: Date;
  /**
   * Metadata you can use to categorise and filter videos. Metadata is a list of dictionaries, where each dictionary represents a key value pair for categorising a video. [Dynamic Metadata](https://api.video/blog/endpoints/dynamic-metadata) allows you to define a key that allows any value pair.
   */
  'metadata'?: Array<Metadata>;
  'source'?: VideoSource;
  'assets'?: VideoAssets;
  /**
   * Defines if the content is publicly reachable or if a unique token is needed for each play session. Default is true. Tutorials on [private videos](https://api.video/blog/endpoints/private-videos).
   */
  'public'?: boolean;
  /**
   * Defines if video is panoramic.
   */
  'panoramic'?: boolean;
  /**
   * This lets you know whether mp4 is supported. If enabled, an mp4 URL will be provided in the response for the video.
   */
  'mp4_support'?: boolean;
  /**
   * This lets you know your video's qualities
   */
  'qualities'?: Array<string>;
  /**
   * This lets you know your video's duration
   */
  'duration'?: number;
  /**
   * This lets you know your video's size
   */
  'size'?: number;
  /**
   * This lets you know your video's view
   */
  'view'?: number;

  static readonly discriminator?: string = undefined;

  static readonly attributeTypeMap: Array<AttributeType> = [
    {
      name: 'video_id',
      baseName: 'video_id',
      type: 'string',
      format: '',
    },
    {
      name: 'created_at',
      baseName: 'created_at',
      type: 'Date',
      format: 'date-time',
    },
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
      name: 'published_at',
      baseName: 'published_at',
      type: 'Date',
      format: 'date-time',
    },
    {
      name: 'updated_at',
      baseName: 'updated_at',
      type: 'Date',
      format: 'date-time',
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
      name: 'duration',
      baseName: 'duration',
      type: 'number',
      format: '',
    },
    {
      name: 'size',
      baseName: 'size',
      type: 'number',
      format: '',
    },
    {
      name: 'view',
      baseName: 'view',
      type: 'number',
      format: '',
    },
    {
      name: 'metadata',
      baseName: 'metadata',
      type: 'Array<Metadata>',
      format: '',
    },
    {
      name: 'source',
      baseName: 'source',
      type: 'VideoSource',
      format: '',
    },
    {
      name: 'assets',
      baseName: 'assets',
      type: 'VideoAssets',
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
    return Video.attributeTypeMap;
  }
}
