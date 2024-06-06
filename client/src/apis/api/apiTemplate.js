import { serverAxios } from '@/apis/common';
const { VITE_SERVICE_KEY } = import.meta.env;

const server = serverAxios();

const url = '/B551177/StatusOfPassengerWorldWeatherInfo';

// async function getXXX(success, fail) {
//     await server
//         .get(
//             `${url}/getPassengerArrivalsWorldWeather?serviceKey=${VITE_SERVICE_KEY}&numOfRows=10&pageNo=1&from_time=0000&to_time=2400&lang=K&type=xml`
//         )
//         .then(success)
//         .catch(fail);
// }

// const getXXX = async () => {
//     await server
//         .get(`/api/hello`)
//         .then((success) => success.data)
//         .catch((fail) => {
//             console.log(`API request failed: ${fail}`);
//         });
// };

const getXXX = async () => {
    return await server
        .get('http://localhost:3000/api/hello')
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

const get2XXX = async () => {
    return await server
        .get('http://localhost:3000/api/hi')
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

// async function createXXX(fundSubmit, success, fail) {
//     await server.post(`${url}/child/submit`, fundSubmit).then(success).catch(fail);
// }

// async function updateXXX(fundResrvation, success, fail) {
//     await server.put(`${url}/reservation/modify`, fundResrvation).then(success).catch(fail);
// }

// async function deleteXXX(childId, success, fail) {
//     await server.delete(`${url}/delete/${childId}`).then(success).catch(fail);
// }

export { getXXX, get2XXX };
