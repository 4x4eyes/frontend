import axios from "axios";

const imBoardApi = axios.create({
  baseURL: "https://im-board-6q0z.onrender.com/api",
});

export const getMatches = (nickname) => {
  return imBoardApi.get(`/matches/${nickname}`).then((res) => {
    return res.data.matches;
  });
};

export const getUser = (nickname) => {
  return imBoardApi
    .get(`/users/${nickname}`)
    .then((res) => {
      return res.data.user;
    })
    .catch((err) => {
      return err;
    });
};

export const patchUser = (userObj) => {
  return imBoardApi.patch(`/users/${userObj.username}`, userObj).then((res) => {
    return res.data;
  });
};

export const postUser = (userObj) => {
  return imBoardApi.post(`/users`, userObj).then((res) => {
    return res.data;
  });
};

export const getSessions = (username) => {
  return imBoardApi.get(`/sessions/${username}`).then((res) => {
    return res.data.sessions;
  });
};

export const getMessages = (session_id) => {
  return imBoardApi.get(`/messages/${session_id}`).then((res) => {
    return res.data.messages;
  });
};
