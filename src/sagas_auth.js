import { put, delay } from 'redux-saga/effects'
import * as actions from './Redux_actions_index';

export function* logoutSaga(action) {
   yield localStorage.removeItem('token');
   yield localStorage.removeItem('expirationDate');
   yield localStorage.removeItem('userId');
   yield put(actions.logoutSuccees());
}

export function* checkAuthTimeoutSaga(action) {
   yield delay(action.expirationTime);
   yield put(actions.logout());
}