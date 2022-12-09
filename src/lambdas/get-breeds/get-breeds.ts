import { Response, HandlerResponse } from '../../types/response'
import { OK, INTERNAL_SERVER_ERROR } from '../../lib/statusCodes'
import { flattenBreeds } from '../../lib/breeds'
import { getWithTimeout } from '../../lib/fetch'

const GET_BREEDS_URL = 'https://dog.ceo/api/breeds/list/all'

interface BreedsResponse extends Response {
  body: string[]
}

export const handler = async (): Promise<HandlerResponse<BreedsResponse>> => {
  try {
    const res = await getWithTimeout(new URL(GET_BREEDS_URL))

    const { status, message, code } = await res.json()

    if (status !== 'success') {
      return {
        statusCode: code,
        message,
      }
    }

    const groupedBreeds = flattenBreeds(message)

    return {
      statusCode: OK,
      body: groupedBreeds,
    }
  } catch (error: any) {
    return {
      statusCode: INTERNAL_SERVER_ERROR,
      message: JSON.stringify(error.message),
    }
  }
}
