import axios, { AxiosError } from "axios";
import { ExternalApiError } from "../../errors/externalApi.error";

const baseURL = process.env.SPACEX_API_BASE_URL;
const apiClient = axios.create({ baseURL });

export const spaceXService = {
  async getLaunches() {
    let response;
    try {
      response = await apiClient.get(`${baseURL}/launches`);
      return response.data;
    } catch (error) {
      let message = "Unknown error while trying to fetch SpaceX's launches";
      if (error instanceof AxiosError || error instanceof Error) {
        message = error.message;
      }
      throw new ExternalApiError(`Couldn't fetch SpaceX's launches from external API: ${message}`);
    }
  },
  async getRockets() {
    let response;
    try {
      response = await apiClient.get(`${baseURL}/rockets`);
      return response.data;
    } catch (error) {
      let message = "Unknown error while trying to fetch SpaceX's rockets";
      if (error instanceof AxiosError || error instanceof Error) {
        message = error.message;
      }
      throw new ExternalApiError(`Couldn't fetch SpaceX's rockets from external API: ${message}`);
    }
  },
};
