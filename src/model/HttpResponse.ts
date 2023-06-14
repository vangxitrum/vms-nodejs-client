import AttributeType from './AttributeType';


export default class HttpResponse {
    "status": string
    "message"?: string
    "data"?: any

  static readonly discriminator?: string = undefined;

  static readonly attributeTypeMap: Array<AttributeType> = [
    {
      name: 'status',
      baseName: 'status',
      type: 'string',
      format: '',
    },
    {
      name: 'message',
      baseName: 'message',
      type: 'string',
      format: '',
    },
    {
      name: 'data',
      baseName: 'data',
      type: 'any',
      format: '',
    },
  ];

  static getAttributeTypeMap(): Array<AttributeType> {
    return HttpResponse.attributeTypeMap;
  }
}

