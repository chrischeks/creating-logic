import UniversalService from '@/@universal/service/universal.service';
import { ILoginResponse, ILogout } from '../logic.interface';
import config from 'config';
const { logoutAPI, cred, loginAPI } = config.get('config.APIS');
const { username, password } = cred;

export class AuthService extends UniversalService {
  public processLogin = async (): Promise<ILoginResponse> => {
    const requestBody = { username, password };
    const response = await this.centralAPICaller(loginAPI, requestBody, { 'content-type': 'application/json' }, 'post');
    const { status, data, statusText, statusCode, result } = response;

    if (status === 'success') {
      const { id, wallet, name } = data.profile;
      const { amount } = wallet;
      return { userId: id, amount, name, status: 'success' };
    } else {
      return { statusText, statusCode, status: 'error', message: result.message };
    }
  };

  public processLogout = async (): Promise<ILogout> => {
    // const logoutAPI = 'https://api.okra.ng/v2/mock-api/logout';
    const response = await this.centralAPICaller(logoutAPI, null, null, 'get');
    const { status, message, data, statusText, statusCode } = response;
    console.log(response);

    if (status === 'success') {
      const { status, msg } = data;
      return { status, message: msg };
    } else {
      return { status: 'failed', statusText, statusCode };
    }
  };
}
