import { Router } from 'express';
import Route from '@/@universal/interfaces/route.interface';
import CreatingLogicController from './logic.controller';

class CreatingLogicRoute implements Route {
  public path = '/customer';

  public router = Router();
  public creatingLogicController = new CreatingLogicController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.creatingLogicController.loginRefreshAndLogout);
  }
}

export default CreatingLogicRoute;
