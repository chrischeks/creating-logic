import UniversalService from '@/@universal/service/universal.service';
import { AuthService } from './auth.service';
import { ILoginResponse, IOutput } from '../logic.interface';
import { WalletService } from './wallet.service';

export class CreatingLogicService extends UniversalService {
  private authService = new AuthService();
  private walletService = new WalletService();
  public processLoginRefreshAndLogout = async (): Promise<IOutput> => {
    const login: ILoginResponse = await this.authService.processLogin();
    const { status, userId, amount, message, name, statusCode, statusText } = login;
    if (status === 'error') return { status, message: message || statusText || 'Login error', statusCode };

    const refreshWallet = await this.walletService.processRefreshWallet(userId);
    const { status: refreshWalletStatus, newAmount, statusCode: refreshWalletCode, statusText: refreshWalletStatusText } = refreshWallet;
    if (refreshWalletStatus === 'error')
      return { status: refreshWalletStatus, message: message || refreshWalletStatusText || 'Wallet refresh error', statusCode: refreshWalletCode };

    const logOut = await this.authService.processLogout();
    const { status: logOutStatus, message: logOutMessage, statusText: logoutStatusText, statusCode: logOutCode } = logOut;

    if (logOutStatus === 'error')
      return { status: logOutStatus, message: logOutMessage || logoutStatusText || 'Logout error', statusCode: logOutCode };

    return {
      status: 'success',
      message: 'Okra-login-refresh-logout-bingo',
      statusCode: 200,
      data: { name, userId, balanceBeforeRefresh: `${amount}`, balanceAfterRefresh: newAmount, logOutMessage },
    };
  };
}
