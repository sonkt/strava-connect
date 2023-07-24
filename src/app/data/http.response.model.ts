import { StatusCode } from "../enums/http.statuscode.enum";

export interface APIResponse<T = any> {
    data: T;
    dataId: string;
    statusCode: StatusCode;
    messages: string;
    description: string;
}