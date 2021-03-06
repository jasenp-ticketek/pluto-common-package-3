import axios from "axios";
import { OptionsFactory } from "./AxiosOptionsFactory";

class ApiHelper {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.buildUrl = this.buildUrlHelper(baseUrl);
    this.defaultOptions = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
  }

  static getUnderlyingClient = () => axios;

  buildUrlHelper = baseUrl => {
    return path => {
      return path[0] === "/" ? "" + baseUrl + path : baseUrl + "/" + path;
    };
  };

  processResponse = rawResponse => {
    return rawResponse.data;
  };

  getCancelToken = () => {
    const cancelToken = new axios.CancelToken(c => {
      this.cancelToken = c;
    });
    return cancelToken;
  };

  getTokenHeader = () => {
    const tokenHeader = {
      Authorization: `Bearer ${ApiHelper.prototype.token}`
    };
    return tokenHeader;
  };

  get = (path, options = {}, rawResponse = false) => {
    const axiosOptions = OptionsFactory(
      "get",
      this.buildUrl(path),
      this.getTokenHeader,
      this.defaultOptions,
      options,
      this.getCancelToken
    );
    return axios(axiosOptions).then(response => {
      return rawResponse ? response : this.processResponse(response);
    });
  };

  post = (path, data, options = {}, rawResponse = false) => {
    const axiosOptions = OptionsFactory(
      "post",
      this.buildUrl(path),
      this.getTokenHeader,
      this.defaultOptions,
      options,
      this.getCancelToken,
      data
    );
    return axios(axiosOptions).then(response => {
      return rawResponse ? response : this.processResponse(response);
    });
  };

  put = (path, data, options = {}, rawResponse = false) => {
    const axiosOptions = OptionsFactory(
      "put",
      this.buildUrl(path),
      this.getTokenHeader,
      this.defaultOptions,
      options,
      this.getCancelToken,
      data
    );
    return axios(axiosOptions).then(response => {
      return rawResponse ? response : this.processResponse(response);
    });
  };

  delete = (path, data, options = {}, rawResponse = false) => {
    const axiosOptions = OptionsFactory(
      "delete",
      this.buildUrl(path),
      this.getTokenHeader,
      this.defaultOptions,
      options,
      this.getCancelToken,
      data
    );
    return axios(axiosOptions).then(response => {
      return rawResponse ? response : this.processResponse(response);
    });
  };
}

export { ApiHelper };
