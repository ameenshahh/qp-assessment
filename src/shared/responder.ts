import { Response } from "express";

class Responder {
    private res: Response;

    constructor(res: Response) {
        this.res = res;
    }

    public success({ message = "success", payload = {} }: { message?: string, payload?: any }) {
        this.res.status(200);
        this.res.json({ message, data: payload });
    }

    public error({ message, payload }: { message?: string, payload?: any } = {}) {
        this.res.status(400);
        this.res.json({ message, data: payload });
    }

    public unauthorized({ message = 'unauthorized', payload }: { message?: string, payload?: any } = {}) {
        this.res.status(401);
        this.res.json({ message, data: payload });
    }

    public crash() {
        this.res.status(500);
        this.res.json({ message: 'internal server error' });
    }
}

export default Responder;
