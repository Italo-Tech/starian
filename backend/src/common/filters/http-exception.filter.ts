import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

interface ErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
  timestamp: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const { status, body } = this.buildErrorResponse(exception);

    response.status(status).json(body);
  }

  private buildErrorResponse(exception: unknown): {
    status: number;
    body: ErrorResponse;
  } {
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      const message =
        typeof exceptionResponse === 'object' &&
          'message' in exceptionResponse
          ? (exceptionResponse as Record<string, unknown>).message
          : exception.message;

      return {
        status,
        body: {
          statusCode: status,
          message: message as string | string[],
          error: exception.name,
          timestamp: new Date().toISOString(),
        },
      };
    }

    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      body: {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Erro interno do servidor',
        error: 'Internal Server Error',
        timestamp: new Date().toISOString(),
      },
    };
  }
}
