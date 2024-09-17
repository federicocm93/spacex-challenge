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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const launches_service_1 = require("./services/launches.service");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send("Welcome to Cliengo's SpaceX Challenge!");
}));
app.get("/launches", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const launches = yield launches_service_1.launchesService.getLaunches();
        res.status(200).send([...launches]);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("An error ocurred");
    }
}));
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
