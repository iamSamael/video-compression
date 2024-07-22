import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('compress')
  async compressVideo(@Body() body: { inputPath: string, outputPath: string }) {
    const { inputPath, outputPath } = body;
    await this.appService.compressVideo(inputPath, outputPath);

    return {
      message: 'File compressed successfully',
      outputPath: outputPath,
    };
  }
}
