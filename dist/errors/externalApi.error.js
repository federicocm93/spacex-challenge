"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalApiError = void 0;
class ExternalApiError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.ExternalApiError = ExternalApiError;
