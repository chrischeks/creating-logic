import UniversalService from '@/@universal/service/universal.service';
import { ILoginResponse, ILogout } from '../logic.interface';
import config from 'config';
const { logoutAPI, cred } = config.get('config.APIS');
const { username, password } = cred;

export class AuthService extends UniversalService {
  public processLogin = async (): Promise<ILoginResponse> => {
    const requestBody = { username, password };
    // const loginAPI = 'https://api.okra.ng/v2/mock-api/login';
    // const response = await this.centralAPICaller(loginAPI, requestBody, null, 'post');
    const response = {
      status: 'success',
      message: 'okra-login',
      data: {
        status: true,
        mockVariable: '1',
        userInfo: {
          name: 'Cheks Ude',
          id: '3',
        },
        wallet: { amount: '1000', wallet_id: '2' },
      },
      statusText: '',
      statusCode: 0,
    };
    const { status, message = 'Login failed', data, statusText, statusCode } = response;
    if (status === 'success') {
      const { userInfo, mockVariable, wallet } = data;
      const { wallet_id, amount } = wallet;
      return { userInfo, amount, mockVariable, walletId: wallet_id, status: 'sucess' };
      //   return this.successResponse({ userInfo, amount, mockVariable, walletId: wallet_id });
    } else {
      return { statusText, statusCode, status: 'failed' };
    }
  };

  public processLogout = async (): Promise<ILogout> => {
    // const logoutAPI = 'https://api.okra.ng/v2/mock-api/logout';
    const response = await this.centralAPICaller(logoutAPI, null, null, 'get');
    const { status, message, data, statusText, statusCode } = response;
    if (status === 'success') {
      const { status, msg } = data;
      return { status, message: msg };
    } else {
      return { status: 'failed', statusText, statusCode };
    }
  };
}
