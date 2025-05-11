import { mockErrorMessage, mockUser } from './__mocks__/authData';
import { getCookie } from '@cookie';
import { getUserApi, resetPasswordApi } from '@api';
import {
  authSlice,
  checkUserAuth,
  forgotUserPassword,
  initialStateAuth,
  loginUser,
  logoutUser,
  registerUser,
  resetUserPassword,
  selectAuthError,
  selectAuthIsLoading,
  selectIsAuthChecked,
  selectUserData,
  setIsAuthChecked,
  setUser,
  updateUser
} from '@slices';

describe('authSlice: Redux store and actions', () => {
  describe('Actions on reducers in authSlice', () => {
    it('should return the initial state', () => {
      expect(authSlice.reducer(undefined, { type: '' })).toEqual(
        initialStateAuth
      );
    });

    describe('extraReducers', () => {
      describe('registerUser', () => {
        it('should handle pending state when fetching register user', () => {
          expect(
            authSlice.reducer(undefined, {
              type: registerUser.pending.type
            })
          ).toEqual({ ...initialStateAuth, isLoading: true });
        });

        it('should handle fulfilled state when register user are fetched successfully', () => {
          expect(
            authSlice.reducer(undefined, {
              type: registerUser.fulfilled.type,
              payload: mockUser
            })
          ).toEqual({
            ...initialStateAuth,
            isLoading: false,
            userData: mockUser
          });
        });

        it('should handle rejected state when register user fetch fails', () => {
          expect(
            authSlice.reducer(undefined, {
              type: registerUser.rejected.type,
              error: { message: mockErrorMessage }
            })
          ).toEqual({
            ...initialStateAuth,
            isLoading: false,
            error: mockErrorMessage
          });
        });

        it('should handle rejected state with undefined error message', () => {
          expect(
            authSlice.reducer(undefined, {
              type: registerUser.rejected.type,
              error: {}
            })
          ).toEqual({
            ...initialStateAuth,
            isLoading: false,
            error: 'Ошибка регистрации пользователя'
          });
        });
      });

      describe('loginUser', () => {
        it('should handle pending state when fetching login user', () => {
          expect(
            authSlice.reducer(undefined, {
              type: loginUser.pending.type
            })
          ).toEqual({ ...initialStateAuth, isLoading: true });
        });

        it('should handle fulfilled state when login user are fetched successfully', () => {
          expect(
            authSlice.reducer(undefined, {
              type: loginUser.fulfilled.type,
              payload: mockUser
            })
          ).toEqual({
            ...initialStateAuth,
            isLoading: false,
            userData: mockUser
          });
        });

        it('should handle rejected state when login user fetch fails', () => {
          expect(
            authSlice.reducer(undefined, {
              type: loginUser.rejected.type,
              error: { message: mockErrorMessage }
            })
          ).toEqual({
            ...initialStateAuth,
            isLoading: false,
            error: mockErrorMessage
          });
        });

        it('should handle rejected state with undefined error message', () => {
          expect(
            authSlice.reducer(undefined, {
              type: loginUser.rejected.type,
              error: {}
            })
          ).toEqual({
            ...initialStateAuth,
            isLoading: false,
            error: 'Ошибка входа пользователя'
          });
        });
      });

      describe('logoutUser', () => {
        it('should handle pending state when fetching logout user', () => {
          expect(
            authSlice.reducer(undefined, {
              type: logoutUser.pending.type
            })
          ).toEqual({ ...initialStateAuth, isLoading: true });
        });

        it('should handle fulfilled state when logout user are fetched successfully', () => {
          expect(
            authSlice.reducer(
              { ...initialStateAuth, userData: mockUser },
              {
                type: logoutUser.fulfilled.type
              }
            )
          ).toEqual({
            ...initialStateAuth,
            isLoading: false,
            userData: null
          });
        });

        it('should handle rejected state when logout user fetch fails', () => {
          expect(
            authSlice.reducer(undefined, {
              type: logoutUser.rejected.type,
              error: { message: mockErrorMessage }
            })
          ).toEqual({
            ...initialStateAuth,
            isLoading: false,
            error: mockErrorMessage
          });
        });

        it('should handle rejected state with undefined error message', () => {
          expect(
            authSlice.reducer(undefined, {
              type: logoutUser.rejected.type,
              error: {}
            })
          ).toEqual({
            ...initialStateAuth,
            isLoading: false,
            error: 'Ошибка выхода пользователя'
          });
        });
      });

      describe('updateUser', () => {
        it('should handle pending state when fetching update user', () => {
          expect(
            authSlice.reducer(undefined, {
              type: updateUser.pending.type
            })
          ).toEqual({ ...initialStateAuth, isLoading: true });
        });

        it('should handle fulfilled state when update user are fetched successfully', () => {
          expect(
            authSlice.reducer(undefined, {
              type: updateUser.fulfilled.type,
              payload: mockUser
            })
          ).toEqual({
            ...initialStateAuth,
            isLoading: false,
            userData: mockUser
          });
        });

        it('should handle rejected state when update user fetch fails', () => {
          expect(
            authSlice.reducer(undefined, {
              type: updateUser.rejected.type,
              error: { message: mockErrorMessage }
            })
          ).toEqual({
            ...initialStateAuth,
            isLoading: false,
            error: mockErrorMessage
          });
        });

        it('should handle rejected state with undefined error message', () => {
          expect(
            authSlice.reducer(undefined, {
              type: updateUser.rejected.type,
              error: {}
            })
          ).toEqual({
            ...initialStateAuth,
            isLoading: false,
            error: 'Ошибка обновления данных пользователя'
          });
        });
      });

      describe('forgotUserPassword', () => {
        it('should handle pending state when fetching forgot password', () => {
          expect(
            authSlice.reducer(undefined, {
              type: forgotUserPassword.pending.type
            })
          ).toEqual({ ...initialStateAuth, isLoading: true });
        });

        it('should handle fulfilled state when forgot password are fetched successfully', () => {
          expect(
            authSlice.reducer(undefined, {
              type: forgotUserPassword.fulfilled.type
            })
          ).toEqual({
            ...initialStateAuth,
            isLoading: false
          });
        });

        it('should handle rejected state when forgot password fetch fails', () => {
          expect(
            authSlice.reducer(undefined, {
              type: forgotUserPassword.rejected.type,
              error: { message: mockErrorMessage }
            })
          ).toEqual({
            ...initialStateAuth,
            isLoading: false,
            error: mockErrorMessage
          });
        });

        it('should handle rejected state with undefined error message', () => {
          expect(
            authSlice.reducer(undefined, {
              type: forgotUserPassword.rejected.type,
              error: {}
            })
          ).toEqual({
            ...initialStateAuth,
            isLoading: false,
            error: 'Ошибка восстановления пароля'
          });
        });
      });

      describe('resetUserPassword', () => {
        it('should handle pending state when fetching reset password', () => {
          expect(
            authSlice.reducer(undefined, {
              type: resetUserPassword.pending.type
            })
          ).toEqual({ ...initialStateAuth, isLoading: true });
        });

        it('should handle fulfilled state when reset password are fetched successfully', () => {
          expect(
            authSlice.reducer(undefined, {
              type: resetUserPassword.fulfilled.type
            })
          ).toEqual({
            ...initialStateAuth,
            isLoading: false
          });
        });

        it('should handle rejected state when reset password fetch fails', () => {
          expect(
            authSlice.reducer(undefined, {
              type: resetUserPassword.rejected.type,
              error: { message: mockErrorMessage }
            })
          ).toEqual({
            ...initialStateAuth,
            isLoading: false,
            error: mockErrorMessage
          });
        });

        it('should handle rejected state with undefined error message', () => {
          expect(
            authSlice.reducer(undefined, {
              type: resetUserPassword.rejected.type,
              error: {}
            })
          ).toEqual({
            ...initialStateAuth,
            isLoading: false,
            error: 'Ошибка обновления пароля'
          });
        });
      });
    });

    describe('reducers', () => {
      describe('setIsAuthChecked', () => {
        it('should handle set boolean value', () => {
          expect(
            authSlice.reducer(
              {
                ...initialStateAuth,
                isAuthChecked: false
              },
              setIsAuthChecked(true)
            )
          ).toEqual({ ...initialStateAuth, isAuthChecked: true });
        });
      });

      describe('setUser', () => {
        it('should handle set user data', () => {
          expect(
            authSlice.reducer(
              {
                ...initialStateAuth,
                userData: null
              },
              setUser(mockUser)
            )
          ).toEqual({ ...initialStateAuth, userData: mockUser });
        });
      });
    });
  });

  describe('Selectors in authSlice', () => {
    const state = {
      auth: {
        userData: mockUser,
        isAuthChecked: true,
        isLoading: true,
        error: mockErrorMessage
      } as typeof initialStateAuth
    };

    describe('selectUserData', () => {
      it('should select all ingredients', () => {
        expect(selectUserData(state)).toEqual(mockUser);
      });
    });

    describe('selectIsAuthChecked', () => {
      it('should select is auth checked', () => {
        expect(selectIsAuthChecked(state)).toBe(true);
      });
    });

    describe('selectAuthIsLoading', () => {
      it('should select loading status', () => {
        expect(selectAuthIsLoading(state)).toBe(true);
      });
    });

    describe('selectAuthError', () => {
      it('should select error', () => {
        expect(selectAuthError(state)).toEqual(mockErrorMessage);
      });
    });
  });
});

jest.mock('@cookie', () => ({
  getCookie: jest.fn()
}));

jest.mock('@api', () => ({
  getUserApi: jest.fn(),
  resetPasswordApi: jest.fn()
}));

describe('thunk functions for authSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('checkUserAuth', () => {
    it('should dispatch setIsAuthChecked when no token', async () => {
      (getCookie as jest.Mock).mockReturnValue(undefined);
      const dispatch = jest.fn();

      await checkUserAuth()(dispatch, jest.fn(), undefined);

      expect(dispatch).toHaveBeenCalledWith(setIsAuthChecked(true));
      expect(getUserApi).not.toHaveBeenCalled();
    });

    it('should call getUserApi when token exists', async () => {
      (getCookie as jest.Mock).mockReturnValue('test-token');
      (getUserApi as jest.Mock).mockResolvedValue(mockUser);
      const dispatch = jest.fn();

      await checkUserAuth()(dispatch, jest.fn(), undefined);

      expect(getUserApi).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(setUser(mockUser));
      expect(dispatch).toHaveBeenCalledWith(setIsAuthChecked(true));
    });
  });

  describe('resetUserPassword', () => {
    const mockData = {
      password: 'newPassword123',
      token: 'reset-token'
    };

    it('should call resetPasswordApi with correct data', async () => {
      (resetPasswordApi as jest.Mock).mockResolvedValue({ success: true });

      await resetUserPassword(mockData)(jest.fn(), jest.fn(), undefined);

      expect(resetPasswordApi).toHaveBeenCalledWith(mockData);
    });
  });
});
