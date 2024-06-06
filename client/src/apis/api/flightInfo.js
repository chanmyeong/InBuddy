import { serverAxios } from '@/apis/common';
import { getCookie } from '@/apis/cookies';

const server = serverAxios();

const getflightInfo = async (journeyId) => {
    return await server
        .get(`/api/journeys/${journeyId}/flight`, {
            headers: {
                Authorization: `Bearer ${getCookie('refresh_token')}`,
            },
        })
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

const createflightInfo = async (params) => {
    return await server
        .post(`/api/journeys/${params.journeyId}/flight/create`, params.flightInfo, {
            headers: {
                Authorization: `Bearer ${getCookie('refresh_token')}`,
            },
        })
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

const modifyflightInfo = async (journeyId, flightInfoId) => {
    return await server
        .put(`/api/journeys/${journeyId}/flight/${flightInfoId}/modify`, {})
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

const deleteflightInfo = async (params) => {
    return await server
        .post(`/api/journeys/${params.journeyId}/flight/create`, params.flightInfo, {
            headers: {
                Authorization: `Bearer ${getCookie('refresh_token')}`,
            },
        })
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

const getflightInfoSeat = async (journeyId, flightInfo) => {
    return await server
        .post(`/api/journeys/${journeyId}/flight/create`, flightInfo, {
            headers: {
                Authorization: `Bearer ${getCookie('refresh_token')}`,
            },
        })
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

const modifyflightInfoSeat = async (journeyId, flightInfo) => {
    return await server
        .post(`/api/journeys/${journeyId}/flight/create`, {
            headers: {
                Authorization: `Bearer ${getCookie('refresh_token')}`,
            },
            body: flightInfo,
        })
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

export { getflightInfo, modifyflightInfo, createflightInfo, deleteflightInfo, getflightInfoSeat, modifyflightInfoSeat };
