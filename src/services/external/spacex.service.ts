import axios from "axios";

const baseURL = process.env.SPACEX_API_BASE_URL;

export const spaceXService = {
  async getLaunches() {
    let response;
    try {
      response = await axios.get(`${process.env.SPACEX_API_BASE_URL}/launches`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  async getRockets() {
    let response;
    try {
      response = await axios.get(`${process.env.SPACEX_API_BASE_URL}/rockets`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
