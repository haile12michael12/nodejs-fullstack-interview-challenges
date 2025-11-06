export declare class AppError extends Error {
    readonly message: string;
    readonly statusCode: number;
    readonly isOperational: boolean;
    constructor(message: string, statusCode?: number, isOperational?: boolean);
}
export declare class CacheError extends AppError {
    constructor(message: string);
}
//# sourceMappingURL=AppError.d.ts.map