import fetch, { Response as NodeFetchResponse } from 'node-fetch';
import { Response, ErrorResponse } from '../../types/response';
import { INTERNAL_SERVER_ERROR, OK } from '../../lib/statusCodes';
import { flattenBreeds } from '../../lib/breeds';

const GET_BREEDS_URL = 'https://dog.ceo/api/breeds/list/all';

interface BreedsResponse extends Response {
  body: string[];
}

export const handler = async (): Promise<BreedsResponse | ErrorResponse> => {
  try {
    const res: NodeFetchResponse = await fetch(GET_BREEDS_URL);

    const { message: breeds } = await res.json();

    const groupedBreeds = flattenBreeds(breeds);

    return {
      statusCode: OK,
      body: groupedBreeds,
    };
  } catch (error: unknown) {
    return {
      statusCode: INTERNAL_SERVER_ERROR,
      message: JSON.stringify(error),
    };
  }
};
