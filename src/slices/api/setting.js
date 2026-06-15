import toast from 'react-hot-toast';
import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { pagesPathName, router } from '@/router';
import {
  clearToken,
  postRefreshToken,
  restrictMultipleToken,
} from '@/slices/api/main/token';
import { delay } from '@/utils/common';

const { VITE_API_BASEURL } = import.meta.env;

const statusCode = {
  error: 0,
  invalidParameters: 3,
  missingParameters: 2,
  noPermission: 4,
  orderCannotDelete: 7,
  orderIsClosed: 5,
  orderIsInProgress: 8,
  orderNotFound: 6,
  success: 1,
};

const baseURL = VITE_API_BASEURL;

// 初始化設定
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

// request 攔截器
api.interceptors.request.use(
  /* 發送request前 */
  async function (config) {
    handleMultipleToken();
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// response 攔截器
api.interceptors.response.use(
  /* 接收response後 */
  async function (response) {
    //延遲0.3秒讓體驗較好
    await delay(300);
    // const contentType = response.headers["content-type"];
    //response type為json格式才進行camelcase轉換
    // if (contentType === "application/json") {
    //   response.data = camelcaseKeys(response.data, { deep: true });
    // }
    const { message, statusCode: status } = response.data;
    if (status && status !== statusCode.success) {
      showErrorToast(`${message}`);
      return Promise.reject(message);
    }
    return response;
  },
  function (error) {
    const originalRequest = error.config || {};
    const responseStatus = error.response?.status;
    if (responseStatus === 401) {
      execute401Error(originalRequest);
    } else if (responseStatus && responseStatus >= 500) {
      showErrorToast(`${responseStatus}：伺服器錯誤`);
    } else {
      const responseData = error.response?.data;
      const responseDataIsObject = responseData.constructor === Object;
      showErrorToast(
        `${responseStatus}：${
          responseData && responseDataIsObject
            ? responseData.message || responseData[Object.keys(responseData)[0]]
            : 'Unknown error'
        }`,
      );
    }
    return Promise.reject(error);
  },
);

async function execute401Error(originalRequest) {
  const { store } = await import('@/store');
  const dispatch = store.dispatch;
  dispatch(clearToken());
  const refresh = localStorage.getItem('refresh');
  if (refresh) {
    const { access } = await dispatch(
      postRefreshToken({ data: { refresh } }),
    ).unwrap();
    if (originalRequest.headers) {
      originalRequest.headers.Authorization = `Bearer ${access}`;
      api(originalRequest);
    }
  } else {
    showErrorToast('無權限登入');
    router.navigate(pagesPathName.login.path);
  }
}
async function handleMultipleToken() {
  const { store } = await import('@/store');
  const dispatch = store.dispatch;
  dispatch(restrictMultipleToken());
}
//error toast處理
function showErrorToast(message) {
  const errorToastId = 'error-toast';
  toast.dismiss(errorToastId);
  camelcaseKeys;
  toast.error(message, {
    id: errorToastId,
  });
}
const fetchInstance = axios;
export { api, fetchInstance };
