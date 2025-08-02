interface ICommonResponse {
  message: string;
  code: number;
  status: boolean;
}

export interface ICommonObject {
  [key: string]: any;
}

export interface ISuccessResponse extends ICommonResponse {
  data: [ICommonObject] | null;
}

export interface IErrorResponse extends ICommonResponse {
  description: string | null;
}
