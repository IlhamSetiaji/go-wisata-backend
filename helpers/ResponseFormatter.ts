import { Response } from 'express';

class ResponseFormatter {
    public format(res: Response, data: any, code: number, message: string, status: string) {
        return res.status(code).json({
            meta : {
                code: code,
                message,
                status
            },
            data
        });
    }

    public success(res: Response, data: any, message: string = 'Success', code: number = 200) {
        return this.format(res, data, code, message, 'success');
    }

    public error(res: Response, data: any, message: string = 'Error', code: number = 500) {
        return this.format(res, data, code, message, 'error');
    }

    public notFound(res: Response, data: any, message: string = 'Not Found', code: number = 404) {
        return this.format(res, data, code, message, 'not found');
    }

    public badRequest(res: Response, data: any, message: string = 'Bad Request', code: number = 400) {
        return this.format(res, data, code, message, 'bad request');
    }

    public unauthorized(res: Response, data: any, message: string = 'Unauthorized', code: number = 401) {
        return this.format(res, data, code, message, 'unauthorized');
    }

    public forbidden(res: Response, data: any, message: string = 'Forbidden', code: number = 403) {
        return this.format(res, data, code, message, 'forbidden');
    }

    public conflict(res: Response, data: any, message: string = 'Conflict', code: number = 409) {
        return this.format(res, data, code, message, 'conflict');
    }
}


export default new ResponseFormatter();