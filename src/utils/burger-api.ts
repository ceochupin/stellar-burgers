import { setCookie, getCookie, deleteCookie } from '@cookie';
import { TIngredient, TOrder, TOrdersData, TUser } from '@utils-types';

const URL = process.env.BURGER_API_URL;

type TServerResponse<T> = {
  success: boolean;
} & T;

type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

type TAuthResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: TUser;
}>;

type TIngredientsResponse = TServerResponse<{
  data: TIngredient[];
}>;

type TFeedsResponse = TServerResponse<{
  orders: TOrder[];
  total: number;
  totalToday: number;
}>;

type TOrdersResponse = TServerResponse<{
  data: TOrder[];
}>;

type TNewOrderResponse = TServerResponse<{
  order: TOrder;
  name: string;
}>;

type TOrderResponse = TServerResponse<{
  orders: TOrder[];
}>;

export type TLoginData = {
  email: string;
  password: string;
};

export type TRegisterData = {
  email: string;
  name: string;
  password: string;
};

type TUserResponse = TServerResponse<{ user: TUser }>;

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

const setAuthTokens = (accessToken: string, refreshToken: string): void => {
  localStorage.setItem('refreshToken', refreshToken);
  setCookie('accessToken', accessToken);
};

const clearAuthTokens = (): void => {
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
};

const getAuthHeader = (): { authorization: string } => {
  const token = getCookie('accessToken');
  return { authorization: token ? token : '' };
};

const refreshToken = (): Promise<TRefreshResponse> => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return Promise.reject('Нет рефреш токена');

  return fetch(`${URL}/auth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: refreshToken })
  })
    .then(checkResponse<TRefreshResponse>)
    .then((data) => {
      if (!data.success) throw data;

      setAuthTokens(data.accessToken, data.refreshToken);

      return data;
    });
};

const fetchWithRefresh = async <T>(
  url: RequestInfo,
  options: RequestInit = {}
) => {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      }
    });
    return await checkResponse<T>(res);
  } catch (err) {
    if ((err as { message: string }).message === 'jwt expired') {
      const { accessToken } = await refreshToken();
      const res = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          authorization: accessToken,
          'Content-Type': 'application/json'
        }
      });
      return await checkResponse<T>(res);
    }
    throw err;
  }
};

export const getIngredientsApi = (): Promise<TIngredient[]> =>
  fetch(`${URL}/ingredients`)
    .then((res) => checkResponse<TIngredientsResponse>(res))
    .then((data) => (data.success ? data.data : Promise.reject(data)));

export const getFeedsApi = (): Promise<TOrdersData> =>
  fetch(`${URL}/orders/all`)
    .then(checkResponse<TFeedsResponse>)
    .then((data) => (data.success ? data : Promise.reject(data)));

export const getOrdersApi = (): Promise<TOrder[]> =>
  fetchWithRefresh<TFeedsResponse>(`${URL}/orders`).then((data) =>
    data.success ? data.orders : Promise.reject(data)
  );

export const orderBurgerApi = (data: string[]): Promise<TOrder> =>
  fetchWithRefresh<TNewOrderResponse>(`${URL}/orders`, {
    method: 'POST',
    body: JSON.stringify({
      ingredients: data
    })
  }).then((data) => (data.success ? data.order : Promise.reject(data)));

export const getOrderByNumberApi = (number: number): Promise<TOrder> =>
  fetch(`${URL}/orders/${number}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(checkResponse<TOrderResponse>)
    .then((data) => (data.success ? data.orders[0] : Promise.reject(data)));

export const registerUserApi = (data: TRegisterData): Promise<TUser> =>
  fetch(`${URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then(checkResponse<TAuthResponse>)
    .then((data) => {
      if (!data.success) throw data;

      setAuthTokens(data.accessToken, data.refreshToken);

      return data.user;
    });

export const loginUserApi = (data: TLoginData): Promise<TUser> =>
  fetch(`${URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then(checkResponse<TAuthResponse>)
    .then((data) => {
      if (!data.success) throw data;

      setAuthTokens(data.accessToken, data.refreshToken);

      return data.user;
    });

export const forgotPasswordApi = (data: { email: string }): Promise<void> =>
  fetch(`${URL}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then(checkResponse<TServerResponse<{}>>)
    .then((data) => (data.success ? undefined : Promise.reject(data)));

export const resetPasswordApi = (data: {
  password: string;
  token: string;
}): Promise<void> =>
  fetch(`${URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then(checkResponse<TServerResponse<{}>>)
    .then((data) => (data.success ? undefined : Promise.reject(data)));

export const getUserApi = (): Promise<TUser> =>
  fetchWithRefresh<TUserResponse>(`${URL}/auth/user`).then((data) =>
    data.success ? data.user : Promise.reject(data)
  );

export const updateUserApi = (user: Partial<TRegisterData>): Promise<TUser> =>
  fetchWithRefresh<TUserResponse>(`${URL}/auth/user`, {
    method: 'PATCH',
    body: JSON.stringify(user)
  }).then((data) => (data.success ? data.user : Promise.reject(data)));

export const logoutApi = (): Promise<void> =>
  fetch(`${URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  })
    .then(checkResponse<TServerResponse<{}>>)
    .then((data) => {
      clearAuthTokens();
      return data.success ? undefined : Promise.reject(data);
    });
