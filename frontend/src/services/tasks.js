import api from "./api";

export const getTasks = async (params = {}) => {
    return api.get("tasks/", {
        params,
    });
};

export const getTask = async (id) => {
    return api.get(`tasks/${id}/`);
};

export const createTask = async (task) => {
    return api.post("tasks/", task);
};

export const updateTask = async (id, task) => {
    return api.patch(`tasks/${id}/`, task);
};

export const deleteTask = async (id) => {
    return api.delete(`tasks/${id}/`);
};

export const completeTask = async (id) => {
    return api.post(`tasks/${id}/complete/`);
};

export const getStats = async () => {
    return api.get("tasks/stats/");
};

export const getCategories = async () => {
    return api.get("categories/");
};