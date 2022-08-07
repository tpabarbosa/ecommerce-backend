/* eslint-disable no-useless-constructor */
// eslint-disable-next-line max-classes-per-file
export default class HttpResponse<ResponseData, ResponseError> {
  constructor(
    public statusCode: number,
    public body: {
      message: string;
      data?: ResponseData;
      errors?: ResponseError;
      status?: 'error' | 'success';
    }
  ) {
    console.log(this.body);
  }
}

export class HttpErrorResponse<ResponseError> extends HttpResponse<
  never,
  ResponseError
> {
  constructor(
    statusCode: number,
    body: {
      message: string;
      errors: ResponseError;
    }
  ) {
    super(statusCode, { ...body, status: 'error' });
  }
}

export class HttpSuccessResponse<ResponseData> extends HttpResponse<
  ResponseData,
  never
> {
  constructor(
    statusCode: number,
    body: {
      message: string;
      data: ResponseData;
    }
  ) {
    super(statusCode, { ...body, status: 'success' });
  }
}
