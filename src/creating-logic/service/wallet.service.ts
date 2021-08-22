import UniversalService from '@/@universal/service/universal.service';
import { IWalletRefresh } from '../logic.interface';

export class WalletService extends UniversalService {
  public processRefreshWallet = async (mockVariable: string, walletId: string): Promise<IWalletRefresh> => {
    // const walletRefreshAPI = 'https://api.okra.ng/v2/mock-api/refresh-wallet';
    const requestBody = { wallet_id: walletId, variable: mockVariable };
    // const response = await this.centralAPICaller(walletRefreshAPI, requestBody, null, 'post');
    const response = {
      status: 'success',
      message: 'okra-wallet-refresh',
      data: {
        status: true,
        wallet: { amount: '2000', wallet_id: 2 },
      },
      statusText: '',
      statusCode: 0,
    };
    const { status, data, statusText, statusCode } = response;
    if (status === 'success') {
      return { status: 'success', newAmount: data.wallet.amount };
    } else {
      return { status: 'failed', statusText, statusCode };
    }
  };
}
