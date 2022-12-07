import fetch, { Response as NodeFetchResponse } from 'node-fetch';
import AbortController from "abort-controller"
import { Response, ErrorResponse } from '../../types/response';
import { OK, INTERNAL_SERVER_ERROR } from '../../lib/statusCodes';
import { flattenBreeds } from '../../lib/breeds';

const GET_BREEDS_URL = 'https://dog.ceo/api/breeds/list/all';
const TIMEOUT_MS = 300;

const controller = new AbortController();

const timeout = setTimeout(() => {
	controller.abort();
}, TIMEOUT_MS);

interface BreedsResponse extends Response {
  body: string[];
}

export const handler = async (): Promise<BreedsResponse | ErrorResponse> => {
  try {
    const res: NodeFetchResponse = await fetch(GET_BREEDS_URL, { signal: controller.signal });

    const { status, message, code } = await res.json();

    if (status == 'error') {
      return {
        statusCode: code,
        message
      };    
    }

    const groupedBreeds = flattenBreeds(message);

    return {
      statusCode: OK,
      body: groupedBreeds,
    };
  } catch (error: unknown) {
    return {
      statusCode: INTERNAL_SERVER_ERROR,
      message: JSON.stringify(error),
    };
  } finally {
    clearTimeout(timeout);
  }
};
