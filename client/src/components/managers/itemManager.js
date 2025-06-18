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

export const DeleteItem = (id) => {
  return fetch(`${apiUrl}/${id}`,
    {
      method: "DELETE"
    }
  )
}

export const UpdateItem = (item) => {
  return fetch(`${apiUrl}/${item.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
};

export const GetItemById = (id) => {
  return fetch(`${apiUrl}/${id}`).then(res => res.json())
}

