import axios from "axios";

import { SERVER_BASE_URL } from "../constants/server.BaseUrl";

export const custumAxios = axios.create({
  baseURL: SERVER_BASE_URL,
  timeout: 10000,
});
