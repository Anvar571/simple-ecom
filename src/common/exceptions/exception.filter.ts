import {
  ArgumentsHost,
  Catch,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { ExceptionResponseBody } from './exaption.type';

@Catch()
export class ExceptionFilter extends BaseExceptionFilter {
  public override async catch(
    exception: unknown,
    host: ArgumentsHost,
  ): Promise<void> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let body: ExceptionResponseBody;

    if (exception instanceof NotFoundException) {
      body = {
        statusCode: exception.getStatus(),
        message: exception.message,
        error: exception.name,
      };
    } else {
      body = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'There is some problem with the server',
        error: 'INTERNAL_SERVER_ERROR',
      };
    }

    response.json(body);
  }
}
