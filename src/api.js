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
      console.log(res, "<- res");
      return res.data.user;
    })
    .catch((err) => {
      return err;
    });
};
