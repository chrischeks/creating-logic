import { Error } from 'mongoose';
import fetch from 'node-fetch';

class UniversalService {
  protected centralAPICaller = async (api: string, requestBody, headers, method: string) => {
    let payLoad = { headers, method, body: requestBody ? JSON.stringify(requestBody) : null };
    try {
      const response = await fetch(api, payLoad);
      const { ok, statusText, status: statusCode } = response;
      if (ok) {
        return response.json();
      } else {
        return { statusText, statusCode };
      }
    } catch (error) {
      throw new Error('Operation failed');
    }
  };
}
export default UniversalService;
