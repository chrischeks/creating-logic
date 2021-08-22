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
  userInfo?: {
    name: string;
    id: string;
  };
  amount?: string;
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
