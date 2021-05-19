/// <reference types="qs" />
/// <reference types="express" />
import 'dotenv/config';
export declare class ImageService {
    constructor();
    fileupload(req: any, res: any): Promise<any>;
    upload: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
}
