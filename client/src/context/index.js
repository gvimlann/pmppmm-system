import { useReducer, createContext, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const initialState = {
  user: null,
};

const Context = createContext();

const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

const Provider = ({ children }) => {
  let history = useHistory();

  const [state, dispatch] = useReducer(rootReducer, initialState);

  const currentUser = async () => {
    try {
      const { data } = await axios.get("/auth/current-user");
      console.log(data.user);
      dispatch({
        type: "LOGIN",
        payload: data.user,
      });
    } catch (err) {
      console.log(err.response.status);
    }
  };

  useEffect(() => {
    currentUser();
  }, []);

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          axios
            .get("/auth/logout")
            .then((data) => {
              console.log("401 error -> logout");
              history.push("/login");
            })
            .catch((err) => {
              console.log("axios interceptors error: ", err);
              reject(err);
            });
        });
      }
      return Promise.reject(error);
    }
  );

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
