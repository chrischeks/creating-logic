export interface ILogin {
  username: string;
  password: string;
}

interface IBase {
  message?: string;
  status: string;
  statusCode?: number;
  statusText?: string;
}

export interface ILoginResponse extends IBase {
  name?: string;
  userId?: string;
  amount?: number;
  mockVariable?: string;
  walletId?: string;
}

export interface IOutput extends IBase {
  data?: { name: string; userId: string; balanceBeforeRefresh: string; balanceAfterRefresh: string; logOutMessage: string };
}

export interface IWalletRefresh extends IBase {
  newAmount?: string;
}

export interface ILogout extends IBase {}
