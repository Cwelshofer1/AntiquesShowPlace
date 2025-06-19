const apiUrl = "/api/comment";

export const GetComments = () => {
    return fetch(apiUrl).then((res) => res.json());
};

export const CreateComment = (comment) => {
return fetch(apiUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(comment),
}).then((res) => res.json());
};

export const DeleteComment = (id) => {
  return fetch(`${apiUrl}/${id}`,
    {
      method: "DELETE"
    }
  )
}

export const UpdateComment = (comment) => {
  return fetch(`${apiUrl}/${comment.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
};
