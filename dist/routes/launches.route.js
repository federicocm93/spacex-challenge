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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const launches_service_1 = require("../services/launches.service");
const notFound_error_1 = require("../errors/notFound.error");
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const launches = yield launches_service_1.launchesService.getLaunches();
        res.status(200).send([...launches]);
    }
    catch (error) {
        if (error instanceof notFound_error_1.NotFoundError) {
            res.status(404).send({
                error: error.message,
            });
        }
        else if (error instanceof Error) {
            res.status(500).send({
                error: error.message,
            });
        }
        else {
            res.status(500).send("An unknown error ocurred");
        }
    }
}));
exports.default = router;
