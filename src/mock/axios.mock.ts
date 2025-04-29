import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import { authMocks } from "./auth.mock";
//import { templateConfigurationMocks } from "./template-configuration.mock";

const setUpAxiosMock = (axiosAdapter: AxiosInstance) => {
  const mock = new MockAdapter(axiosAdapter, { onNoMatch: "passthrough" }); 

  authMocks(mock);
  //templateConfigurationMocks(mock);
};

export default setUpAxiosMock;
