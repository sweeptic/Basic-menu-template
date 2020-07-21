import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from './Redux_actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga } from './sagas_auth';

export function* watchAuth() {
   yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga)
   yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
   yield takeEvery(actionTypes.AUTH_USER, authUserSaga)
}