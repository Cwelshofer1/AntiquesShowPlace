const apiUrl = "/api/userprofile";

export const GetUserProfiles = () => {
    return fetch(apiUrl).then((res) => res.json());
};

export const GetUserById = (id) => {
  return fetch(`${apiUrl}/${id}`).then(res => res.json())
}

export const DeleteUser = (id) => {
  return fetch(`${apiUrl}/${id}`,
    {
      method: "DELETE"
    }
  )
}