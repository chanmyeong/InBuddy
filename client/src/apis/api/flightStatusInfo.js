import { serverAxios } from '@/apis/common';

const server = serverAxios();

const getflightDelayInfo = (flightCode) => {
    return server
        .post(`/api/predict`, {
            flight_code: flightCode,
        })
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

const getFlightStatusInfo = (airLine, flightCode) => {
    console.log(`${airLine + flightCode}`);

    return server
        .get(`http://localhost:8000/api/flights/${airLine + flightCode}`)
        .then((response) => response)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

export { getflightDelayInfo, getFlightStatusInfo };
