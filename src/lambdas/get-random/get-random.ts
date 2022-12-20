import fetch, { Response as NodeFetchResponse } from 'node-fetch'
import { Response, HandlerResponse } from '../../types/response'

const GET_RANDOM_URL = 'https://dog.ceo/api/breeds/image/random'

interface RandomResponse extends Response {
  body: RandomDog
}

interface RandomDog {
  message: string
  status: string
}

export const handler = async (): Promise<HandlerResponse<RandomResponse>> => {
  try {
    const res: NodeFetchResponse = await fetch(GET_RANDOM_URL)

    const payload: RandomDog = await res.json()

    return {
      statusCode: 200,
      body: payload,
    }
  } catch (error: unknown) {
    return {
      statusCode: 500,
      message: 'Something went wrong',
    }
  }
}
