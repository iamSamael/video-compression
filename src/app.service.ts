import { Injectable } from '@nestjs/common';
import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegPath from 'ffmpeg-static';
import * as cliProgress from 'cli-progress';

@Injectable()
export class AppService {
  async compressVideo(inputPath: string, outputPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
      progressBar.start(100, 0);

      ffmpeg(inputPath)
        .setFfmpegPath(ffmpegPath)
        .outputOptions('-vf scale=640:-1')
        .outputOptions('-b:v 500k')
        .outputOptions('-crf 50')
        .on('progress', progress => {
          if (progress.percent) {
            progressBar.update(progress.percent);
          }
        })
        .on('end', () => {
          progressBar.update(100);
          progressBar.stop();
          console.log('Processing finished successfully');
          resolve();
        })
        .on('error', (err) => {
          progressBar.stop();
          console.log('Error: ' + err.message);
          reject(err);
        })
        .save(outputPath);
    });
  }
}
