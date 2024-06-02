import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class AppCommonService {
//   private readonly filePath: string = 'path/to/your/json/file.json';

  async extractJsonFile(filePath:string): Promise<any> {
    try {
      const data =  fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      throw new Error(err);
    }
  }
}