import { put, delay } from 'redux-saga/effects'
import * as actions from './Redux_actions_index';

import axios from './axios-orders';

export function* initIngredientsSaga(action) {
   try {
      const response = yield axios.get('https://react-my-burger-3a440.firebaseio.com//ingredients.json');
      yield put(actions.setIngredients(response.data));
   } catch (error) {
      yield put(actions.fetchIngredientsFailed());
   }
}