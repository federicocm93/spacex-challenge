"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spaceXService = void 0;
const axios_1 = __importDefault(require("axios"));
const baseURL = process.env.SPACEX_API_BASE_URL;
exports.spaceXService = {
    getLaunches() {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                response = yield axios_1.default.get(`${process.env.SPACEX_API_BASE_URL}/launches`);
                return response.data;
            }
            catch (error) {
                console.log(error);
            }
        });
    },
    getRockets() {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                response = yield axios_1.default.get(`${process.env.SPACEX_API_BASE_URL}/rockets`);
                return response.data;
            }
            catch (error) {
                console.log(error);
            }
        });
    },
};
