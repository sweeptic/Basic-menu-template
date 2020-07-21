import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from './Redux_actionTypes';
import {
   logoutSaga,
   checkAuthTimeoutSaga,
   authUserSaga,
   authCheckStateSaga
} from './sagas_auth';
import { initIngredientsSaga } from './sagas_burgerBuilder';

export function* watchAuth() {
   yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga)
   yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
   yield takeEvery(actionTypes.AUTH_USER, authUserSaga)
   yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
}

export function* watchBurgerBuilder() {
   yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga)
}