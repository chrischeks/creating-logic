import UniversalService from '@/@universal/service/universal.service';
import { IWalletRefresh } from '../logic.interface';
import config from 'config';

const { walletRefreshAPI } = config.get('config.APIS');

export class WalletService extends UniversalService {
  public processRefreshWallet = async (walletId: string): Promise<IWalletRefresh> => {
    const requestBody = { id: walletId, variable: 'mockVariable' };
    const response = await this.centralAPICaller(walletRefreshAPI, requestBody, { 'content-type': 'application/json' }, 'post');

    const { status, data, statusText, statusCode, result } = response;
    if (status === 'success') {
      return { status: 'success', newAmount: data.wallet.amount };
    } else {
      return { status: 'error', statusText, statusCode, message: result.message };
    }
  };
}
