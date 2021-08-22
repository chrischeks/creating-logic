import UniversalService from '@/@universal/service/universal.service';
import { AuthService } from './auth.service';
import { ILoginResponse, IOutput } from '../logic.interface';
import { WalletService } from './wallet.service';

export class CreatingLogicService extends UniversalService {
  private authService = new AuthService();
  private walletService = new WalletService();
  public processLoginRefreshAndLogout = async (): Promise<IOutput> => {
    const login: ILoginResponse = await this.authService.processLogin();
    const { status, userId, amount, message, name, statusCode } = login;
    if (status === 'error') return { status, message: message || 'Login error', statusCode };

    const refreshWallet = await this.walletService.processRefreshWallet('mock', userId);
    const { status: refreshWalletStatus, newAmount, statusCode: refreshWalletCode } = refreshWallet;
    if (refreshWalletStatus === 'error')
      return { status: refreshWalletStatus, message: message || 'Wallet refresh error', statusCode: refreshWalletCode };

    const logOut = await this.authService.processLogout();
    const { status: logOutStatus, message: logOutMessage, statusText, statusCode: logOutCode } = logOut;
    console.log(logOutStatus, statusText, statusCode, 'status: logOutStatus, message: statusText, statusCode');

    if (logOutStatus === 'error') return { status: logOutStatus, message: statusText, statusCode: logOutCode };

    return {
      status: 'success',
      message: 'Okra-login-refresh-logout-bingo',
      statusCode: 200,
      data: { name, userId, balanceBeforeRefresh: `${amount}`, balanceAfterRefresh: newAmount, logOutMessage },
    };
  };
}
