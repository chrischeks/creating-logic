import UniversalController from '@/@universal/controller/universal.controller';
import { NextFunction, Request, Response } from 'express';
import { CreatingLogicService } from './service/logic.service';

class CreatingLogicController extends UniversalController {
  public creatingLogicService = new CreatingLogicService();

  public loginRefreshAndLogout = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const response = await this.creatingLogicService.processLoginRefreshAndLogout();
      const { status } = response;
      if (status === 'failed') return this.controllerResponseHandler(response, req, res);
      return this.controllerResponseHandler(response, req, res);
    } catch (error) {
      return this.controllerErrorHandler(req, res, error);
    }
  };
}

export default CreatingLogicController;
