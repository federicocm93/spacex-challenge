import { spaceXService } from "./external/spacex.service";

export const launchesService = {
  async getLaunches() {
    const spaceXLaunches = await spaceXService.getLaunches();
    const spaceXRockets = await spaceXService.getRockets();

    let launches = [];
    if (!spaceXLaunches.length) {
      throw new Error("SpaceX launches not found.");
    }
    launches = spaceXLaunches.map((launch: any) => {
      const rocket = spaceXRockets.find(
        (rocket: any) => rocket.rocket_id == launch.rocket.rocket_id
      );
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
