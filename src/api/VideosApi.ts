import path from 'path';
import { existsSync, statSync, createReadStream } from 'fs';
import { URLSearchParams } from 'url';
import FormData from 'form-data';
import ObjectSerializer from '../ObjectSerializer';
import HttpClient, { QueryOptions } from '../HttpClient';
import Video from '../model/Video';
import HttpResponse from '../model/HttpResponse';
import VideoCreationPayload from '../model/VideoCreationPayload';
import VideoUpdatePayload from '../model/VideoUpdatePayload';
import VideosListResponse from '../model/VideosListResponse';
import { Readable } from 'stream';
import { readableToBuffer } from '../HttpClient';
import { error } from 'console';

export default class VideosApi {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

/**
   * Upload a video
   * @param videoData your video's infomation.
   * @param file The local path to the video you would like to upload.
   */
  public async upload(
    videoData: VideoCreationPayload,
    file: string
  ): Promise<Video | undefined> {
    const queryParams: QueryOptions = {};
    queryParams.headers = {};
    if (videoData === null || videoData === undefined) {
      throw new Error(
        'Required parameter videoId was null or undefined when calling upload.'
      );
    }
    if (!existsSync(file)) {
      throw new Error(`${file} must be a readable source file`);
    }
    // Path Params
    const localVarPath = 'api/videos/upload'

    queryParams.method = 'POST';

    const formData = new FormData();
    if (videoData.title === undefined) {
      formData.append('title', videoData.title);
    }
    if (videoData.description !== undefined) {
      formData.append('description', videoData.description);
    }
    if (videoData.tags !== undefined) {
      formData.append('tags', JSON.stringify(videoData.tags));
    }
    if (videoData.qualities !== undefined) {
      formData.append('qualities', JSON.stringify(videoData.qualities));
    }
    if (videoData.public === undefined) {
      videoData.public = true; 
    }
    formData.append('public', JSON.stringify(videoData.public));
    if (videoData.panoramic === undefined) {
      videoData.panoramic = false; 
    }
    formData.append('panoramic', JSON.stringify(videoData.panoramic));
    if (videoData.mp4_support === undefined) {
      videoData.mp4_support = false;
    }
    formData.append('mp4_support', JSON.stringify(videoData.mp4_support));
    formData.append('file', createReadStream(file));

    queryParams.body = formData;
    const call = this.httpClient.call(localVarPath, queryParams);
    
    return call.then(
      (response) => {
        let result = ObjectSerializer.deserialize(
          JSON.parse(response.body),
          'HttpResponse',
          ''
        ) as HttpResponse

        if (result.status == 'success'){
          return ObjectSerializer.deserialize(
            JSON.parse(JSON.stringify(result.data)),
            'Video',
            ''
          ) as Video
        }

        return undefined;
      }
    );
  }
  /**
   * This method allows you to send a video using an upload token. Upload tokens are especially useful when the upload is done from the client side. If you want to upload a video from your server-side application, you'd better use the [standard upload method](#upload).
   * Upload with an upload token
   * @param uploadToken The unique identifier for the token you want to use to upload a video.
   * @param uploadToken Your video's infomation.
   * @param file The local path to the video you want to upload.
   */
  public async uploadWithUploadToken(
    uploadToken: string,
    videoData: VideoCreationPayload,
    file: string
  ): Promise<Video | undefined> {
    const queryParams: QueryOptions = {};
    queryParams.headers = {};
    if (uploadToken === null || uploadToken === undefined) {
      throw new Error(
        'Required parameter upload token was null or undefined when calling uploadWithUploadToken.'
      );
    }

    this.httpClient.addUploadTokenHeader(uploadToken);

    if (videoData === null || videoData === undefined) {
      throw new Error (
        'Required parameter videoData was null or undefined when calling uploadWithUploadToken.'
      )
    }
    if (!existsSync(file)) {
      throw new Error(`${file} must be a readable source file`);
    }

    const length = statSync(file).size;
    if (length <= 0) {
      throw new Error(`${file} is empty`);
    }
    // Path Params
    const localVarPath = 'api/videos/upload';

    // Query Params
    queryParams.method = 'POST';

    const formData = new FormData();
    
    if (videoData.title === undefined) {
      formData.append('title', videoData.title);
    }
    if (videoData.description !== undefined) {
      formData.append('description', videoData.description);
    }
    if (videoData.metadata !== undefined) {
      formData.append('metadata', JSON.stringify(videoData.metadata));
    }
    if (videoData.tags !== undefined) {
      formData.append('tags', JSON.stringify(videoData.tags));
    }
    if (videoData.qualities !== undefined) {
      formData.append('qualities', JSON.stringify(videoData.qualities));
    }
    if (videoData.public === undefined) {
      videoData.public = true; 
    }
    formData.append('public', JSON.stringify(videoData.public));
    if (videoData.panoramic === undefined) {
      videoData.panoramic = false; 
    }
    formData.append('panoramic', JSON.stringify(videoData.panoramic));
    if (videoData.mp4_support === undefined) {
      videoData.mp4_support = false;
    }
    formData.append('mp4_support', JSON.stringify(videoData.mp4_support));
    formData.append('file', createReadStream(file));

    queryParams.body = formData;
    const call = this.httpClient.call(localVarPath, queryParams);
    
    return call.then(
      (response) => {
        let result = ObjectSerializer.deserialize(
          JSON.parse(response.body),
          'HttpResponse',
          ''
        ) as HttpResponse

        if (result.status == 'success'){
          return ObjectSerializer.deserialize(
            JSON.parse(JSON.stringify(result.data)),
            'Video',
            ''
          ) as Video
        }

        return undefined;
      }
    );
  }

  /**
   * Retrieve video's detail
   * @param videoId The unique identifier of the video you want details about.
   */
  public async get(videoId: string): Promise<Video | undefined> {
    const queryParams: QueryOptions = {};
    queryParams.headers = {};
    if (videoId === null || videoId === undefined) {
      throw new Error(
        'Required parameter videoId was null or undefined when calling get.'
      );
    }
    // Path Params
    const localVarPath = 'api/videos/{videoId}'
      .replace('{' + 'videoId' + '}', encodeURIComponent(String(videoId)));

    queryParams.method = 'GET';

    return this.httpClient
    .call(localVarPath, queryParams)
    .then(
      (response) => {
        let result = ObjectSerializer.deserialize(
          JSON.parse(response.body),
          'HttpResponse',
          ''
        ) as HttpResponse

        if (result.status == 'success'){
          return ObjectSerializer.deserialize(
            JSON.parse(JSON.stringify(result.data)),
            'Video',
            ''
          ) as Video
        }

        return undefined;
      }
    );
  }

  /**
   * Updates the parameters associated with your video. The video you are updating is determined by the video ID you provide. 
   * Update a video
   * @param videoId The video ID for the video you want to delete.
   * @param videoUpdatePayload 
   */
  public async updateVideoInfomation(
    videoId: string,
    videoUpdatePayload: VideoUpdatePayload = {}
  ): Promise<string | undefined> {
    const queryParams: QueryOptions = {};
    queryParams.headers = {};
    if (videoId === null || videoId === undefined) {
      throw new Error(
        'Required parameter videoId was null or undefined when calling update.'
      );
    }
    if (videoUpdatePayload === null || videoUpdatePayload === undefined) {
      throw new Error(
        'Required parameter videoUpdatePayload was null or undefined when calling update.'
      );
    }
    // Path Params
    const localVarPath = 'api/videos/{videoId}'
      .replace('{' + 'videoId' + '}', encodeURIComponent(String(videoId)));

    // Body Params
    const contentType = ObjectSerializer.getPreferredMediaType([
      'application/json',
    ]);
    queryParams.headers['Content-Type'] = contentType;

    queryParams.body = ObjectSerializer.stringify(
      ObjectSerializer.serialize(videoUpdatePayload, 'UpdateVideoInput', ''),
      contentType
    );

    queryParams.method = 'PATCH';

    return this.httpClient
    .call(localVarPath, queryParams)
    .then(
      (response) => {
        let result = ObjectSerializer.deserialize(
          JSON.parse(response.body),
          'HttpResponse',
          ''
        ) as HttpResponse

        return result.message
        // if (result.status == 'success'){
        //   return ObjectSerializer.deserialize(
        //     JSON.parse(JSON.stringify(result.data)),
        //     'Video',
        //     ''
        //   ) as Video
        // }

        return undefined;
      }
    );
  }


  /**
   * Updates the parameters associated with your video. The video you are updating is determined by the video ID you provide. 
   * Update a video
   * @param videoId The video ID for the video you want to delete.
   * @param videoQualities The qualities you want to update for your video. 
   */
  public async updateVideoProfile(
    videoId: string,
    videoQualities: Array<string>
  ): Promise<string | undefined> {
    const queryParams: QueryOptions = {};
    queryParams.headers = {};
    if (videoId === null || videoId === undefined) {
      throw new Error(
        'Required parameter videoId was null or undefined when calling update.'
      );
    }
    if (videoQualities === null || videoQualities === undefined) {
      throw new Error(
        'Required parameter videoUpdatePayload was null or undefined when calling update.'
      );
    }
    // Path Params
    const localVarPath = 'api/videos/{videoId}/profile'
      .replace('{' + 'videoId' + '}', encodeURIComponent(String(videoId)));

    // Body Params
    const contentType = ObjectSerializer.getPreferredMediaType([
      'application/json',
    ]);
    const urlSearchParams = new URLSearchParams(); 
    urlSearchParams.append('qualities', videoQualities.join(','));

    queryParams.searchParams = urlSearchParams
    
    queryParams.method = 'PATCH';

    return this.httpClient
    .call(localVarPath, queryParams)
    .then(
      (response) => {
        let result = ObjectSerializer.deserialize(
          JSON.parse(response.body),
          'HttpResponse',
          ''
        ) as HttpResponse

        return result.message
        // if (result.status == 'success'){
        //   return ObjectSerializer.deserialize(
        //     JSON.parse(JSON.stringify(result.data)),
        //     'Video',
        //     ''
        //   ) as Video
        // }
      }
    );
  }

  /**
   * Updates the parameters associated with your video. The video you are updating is determined by the video ID you provide. 
   * Update a video
   * @param videoId The video ID for the video you want to delete.
   * @param videoUpdatePayload 
   */
  public async updateVideoSetting(
    videoId: string,
    isPublic: boolean
  ): Promise<string | undefined> {
    const queryParams: QueryOptions = {};
    queryParams.headers = {};
    if (videoId === null || videoId === undefined) {
      throw new Error(
        'Required parameter videoId was null or undefined when calling update.'
      );
    }
    // Path Params
    const localVarPath = 'api/videos/{videoId}/setting'
      .replace('{' + 'videoId' + '}', encodeURIComponent(String(videoId)));

    // Body Params
    const contentType = ObjectSerializer.getPreferredMediaType([
      'application/json',
    ]);

    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append("public", JSON.stringify(isPublic));

    queryParams.searchParams = urlSearchParams

    queryParams.method = 'PATCH';

    return this.httpClient
    .call(localVarPath, queryParams)
    .then(
      (response) => {
        let result = ObjectSerializer.deserialize(
          JSON.parse(response.body),
          'HttpResponse',
          ''
        ) as HttpResponse

        return result.message
        // if (result.status == 'success'){
        //   return ObjectSerializer.deserialize(
        //     JSON.parse(JSON.stringify(result.data)),
        //     'Video',
        //     ''
        //   ) as Video
        // }

        return undefined;
      }
    );
  }

  
  /**
   * If you do not need a video any longer, you can send a request to delete it. All you need is the videoId.
   * Delete a video
   * @param videoId The video ID for the video you want to delete.
   */
  public async delete(videoId: string): Promise<string | undefined> {
    const queryParams: QueryOptions = {};
    queryParams.headers = {};
    if (videoId === null || videoId === undefined) {
      throw new Error(
        'Required parameter videoId was null or undefined when calling delete.'
      );
    }
    // Path Params
    const localVarPath = 'api/videos/{videoId}'
      .replace('{' + 'videoId' + '}', encodeURIComponent(String(videoId)));

    queryParams.method = 'DELETE';

    return this.httpClient
    .call(localVarPath, queryParams)
    .then(
      (response) => {
        let result = ObjectSerializer.deserialize(
          JSON.parse(response.body),
          'HttpResponse',
          ''
        ) as HttpResponse

        return result.message
        // if (result.status == 'success'){
        //   return ObjectSerializer.deserialize(
        //     JSON.parse(JSON.stringify(result.data)),
        //     'Video',
        //     ''
        //   ) as Video
        // }

        return undefined;
      }
    );
  }

  /**
   * This method returns a list of your videos (with all their details). With no parameters added, the API returns the first page of all videos. You can filter videos using the parameters described below.
   * List all videos
   * @param {Object} filter
   * @param { string } filter.search The keyword you want to search in title or description.
   * @param { { [key: string]: string; } } searchParams.metadata Videos can be tagged with metadata tags in key:value pairs. You can search for videos with specific key value pairs using this parameter. [Dynamic Metadata](https://api.video/blog/endpoints/dynamic-metadata) allows you to define a key that allows any value pair.
   * @param { string } searchParams.sortBy Allowed: created_at, title, duration, size, view. You can search by the time videos were published at, or by title.
   * @param { string } searchParams.sortOrder Allowed: asc, desc. asc is ascending and sorts from A to Z. desc is descending and sorts from Z to A.
   * @param { number } searchParams.limit Choose the number of videos you want to get. Minimum value: 1
   * @param { number } searchParams.offer Choose the number of videos you want to skip. Allowed values 1-100, default is 25.
   */
  public async list({
    search,
    metadata,
    sortBy,
    sortOrder,
    limit,
    offset,
  }: {
    search?: string;
    metadata?: { [key: string]: string };
    sortBy?: string;
    sortOrder?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<VideosListResponse | undefined> {
    const queryParams: QueryOptions = {};
    queryParams.headers = {};
    // Path Params
    const localVarPath = 'api/videos';

    // Query Params
    const urlSearchParams = new URLSearchParams();

    if (search !== undefined) {
      urlSearchParams.append(
        'search',
        ObjectSerializer.serialize(search, 'string', '')
      );
    }
    if (metadata !== undefined) {
      if (typeof metadata !== 'object') {
        throw new Error(`${metadata} is not an object`);
      }
      Object.keys(metadata).forEach((k) =>
        urlSearchParams.append(
          'metadata[' + k + ']',
          ObjectSerializer.serialize(metadata[k], 'string', '')
        )
      );
    }
    if (sortBy !== undefined) {
      urlSearchParams.append(
        'sort_by',
        ObjectSerializer.serialize(sortBy, 'string', '')
      );
    }
    if (sortOrder !== undefined) {
      urlSearchParams.append(
        'order',
        ObjectSerializer.serialize(sortOrder, 'string', '')
      );
    }
    if (limit !== undefined) {
      urlSearchParams.append(
        'limit',
        ObjectSerializer.serialize(limit, 'number', '')
      );
    }
    if (offset !== undefined) {
      urlSearchParams.append(
        'offset',
        ObjectSerializer.serialize(offset, 'number', '')
      );
    }

    queryParams.searchParams = urlSearchParams;

    queryParams.method = 'GET';

    return this.httpClient
      .call(localVarPath, queryParams)
      .then(
        (response) =>{
        let result = ObjectSerializer.deserialize(
          JSON.parse(response.body),
          'HttpResponse',
          ''
        ) as HttpResponse

        if (result.status == 'success'){
          return ObjectSerializer.deserialize(
            JSON.parse(JSON.stringify(result.data)),
            'VideoListResponse',
            ''
          ) as VideosListResponse
        }

        return undefined
        }
      );
  }

  /**
   * The thumbnail is the poster that appears in the player window before video playback begins.
This endpoint allows you to upload an image for the thumbnail.
To select a still frame from the video using a time stamp, use the [dedicated method](#pickThumbnail) to pick a time in the video.
Note: There may be a short delay before the new thumbnail is delivered to our CDN.
   * Upload a thumbnail
   * @param videoId Unique identifier of the chosen video 
   * @param file The image to be added as a thumbnail. The mime type should be image/jpeg, image/png or image/webp. The max allowed size is 8 MiB.
   */
  public async uploadThumbnail(
    videoId: string,
    file: string | Readable | Buffer
  ): Promise<string | undefined> {
    const queryParams: QueryOptions = {};
    queryParams.headers = {};
    if (videoId === null || videoId === undefined) {
      throw new Error(
        'Required parameter videoId was null or undefined when calling uploadThumbnail.'
      );
    }
    let fileName = 'file';
    let fileBuffer = file;
    if (typeof file === 'string') {
      fileName = path.basename(file);
      fileBuffer = createReadStream(file);
    }
    if (file instanceof Readable) {
      fileBuffer = await readableToBuffer(file);
    }
    if (fileBuffer === undefined){
      throw error('file is not readable');
    }
    // Path Params
    const localVarPath = 'api/videos/{videoId}/thumbnail'
      .replace('{' + 'videoId' + '}', encodeURIComponent(String(videoId)));

    queryParams.method = 'PATCH';

    const formData = new FormData();

    formData.append("thumbnail", fileBuffer);

    queryParams.body = formData;

    return this.httpClient
      .call(localVarPath, queryParams)
      .then(
        (response) =>{
        let result = ObjectSerializer.deserialize(
          JSON.parse(response.body),
          'HttpResponse',
          ''
        ) as HttpResponse

        return result.message

        // if (result.status == 'success'){
        //   return ObjectSerializer.deserialize(
        //     JSON.parse(JSON.stringify(result.data)),
        //     'Video',
        //     ''
        //   ) as VideosListResponse
        // }

        // return undefined
        }
      );
  }

//   /**
//    * This method provides upload status & encoding status to determine when the video is uploaded or ready to playback. Once encoding is completed, the response also lists the available stream qualities.
//    * Retrieve video status
//    * @param videoId The unique identifier for the video you want the status for.
//    */
//   public async getStatus(videoId: string): Promise<VideoStatus> {
//     const queryParams: QueryOptions = {};
//     queryParams.headers = {};
//     if (videoId === null || videoId === undefined) {
//       throw new Error(
//         'Required parameter videoId was null or undefined when calling getStatus.'
//       );
//     }
//     // Path Params
//     const localVarPath = '/videos/{videoId}/status'
//       .substring(1)
//       .replace('{' + 'videoId' + '}', encodeURIComponent(String(videoId)));

//     queryParams.method = 'GET';

//     return this.httpClient
//       .call(localVarPath, queryParams)
//       .then(
//         (response) =>
//           ObjectSerializer.deserialize(
//             ObjectSerializer.parse(
//               response.body,
//             ),
//             'VideoStatus',
//             ''
//           ) as VideoStatus
//       );
//   }
}
