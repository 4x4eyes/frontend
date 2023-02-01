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
  return imBoardApi.get(`/users/${nickname}`).then((res) => {
    return res.data.user;
  });
};

export const patchUser = (userObj) => {
  const filteredObj = Object.fromEntries(
    Object.entries(userObj).filter(([_, value]) => value != "")
  );
  return imBoardApi
    .patch(`/users/${filteredObj.username}`, filteredObj)
    .then((res) => {
      return res.data;
    });
};

export const postUser = (userObj) => {
  const filteredObj = Object.fromEntries(
    Object.entries(userObj).filter(([_, value]) => value != "")
  );
  return imBoardApi.post(`/users`, filteredObj).then((res) => {
    return res.data;
  });
};

export const getSessions = (username) => {
  return imBoardApi.get(`/sessions/${username}`).then((res) => {
    return res.data.sessions;
  });
};

export const postSession = (user_a_name, user_b_name) => {
  return imBoardApi
    .post(`/sessions`, {
      user_a_name,
      user_b_name,
    })
    .then((res) => {
      return res.data;
    });
};

export const getMessages = (session_id) => {
  return imBoardApi.get(`/messages/${session_id}`).then((res) => {
    return res.data.messages;
  });
};

export const postMessage = (session_id, author_name, message_body) => {
  return imBoardApi
    .post(`/messages/${session_id}`, { author_name, message_body })
    .then((res) => {
      return res.data.message;
    });
};

export const getGamesByUsername = (username) => {
  return imBoardApi
    .get(`/users/${username}/games`)
    .then((games) => games.data.games);
};

export const postGameByUsername = (username, game) => {
  return imBoardApi.post(`/users/${username}/games`, game).then(() => {});
};
