import { PublicClientApplication } from "@azure/msal-browser";

const loginRequest = {
  scopes: ["User.Read"],
};
const tenantId = "9af0d875-56af-4d75-9ef7-964f9f95e5d8";
const msalConfig = {
  auth: {
    clientId: "262363a3-dbcc-417f-bbd0-5e7e6ab4c71e", // 替換為 Azure App 註冊的 Client ID
    authority: `https://login.microsoftonline.com/${tenantId}`, // Tenant ID
    redirectUri: "/",
    postLogoutRedirectUri: "/",
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

// MSALf實例
const msalInstance = new PublicClientApplication(msalConfig);

export { loginRequest, msalConfig, msalInstance, tenantId };
