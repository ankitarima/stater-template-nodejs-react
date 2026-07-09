import config from "@config/config";
import axios from "axios";

export const getCountries = async () => {
  try {
    const response = await axios.get(`${config.COUNTRY_STATE_CITY_API}`, {
      headers: {
        "X-CSCAPI-KEY": config.COUNTRY_STATE_CITY_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error while fetching countries: ", error);
    return [];
  }
};

export const getStates = async (country_code: string) => {
  try {
    if (!country_code) {
      return [];
    }
    const response = await axios.get(
      `${config.COUNTRY_STATE_CITY_API}/${country_code}/states`,
      {
        headers: {
          "X-CSCAPI-KEY": config.COUNTRY_STATE_CITY_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error while fetching states: ", error?.message);
    return [];
  }
};
