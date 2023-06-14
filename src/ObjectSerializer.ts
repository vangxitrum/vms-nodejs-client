import AuthenticatePayload from './model/AuthenticatePayload';
import BadRequest from './model/BadRequest';
import BytesRange from './model/BytesRange';
import Metadata from './model/Metadata';
import NotFound from './model/NotFound';
import TokenCreationPayload from './model/TokenCreationPayload';
import TokenListResponse from './model/TokenListResponse';
import UploadToken from './model/UploadToken';
import Video from './model/Video';
import VideoAssets from './model/VideoAssets';
import VideoCreationPayload from './model/VideoCreationPayload';
import VideoSource from './model/VideoSource';
import VideoThumbnailPickPayload from './model/VideoThumbnailPickPayload';
import VideoUpdatePayload from './model/VideoUpdatePayload';
import VideosListResponse from './model/VideosListResponse';
import Webhook from './model/Webhook';
import WebhooksCreationPayload from './model/WebhooksCreationPayload';
import WebhooksListResponse from './model/WebhooksListResponse';
import HttpResponse  from './model/HttpResponse';

/* tslint:disable:no-unused-variable */
const primitives = [
  'string',
  'boolean',
  'double',
  'integer',
  'long',
  'float',
  'number',
  'any',
];

const supportedMediaTypes: { [mediaType: string]: number } = {
  'application/json': Infinity,
  'application/octet-stream': 0,
};

const enumsMap: Set<string> = new Set<string>([
  'QualityTypeEnum',
  'QualityQualityEnum',
  'QualityStatusEnum',
  'VideoStatusIngestStatusEnum',
]);

const typeMap: { [index: string]: any } = {
  AuthenticatePayload: AuthenticatePayload,
  BadRequest: BadRequest,
  BytesRange: BytesRange,
  Metadata: Metadata,
  NotFound: NotFound,
  TokenCreationPayload: TokenCreationPayload,
  TokenListResponse: TokenListResponse,
  UploadToken: UploadToken,
  Video: Video,
  VideoAssets: VideoAssets,
  VideoCreationPayload: VideoCreationPayload,
  VideoSource: VideoSource,
  VideoThumbnailPickPayload: VideoThumbnailPickPayload,
  VideoUpdatePayload: VideoUpdatePayload,
  VideosListResponse: VideosListResponse,
  Webhook: Webhook,
  WebhooksCreationPayload: WebhooksCreationPayload,
  WebhooksListResponse: WebhooksListResponse,
  HttpResponse: HttpResponse,
};

export default class ObjectSerializer {
  public static findCorrectType(data: any, expectedType: string): string {
    // Check the discriminator
    if (typeMap[expectedType]) {
      const discriminatorProperty = typeMap[expectedType].discriminator;
      if (discriminatorProperty && data[discriminatorProperty]) {
        const discriminatorType = data[discriminatorProperty];
        if (typeMap[discriminatorType]) {
          return discriminatorType; // use the type given in the discriminator
        }
      }
    }

    return expectedType;
  }

  public static serialize(data: any, type: string, format: string): any {
    if (data == undefined) {
      return data;
    } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
      return data;
    } else if (type.lastIndexOf('Array<', 0) === 0) {
      // string.startsWith pre es6
      let subType: string = type.replace('Array<', ''); // Array<Type> => Type>
      subType = subType.substring(0, subType.length - 1); // Type> => Type
      const transformedData: any[] = [];
      for (const index in data) {
        const date = data[index];
        transformedData.push(ObjectSerializer.serialize(date, subType, format));
      }
      return transformedData;
    } else if (type === 'Date') {
      if (format == 'date') {
        let month = data.getMonth() + 1;
        month = month < 10 ? '0' + month.toString() : month.toString();
        let day = data.getDate();
        day = day < 10 ? '0' + day.toString() : day.toString();

        return data.getFullYear() + '-' + month + '-' + day;
      } else {
        return data.toISOString();
      }
    } else {
      if (enumsMap.has(type)) {
        return data;
      }
      if (!typeMap[type]) {
        // in case we dont know the type
        return data;
      }

      // Get the actual type of this object
      type = this.findCorrectType(data, type);

      // get the map for the correct type.
      const attributeTypes = typeMap[type].getAttributeTypeMap();
      const instance: { [index: string]: any } = {};
      for (const index in attributeTypes) {
        const attributeType = attributeTypes[index];
        instance[attributeType.baseName] = ObjectSerializer.serialize(
          data[attributeType.name],
          attributeType.type,
          attributeType.format
        );
      }
      return instance;
    }
  }

  public static deserialize(data: any, type: string, format: string): any {
      if (!typeMap[type]) {
        return data
      }
      
      const instance = new typeMap[type]();
      const attributeTypes = typeMap[type].getAttributeTypeMap();
      for (const index in attributeTypes) {
        const attributeType = attributeTypes[index];
        instance[attributeType.name] = ObjectSerializer.deserialize(
          data[attributeType.baseName],
          attributeType.type,
          attributeType.format
        );
      }
      return instance;
  }

  /**
   * Normalize media type
   *
   * We currently do not handle any media types attributes, i.e. anything
   * after a semicolon. All content is assumed to be UTF-8 compatible.
   */
  public static normalizeMediaType(
    mediaType: string | undefined
  ): string | undefined {
    if (mediaType === undefined) {
      return undefined;
    }
    return mediaType.split(';')[0].trim().toLowerCase();
  }

  /**
   * From a list of possible media types, choose the one we can handle best.
   *
   * The order of the given media types does not have any impact on the choice
   * made.
   */
  public static getPreferredMediaType(mediaTypes: Array<string>): string {
    /** According to OAS 3 we should default to json */
    if (!mediaTypes) {
      return 'application/json';
    }

    const normalMediaTypes = mediaTypes
      .map(this.normalizeMediaType)
      .filter((mt) => mt);
    let selectedMediaType: string | undefined = undefined;
    let selectedRank = -Infinity;
    for (const mediaType of normalMediaTypes) {
      if (supportedMediaTypes[mediaType!] > selectedRank) {
        selectedMediaType = mediaType;
        selectedRank = supportedMediaTypes[mediaType!];
      }
    }

    if (selectedMediaType === undefined) {
      throw new Error(
        'None of the given media types are supported: ' + mediaTypes.join(', ')
      );
    }

    return selectedMediaType!;
  }

  /**
   * Convert data to a string according the given media type
   */
  public static stringify(data: any, mediaType: string): string {
    if (mediaType === 'application/json') {
      return JSON.stringify(data);
    }

    // HTTP DELETE response.
    if (data === '') {
      return data;
    }

    throw new Error(
      'The mediaType ' +
        mediaType +
        ' is not supported by ObjectSerializer.stringify.'
    );
  }

  /**
   * Parse data from a string according to the given media type
   */
  public static parse(rawData: string): any {
    return JSON.parse(rawData);
  //   if (mediaType === undefined) { 
  //     // HTTP DELETE response.
  //     if (rawData === '') {
  //       return rawData;
  //     }

  //     throw new Error('Cannot parse content. No Content-Type defined.');
  //   }

  //   if (
  //     mediaType === 'application/json' ||
  //     mediaType.indexOf('application/vnd.api.video+json;version=') === 0
  //   ) {
  //     return JSON.parse(rawData);
  //   }

  //   throw new Error(
  //     'The mediaType ' +
  //       mediaType +
  //       ' is not supported by ObjectSerializer.parse.'
  //   );
  // }
  }
}
