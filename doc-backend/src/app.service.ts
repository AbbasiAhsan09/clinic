import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

@Injectable()
export class AppService {
  async getHello() {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage() 
      page.goto('https://www.youtube.com');
    } catch (err) {
      throw  new Error(err);
    }
  }

  openNewUrl(){

  }
}
