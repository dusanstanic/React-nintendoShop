import * as actionTypes from "./ActionTypes/authentication";
import * as CustomerService from "../../service/CustomerService";
import { AxiosError } from "axios";

export const authCheckState = () => {
  return (dispatch: any) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const userId = localStorage.getItem("userId");
      const date = localStorage.getItem("expirationDate");
      if (date && userId) {
        const expirationDate = new Date(date);
        console.log(expirationDate > new Date());
        if (expirationDate < new Date()) {
          dispatch(logout());
        } else {
          console.log(new Date().getSeconds());
          console.log(new Date().getTime());

          dispatch(authSuccess(token, parseInt(userId)));
          dispatch(
            checkAuthTimeout(
              (expirationDate.getTime() - new Date().getTime()) / 1000
            )
          );
        }
      }
    }
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime: number) => {
  return (dispatch: any) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email: string, password: string) => {
  return (dispatch: any) => {
    dispatch(authStart());
    setTimeout(() => {
      CustomerService.login(email, password)
        .then((response) => {
          const expirationDate = new Date(
            new Date().getTime() + response.expiresIn * 1000
          );
          localStorage.setItem("token", response.token);
          localStorage.setItem("expirationDate", expirationDate.toString());
          localStorage.setItem("userId", response.userId.toString());
          dispatch(authSuccess(response.token, response.userId));
          dispatch(checkAuthTimeout(response.expiresIn));
        })
        .catch((error: AxiosError) => {
          dispatch(authFail(error.message));
        });
    }, 2000);
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token: string, userId: number) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = (error: any) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

interface AuthStarted {
  type: typeof actionTypes.AUTH_START;
}

interface AuthSucceeded {
  type: typeof actionTypes.AUTH_SUCCESS;
  idToken: string;
  userId: number;
}

interface AuthFailed {
  type: typeof actionTypes.AUTH_FAIL;
  error: any;
}

interface AuthLogut {
  type: typeof actionTypes.AUTH_LOGOUT;
}

export type ActionTypes =
  | AuthStarted
  | AuthSucceeded
  | AuthFailed
  | { type: "AUTH_LOGOUT" };
