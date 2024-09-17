import { NotFoundError } from "../errors/notFound.error";
import { spaceXService } from "./external/spacex.service";

interface Rocket {
  rocket_id: string;
  rocket_name: string;
  description: string;
  images: string;
}

interface Payload {
  payload_id: string;
  manufacturer: string;
  type: string;
}

interface Launch {
  flight_number: number;
  mission_name: string;
  rocket: Rocket;
  payloads: Payload[];
}

export const launchesService = {
  async getLaunches(): Promise<Launch[]> {
    const spaceXLaunches = await spaceXService.getLaunches();
    const spaceXRockets = await spaceXService.getRockets();
    // Get a Map with rocket_id as key and the needed info from the rocket as value
    const spaceXRocketsIndexed: Map<string, Rocket> = getRocketsInfoIndexed(spaceXRockets);

    let launches: Launch[] = [];
    if (!spaceXLaunches.length) {
      throw new NotFoundError("SpaceX launches not found.");
    }
    launches = spaceXLaunches.map((launch: any) => {
      // Get corresponding rocket from map
      const rocket = spaceXRocketsIndexed.get(launch.rocket.rocket_id);

      return {
        flight_number: launch.flight_number,
        mission_name: launch.mission_name,
        rocket: rocket,
        payloads: getLaunchPayloads(launch),
      } as Launch;
    });
    return launches;
  },
};

const getLaunchPayloads = (launch: any) => {
  let payloads: any[] = [];
  if (launch.rocket?.second_stage?.payloads) {
    payloads = launch.rocket?.second_stage?.payloads.map((payload: any) => {
      return {
        payload_id: payload.payload_id,
        manufacturer: payload.manufacturer,
        type: payload.payload_type,
      };
    });
  }
  return payloads;
};

const getRocketsInfoIndexed = (rockets: any): Map<string, Rocket> => {
  let rocketsIndexedMap: Map<string, Rocket> = new Map();
  rockets.map((rocket: any) => {
    const parsedRocket: Rocket = {
      rocket_id: rocket.rocket_id,
      rocket_name: rocket.rocket_name,
      description: rocket.description,
      images: rocket.flickr_images,
    };
    rocketsIndexedMap.set(rocket.rocket_id, parsedRocket);
  });
  return rocketsIndexedMap;
};
