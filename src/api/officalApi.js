import axios from "axios";

const officalApi = axios.create({
    headers: {'Authorization': 'Bearer ' + process.env.VUE_APP_BRAWLAPI_AUTH}
});

export default officalApi
