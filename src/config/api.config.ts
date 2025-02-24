import { IAuthInfo } from "@interface/auth.interface";
import axios from "axios";
import { ENV } from "./ENV.config";
import { toast } from "@services/utils/toast";
import { LocalStorageService } from "@services/utils/localStorage.service";
import { getResponseStatusMessage } from "utility/errors";

const axiosIns = axios.create({
  baseURL: ENV.gateway,
  headers: {
    Accept: "application/json",
    // ds: deviceSignature(),
  },
});

const setAuthHeader = () => {
  const authInfo: IAuthInfo = LocalStorageService.get("authInfo") || null;
  if (authInfo)
    axiosIns.defaults.headers.common["Authorization"] =
      "Bearer " + authInfo?.accessToken;
};

setAuthHeader();

axiosIns.interceptors.request.use(
  (config) => config,
  (error) => {
    if (error.response) {
      return Promise.reject({
        ...error.response,
        ...{ status: error.response.status || error.status },
      });
    }

    return Promise.reject({
      body: false,
      status: 404,
      message: "Server not responding",
    });
  }
);

axiosIns.interceptors.response.use(
  (res: any) => {
    if (res?.status === 200) return { ...res.data };
    if (res?.status === 401) logout();
    return Promise.reject({
      body: res.data.body,
      status: res.data.status,
      message: res.data.message,
      error: res.data.error,
    });
  },
  (error) => {
    if (error?.response) {
      if (error.response?.status === 401) logout();
      if (error.response?.status === 413) {
        toast.error(getResponseStatusMessage(error.response?.status));
        return;
      }
      if (error.response?.data) {
        return Promise.reject({
          status: error.response?.status,
          message: error.response?.data?.message || error.response?.data?.error,
          body: {},
        });
      }
      return Promise.reject({
        message: error.message,
        status: error?.response?.status || error.status || 500,
      });
    } else {
      return Promise.reject({
        status: 500,
        message: "Server not responding",
        body: {},
      });
    }
  }
);

const logout = () => {
  LocalStorageService.clear();
  window.location.reload();
};

export { axiosIns, setAuthHeader };
