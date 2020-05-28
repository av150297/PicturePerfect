import axios from "axios";
import { API_BASE_URL } from "../Common/Constants/URLConstants";

axios.defaults.baseURL = API_BASE_URL;
// axios.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded";
// axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export default axios;
