import UniversalService from '@/@universal/service/universal.service';
import { AuthService } from './auth.service';
import { ILoginResponse, IOutput } from '../logic.interface';
import { WalletService } from './wallet.service';

export class CreatingLogicService extends UniversalService {
  private authService = new AuthService();
  private walletService = new WalletService();
  public processLoginRefreshAndLogout = async (): Promise<IOutput> => {
    const login: ILoginResponse = await this.authService.processLogin();
    const { status, userInfo, amount, mockVariable, walletId, message } = login;
    if (status === 'failed') return { status, message: `Login failed (${message})` };

    const refreshWallet = await this.walletService.processRefreshWallet(mockVariable, walletId);
    const { status: refreshWalletStatus, newAmount } = refreshWallet;
    if (refreshWalletStatus === 'failed') return { status: refreshWalletStatus, message: `Wallet refresh failed (${message})` };

    const logOut = await this.authService.processLogout();
    const { status: logOutStatus, message: logOutMessage, statusText, statusCode } = logOut;
    if (logOutStatus === 'failed') return { status: logOutStatus, message: statusText, statusCode };
    const { name, id } = userInfo;
    return {
      status: 'success',
      message: 'Okra-login-refresh-logout-bingo',
      data: { name, userId: id, balanceBeforeRefresh: amount, balanceAfterRefresh: newAmount, logOutMessage },
    };
  };
}
