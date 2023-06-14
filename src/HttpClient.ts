import got, {
  AfterResponseHook,
  ExtendOptions,
  Got,
  Headers,
  RequestError,
} from 'got';
import ApiVideoError from './VmsError';
import { Readable, Stream } from 'stream';
import FormData from 'form-data';

export type QueryOptions = Got | ExtendOptions;

export default class HttpClient {
  private apiKey?: string;
  private apiSecret?: string;
  private baseUri: string;
  private tokenType: string;
  private headers: Headers;
  private baseRequest: Got;
  private chunkSize: number;

  constructor(params: {
    apiKey?: string;
    apiSecret?: string;
    baseUri: string;
    chunkSize: number;
    applicationName?: string;
    applicationVersion?: string;
    sdkName?: string;
    sdkVersion?: string;
  }) {
    this.apiKey = params.apiKey;
    this.apiSecret = params.apiSecret;
    this.baseUri = params.baseUri;
    this.chunkSize = params.chunkSize;
    this.tokenType = 'Bearer';
    this.headers = {
      Accept: 'application/json, */*;q=0.8',
      'vms-api-key': this.apiKey,
      'vms-api-secret': this.apiSecret,
    };
    this.baseRequest = got.extend({
      prefixUrl: this.baseUri,
      headers: this.headers,
      mutableDefaults: true,
      handlers: [
        (options, next) => {
          if (options.isStream) {
            return next(options);
          }

          return (
            next(options)
              // @ts-ignore
              .catch((error: Error) => {
                if (error instanceof RequestError) {
                  // @ts-ignore
                  const { response } = error;
                  const contentType = response?.headers['content-type'];
                  if (contentType === 'application/problem+json') {
                    // @ts-ignore
                    throw new ApiVideoError(response);
                  }
                }

                throw error;
              })
          );
        },
      ],
    });
  }

  call(path: string, queryOptions?: QueryOptions) {
    return this.baseRequest.extend(queryOptions || {})(path);
  }

  addUploadTokenHeader(token: string){
    this.headers['vms-upload-token'] = token;

    return this
  }
}

export async function readableToBuffer(readable: Readable): Promise<Buffer> {
  const writableStream = new Stream.Writable({
    defaultEncoding: 'utf-8',
  });
  const data: Buffer[] = [];
  writableStream._write = (chunk, encoding, next) => {
    data.push(Buffer.from(chunk, encoding));
    next();
  };

  return new Promise((resolve, reject) => {
    Stream.pipeline(readable, writableStream, async (err) => {
      if (err) {
        reject(err);
      }
      const form = new FormData();

      const buffer = Buffer.concat(data);
      resolve(buffer);
    });
  });
}
