const apiUrl = "/api/commentlike";

export const GetCommentLikes = () => {
    return fetch(apiUrl).then((res) => res.json());
};

export const CreateCommentLike = (commentLike) => {
return fetch(apiUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(commentLike),
}).then((res) => res.json());
};

export const DeleteCommentLike = (id) => {
  return fetch(`${apiUrl}/${id}`,
    {
      method: "DELETE"
    }
  )
}