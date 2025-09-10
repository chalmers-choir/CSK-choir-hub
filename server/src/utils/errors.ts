export class BadRequestError extends Error {
    status = 400;
    constructor(message: string) {
        super(message);
        this.name = 'BadRequestError';
    }
}

export class UnauthorizedError extends Error {
    status = 401;
    constructor(message: string) {
        super(message);
        this.name = 'UnauthorizedError';
    }
}

export class ForbiddenError extends Error {
    status = 403;
    constructor(message: string) {
        super(message);
        this.name = 'ForbiddenError';
    }
}

export class NotFoundError extends Error {
    status = 404;
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
    }
}

export class ConflictError extends Error {
    status = 409;
    constructor(message: string) {
        super(message);
        this.name = 'ConflictError';
    }
}

export class ValidationError extends Error {
    status = 422;
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

export class InternalServerError extends Error {
    status = 500;
    constructor(message: string) {
        super(message);
        this.name = 'InternalServerError';
    }
}

export class ServiceUnavailableError extends Error {
    status = 503;
    constructor(message: string) {
        super(message);
        this.name = 'ServiceUnavailableError';
    }
}

export class GatewayTimeoutError extends Error {
    status = 504;
    constructor(message: string) {
        super(message);
        this.name = 'GatewayTimeoutError';
    }
}