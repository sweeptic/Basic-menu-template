import reducer from './Redux_reducer_Auth'
import * as  actionTypes from './Redux_actionTypes.js'


describe('auth reducer', () => {
   it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual({

         token: null,
         userId: null,
         error: null,
         loading: false,
         authRedirectPath: '/'

      })
   })

   it('should return the initial state', () => {
      expect(reducer({

         token: null,
         userId: null,
         error: null,
         loading: false,
         authRedirectPath: '/'

      }, {
         type: actionTypes.AUTH_SUCCESS,
         idToken: 'some-token',
         userId: 'some-user-id'

      })).toEqual({
         token: 'some-token',
         userId: 'some-user-id',
         error: null,
         loading: false,
         authRedirectPath: '/'
      })
   })
})