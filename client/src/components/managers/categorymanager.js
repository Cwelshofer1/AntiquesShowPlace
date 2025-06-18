const apiUrl = "/api/category";

export const GetCategories = () => {
    return fetch(apiUrl).then((res) => res.json());
};
