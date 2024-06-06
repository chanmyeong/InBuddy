import { serverAxios } from '@/apis/common';

const server = serverAxios();

const getTaskList = async (journeyId) => {
    return await server
        .get(`/api/journeys/${journeyId}/tasklist`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

const checkTaskList = async (journeyId, taskId) => {
    return await server
        .put(`/api/journeys/${journeyId}/tasklist/${taskId}/check`, {})
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

export { getTaskList, checkTaskList };
