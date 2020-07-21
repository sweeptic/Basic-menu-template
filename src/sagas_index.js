import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from './Redux_actionTypes';
import {
   logoutSaga,
   checkAuthTimeoutSaga,
   authUserSaga,
   authCheckStateSaga
} from './sagas_auth';
import { initIngredientsSaga } from './sagas_burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './sagas_order'

export function* watchAuth() {
   yield all([
      takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
      takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
      takeEvery(actionTypes.AUTH_USER, authUserSaga),
      takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
   ])
}

export function* watchBurgerBuilder() {
   yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga)
}

export function* watchOrder() {
   yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga)
   yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga)
}