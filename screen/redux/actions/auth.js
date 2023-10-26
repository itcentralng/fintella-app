import {
  LOGGING_IN,
  LOGIN,
  LOGOUT,
  SET_PROFILE,
  // SIGN_UP_LOADING,
} from "./types";
import { _postApi, _updateApi, _fetchApi } from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import store from "../store";
// import moment from 'moment';

export function setLogin(payload) {
  return { type: LOGIN, payload };
}

export function login({ phone, password }, cb = (f) => f, error_cb = (f) => f) {
  return (dispatch) => {
    console.log("calling login");
    let success = async (results) => {
      if (results) {
        try {
          await AsyncStorage.setItem("@fintella:user", JSON.stringify(results));
        } catch (e) {
          console.log(e);
        }

        dispatch({ type: LOGIN, payload: results });
        cb();
      } else {
        if (results.message) {
          Alert.alert("", results.message);
        } else {
          Alert.alert("Error", "Cannot login at this time, try again later");
        }
        error_cb();
      }
    };

    let error = (err) => {
      console.log("err", err);
      Alert.alert("Error", "Unable to login at this time");
      error_cb();
    };

    _postApi("login", { phone, password }, success, error);
  };
}

export function checkAuthStatus(cb = (f) => f) {
  return async (dispatch) => {
    console.log("checking auth status");
    dispatch({ type: LOGGING_IN });

    let _user = await AsyncStorage.getItem("@fintella:user");
    let conv = JSON.parse(_user);
    // console.log(conv);
    if (conv) {
      let customerErpId = conv.erp;
      dispatch({ type: LOGIN, payload: conv });
      cb(true);
    } else {
      console.log("Restoring token failed");
      dispatch({ type: LOGGING_IN });
      cb(false);
    }
  };
}

export function signup(form, cb, error_cb = (f) => f) {
  return (dispatch) => {
    console.log(form, "====================form");

    _postApi(
      "register",
      form,
      (resp) => {
        if (resp.success) {
          let success_cb = (results) => {
            console.log("login success");
            cb();
          };
          dispatch(
            login({ phone: form.phone, password: form.password }, success_cb)
          );
        } else {
          console.log("error", resp);
          Alert.alert("Error", resp.msg);
          error_cb();
        }
      },
      (err) => {
        console.log("err", err);
        Alert.alert("Error", "Unable to login at this time");
        error_cb();
      }
    );
  };
}

export function getProfile() {
  return (dispatch) => {
    const user = store.getState().auth.user;

    _fetchApi(
      `/users/${user.pcn_no}`,
      (data) => {
        dispatch({ type: SET_PROFILE, payload: data.results });
      },
      (err) => {
        console.log(err);
      }
    );
  };
}

export function updateProfile(form = {}, callback = (f) => f) {
  return (dispatch) => {
    const user = store.getState().auth.user;
    _updateApi(
      `/users/${user.phone}`,
      form,
      (data) => {
        // console.log(data);
        dispatch(getProfile());
        callback();
      },
      (err) => {
        console.log(err);
      }
    );
  };
}

export function logout(cb) {
  return async (dispatch) => {
    AsyncStorage.removeItem("@fintella:user");
    dispatch({ type: LOGOUT });
    cb();
  };
}

export function init(navigation, callback = (f) => f) {
  return async (dispatch) => {
    let token = await AsyncStorage.getItem("@fintella:user");
    if (token) {
      token = JSON.parse(token);
      getUserProfile(token)
        .then((data) => {
          if (data.success) {
            callback();
            const { user } = data;
            dispatch({ type: SET_USER, payload: user });
            navigation.navigate("HomeP");
          } else {
            callback();
            // console.log(err)
            localStorage.removeItem("@fintella:user");
            navigation.navigate("Login");
          }
        })
        .catch((err) => {
          // server error
          console.log(err);
          dispatch({ type: STOP_LOADING_APP });
        });
    } else {
      callback();
      navigation.navigate("Login");
    }
  };
}
