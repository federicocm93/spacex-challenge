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
exports.launchesService = void 0;
const spacex_service_1 = require("./external/spacex.service");
exports.launchesService = {
    getLaunches() {
        return __awaiter(this, void 0, void 0, function* () {
            const spaceXLaunches = yield spacex_service_1.spaceXService.getLaunches();
            const spaceXRockets = yield spacex_service_1.spaceXService.getRockets();
            let launches = [];
            if (!spaceXLaunches.length) {
                throw new Error("SpaceX launches not found.");
            }
            launches = spaceXLaunches.map((launch) => {
                const rocket = spaceXRockets.find((rocket) => rocket.rocket_id == launch.rocket.rocket_id);
                return {
                    flight_number: launch.flight_number,
                    mission_name: launch.mission_name,
                    rocket: {
                        rocket_id: rocket.rocket_id,
                        rocket_name: rocket.rocket_name,
                        description: rocket.description,
                        images: rocket.flickr_images,
                    },
                    payloads: getLaunchPayloads(launch),
                };
            });
            return launches;
        });
    },
};
const getLaunchPayloads = (launch) => {
    var _a, _b, _c, _d;
    let payloads = [];
    if ((_b = (_a = launch.rocket) === null || _a === void 0 ? void 0 : _a.second_stage) === null || _b === void 0 ? void 0 : _b.payloads) {
        payloads = (_d = (_c = launch.rocket) === null || _c === void 0 ? void 0 : _c.second_stage) === null || _d === void 0 ? void 0 : _d.payloads.map((payload) => {
            return {
                payload_id: payload.payload_id,
                manufacturer: payload.manufacturer,
                type: payload.payload_type,
            };
        });
    }
    return payloads;
};
