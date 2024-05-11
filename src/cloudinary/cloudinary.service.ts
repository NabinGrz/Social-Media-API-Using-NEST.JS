// cloudinary.service.ts

import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

import bufferToStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  public async uploadFile(file: {
    buffer: Buffer;
  }): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) {
          reject(error); // Reject the Promise with the error
        } else {
          resolve(result); // Resolve the Promise with the result
        }
      });

      // Convert the buffer into a Readable stream using bufferToStream
      const readableStream = bufferToStream(file.buffer);

      // Pipe the Readable stream into the upload stream
      readableStream.pipe(upload);
    });
  }
  public async uploadFiles(
    files: { buffer: Buffer }[],
  ): Promise<(UploadApiResponse | UploadApiErrorResponse)[]> {
    const uploadPromises: Promise<
      UploadApiResponse | UploadApiErrorResponse
    >[] = [];

    for (const file of files) {
      const uploadPromise = new Promise<
        UploadApiResponse | UploadApiErrorResponse
      >((resolve, reject) => {
        const upload = v2.uploader.upload_stream((error, result) => {
          if (error) {
            reject(error); // Reject the Promise with the error
          } else {
            resolve(result); // Resolve the Promise with the result
          }
        });

        // Convert the buffer into a Readable stream using bufferToStream
        const readableStream = bufferToStream(file.buffer);

        // Pipe the Readable stream into the upload stream
        readableStream.pipe(upload);
      });

      uploadPromises.push(uploadPromise);
    }

    return Promise.all(uploadPromises);
  }
}
