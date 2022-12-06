import { Response, ErrorResponse } from '../../types/response';

export async function handler(): Promise<Response | ErrorResponse> {
  return {
    statusCode: 501,
    message: 'Not Implemented',
  };
}
