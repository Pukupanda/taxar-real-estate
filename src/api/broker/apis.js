import { postRawData, putRawData } from "../index";

export const registerBrokerApi = async (payload) => {
  return postRawData("auth/registerBroker", payload).then((data) => {
    return data;
  });
};
export const updatebrokerApi = async (payload) => {
  return putRawData("auth/updatebroker", payload).then((data) => {
    return data;
  });
};
