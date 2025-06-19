const apiUrl = "/api/category";

export const GetCategories = () => {
    return fetch(apiUrl).then((res) => res.json());
};

export const CreateCategory = (category) => {
return fetch(apiUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(category),
}).then((res) => res.json());
};