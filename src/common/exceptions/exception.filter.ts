import {
  ArgumentsHost,
  Catch,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { ExceptionResponseBody } from './exaption.type';
import { QueryFailedError } from 'typeorm';

@Catch()
export class ExceptionFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let body: ExceptionResponseBody;

    if (exception instanceof HttpException) {
      body = {
        statusCode: exception.getStatus(),
        message: exception.getResponse(),
        error: exception.name,
      }
    } else if (exception instanceof InternalServerErrorException) {
      body = {
        statusCode: 500,
        message: "INTERNAL_SERVER_ERROR",
        error: exception.message,
      }
    } else if (exception instanceof QueryFailedError) {
      body = {
        statusCode: 500,
        message: exception.message,
        error: exception.driverError
      }
    } else {
      body = {
        statusCode: 500,
        message: "SOMETHING_HAPPENED",
        error: exception,
      }
    }


    response.json(body);
  }
}
