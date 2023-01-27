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

export const patchUser = (nickname, userObj) => {
  console.log(nickname, userObj)
  return imBoardApi.patch(`/users/${nickname}`, userObj)
  .then((res) => {
    
    return res.data
  })
  .catch(err => console.log(err))
}

export const postUser = (userObj) => {
  return imBoardApi.post(`/users`)
    .then((res) => { 
      console.log(res.data);
      return res.data
    })
    .catch((err) => { 
      console.log(err);
    })
}