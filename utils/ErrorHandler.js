import { routerRedux } from 'dva/router';
import { notification } from 'antd';

/**
 * 处理404异常
 */
const handleStatus401 = (error, dispatch) => {
  dispatch({
    type: 'global/updateState',
    payload: {
      authenticated: false,
    },
  });
};

const handlerMap = {
  401: handleStatus401,
};

export default (error, dispatch) => {

  if (error.httpStatus && handlerMap[error.httpStatus]) {
    const handler = handlerMap[error.httpStatus];
    handler(error, dispatch);

    return;
  }

  notification.error({
    message: error.message,
    description: error.errorText,
  });
};