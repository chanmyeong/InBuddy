import { serverAxios } from '@/apis/common';

const server = serverAxios();

const getItemList = async (journeyId) => {
    return await server
        .get(`/api/journeys/${journeyId}/itemlist`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

const checkItemList = async (journeyId, itemId) => {
    return await server
        .put(`/api/journeys/${journeyId}/itemlist/${itemId}/check`, {})
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

const deleteItemList = async (journeyId, itemId) => {
    return await server
        .delete(`/api/journeys/${journeyId}/itemlist/${itemId}/delete`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

const modifyItemList = async (journeyId, itemId) => {
    return await server
        .put(`/api/journeys/${journeyId}/itemlist/${itemId}/modify`, {})
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

const createItemList = async (journeyId, item) => {
    return await server
        .post(`/api/journeys/${journeyId}/itemlist/create`, item)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

export { getItemList, checkItemList, deleteItemList, modifyItemList, createItemList };
