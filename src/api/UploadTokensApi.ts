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

import { URLSearchParams } from 'url';
import ObjectSerializer from '../ObjectSerializer';
import HttpClient, { QueryOptions } from '../HttpClient';
import TokenCreationPayload from '../model/TokenCreationPayload';
import TokenListResponse from '../model/TokenListResponse';
import UploadToken from '../model/UploadToken';
import HttpResponse from 'model/HttpResponse';

/**
 * no description
 */
export default class UploadTokensApi {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Use this endpoint to generate an upload token. You can use this token to authenticate video uploads while keeping your API key safe. Tutorials using [delegated upload](https://api.video/blog/endpoints/delegated-upload).
   * Generate an upload token
   * @param tokenCreationPayload
   */
  public async createToken(
    tokenCreationPayload: TokenCreationPayload = {}
  ): Promise<UploadToken | undefined> {
    const queryParams: QueryOptions = {};
    queryParams.headers = {};
    if (tokenCreationPayload === null || tokenCreationPayload === undefined) {
      throw new Error(
        'Required parameter tokenCreationPayload was null or undefined when calling createToken.'
      );
    }
    // Path Params
    const localVarPath = 'api/upload_tokens';

    // Body Params
    const contentType = ObjectSerializer.getPreferredMediaType([
      'application/json',
    ]);
    queryParams.headers['Content-Type'] = contentType;

    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append("ttl", ObjectSerializer.serialize(tokenCreationPayload.ttl, 'number', 'int64'));

    queryParams.searchParams = urlSearchParams; 

    queryParams.method = 'POST';

    return this.httpClient
      .call(localVarPath, queryParams)
      .then(
        (response) =>{
            let rs = ObjectSerializer.deserialize(
            ObjectSerializer.parse(
              response.body,
            ),
            'HttpResponse',
            ''
          ) as HttpResponse

          if (rs.status === "success") {
            return ObjectSerializer.deserialize(
              ObjectSerializer.parse(
                rs.data,
              ),
              'UploadToken',
              ''
            ) as UploadToken
          }
          return undefined

        }
      );
  }

  /**
   * You can retrieve details about a specific upload token if you have the unique identifier for the upload token. Add it in the path of the endpoint. Details include time-to-live (ttl), when the token was created, and when it will expire.
   * Retrieve upload token
   * @param uploadToken The unique identifier for the token you want information about.
   */
  public async getToken(uploadToken: string): Promise<UploadToken | undefined> {
    const queryParams: QueryOptions = {};
    queryParams.headers = {};
    if (uploadToken === null || uploadToken === undefined) {
      throw new Error(
        'Required parameter uploadToken was null or undefined when calling getToken.'
      );
    }
    // Path Params
    const localVarPath = 'api/upload_tokens/{uploadToken}'
      .substring(1)
      .replace(
        '{' + 'uploadToken' + '}',
        encodeURIComponent(String(uploadToken))
      );

    queryParams.method = 'GET';

    return this.httpClient
      .call(localVarPath, queryParams)
      .then(
        (response) =>{
            let rs = ObjectSerializer.deserialize(
            ObjectSerializer.parse(
              response.body,
            ),
            'HttpResponse',
            ''
          ) as HttpResponse

          if (rs.status === "success") {
            return ObjectSerializer.deserialize(
              ObjectSerializer.parse(
                rs.data,
              ),
              'UploadToken',
              ''
            ) as UploadToken
          }
          return undefined

        }
      );
  }

  /**
   * Delete an existing upload token. This is especially useful for tokens you may have created that do not expire.
   * Delete an upload token
   * @param uploadToken The unique identifier for the upload token you want to delete. Deleting a token will make it so the token can no longer be used for authentication.
   */
  public async deleteToken(uploadToken: string): Promise<string | undefined> {
    const queryParams: QueryOptions = {};
    queryParams.headers = {};
    if (uploadToken === null || uploadToken === undefined) {
      throw new Error(
        'Required parameter uploadToken was null or undefined when calling deleteToken.'
      );
    }
    // Path Params
    const localVarPath = 'api/upload_tokens/{uploadToken}'
      .substring(1)
      .replace(
        '{' + 'uploadToken' + '}',
        encodeURIComponent(String(uploadToken))
      );

    queryParams.method = 'DELETE';

    return this.httpClient
      .call(localVarPath, queryParams)
      .then(
        (response) =>{
            let rs = ObjectSerializer.deserialize(
            ObjectSerializer.parse(
              response.body,
            ),
            'HttpResponse',
            ''
          ) as HttpResponse

          return rs.message
        }
      );
  }

  /**
   * A delegated token is used to allow secure uploads without exposing your API key. Use this endpoint to retrieve a list of all currently active delegated tokens. Tutorials using [delegated upload](https://api.video/blog/endpoints/delegated-upload).
   * List all active upload tokens.
   * @param {Object} searchParams
   * @param { &#39;createdAt&#39; | &#39;ttl&#39; } searchParams.sortBy Allowed: createdAt, ttl. You can use these to sort by when a token was created, or how much longer the token will be active (ttl - time to live). Date and time is presented in ISO-8601 format.
   * @param { &#39;asc&#39; | &#39;desc&#39; } searchParams.sortOrder Allowed: asc, desc. Ascending is 0-9 or A-Z. Descending is 9-0 or Z-A.
   * @param { number } searchParams.limit Choose the number of search results to return per page. Minimum value: 1
   * @param { number } searchParams.offset Results per page. Allowed values 1-100, default is 25.
   */
  public async list({
    sortBy,
    sortOrder,
    limit,
    offset,
  }: {
    sortBy?: 'created_at' | 'ttl';
    sortOrder?: 'asc' | 'desc';
    limit?: number;
    offset?: number;
  } = {}): Promise<TokenListResponse | undefined> {
    const queryParams: QueryOptions = {};
    queryParams.headers = {};
    // Path Params
    const localVarPath = 'api/upload_tokens'.substring(1);

    // Query Params
    const urlSearchParams = new URLSearchParams();

    if (sortBy !== undefined) {
      urlSearchParams.append(
        'sort_by',
        ObjectSerializer.serialize(sortBy, "'createdAt' | 'ttl'", '')
      );
    }
    if (sortOrder !== undefined) {
      urlSearchParams.append(
        'order',
        ObjectSerializer.serialize(sortOrder, "'asc' | 'desc'", '')
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
            let rs = ObjectSerializer.deserialize(
            ObjectSerializer.parse(
              response.body,
            ),
            'HttpResponse',
            ''
          ) as HttpResponse

          if (rs.status === "success") {
            return ObjectSerializer.deserialize(
              ObjectSerializer.parse(
                rs.data,
              ),
              'UploadToken',
              ''
            ) as TokenListResponse
          }
          return undefined

        }
      );
  }
}
