import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AxiosService } from './services/axios.services';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getHello(): Promise<object> {
    // axiosserviceyi çalıştır
    const axiosService = new AxiosService();
    return (await axiosService.getArticles('2020/10/01'));
  }
}
