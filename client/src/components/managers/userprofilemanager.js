const apiUrl = "/api/userprofile";

export const GetUserProfiles = () => {
    return fetch(apiUrl).then((res) => res.json());
};
