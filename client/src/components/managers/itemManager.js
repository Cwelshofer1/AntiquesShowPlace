const apiUrl = "/api/item";

export const GetItems = () => {
    return fetch(apiUrl).then((res) => res.json());
};

export const CreateItem = (item) => {
return fetch(apiUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(item),
}).then((res) => res.json());
};