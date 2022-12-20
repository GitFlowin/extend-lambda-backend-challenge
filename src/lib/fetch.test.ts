import fetch, { Response } from 'node-fetch'
import { getWithTimeout } from './fetch'

jest.mock('node-fetch')

const mockedFetch: jest.Mock = fetch as any

describe('getWithTimeout', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should return a response', async () => {
    const url = new URL('https://www.example.com')

    mockedFetch.mockResolvedValueOnce(new Response())

    const res = await getWithTimeout(url)

    expect(res).not.toBeNull()
    expect(fetch).toHaveBeenCalled()
  })

  it('should abort the request if it exceeds the timeoutMs', async () => {
    const timeoutMs = 1 // Unrealistic timeout

    try {
      await getWithTimeout(new URL('https://www.extend.com/'), timeoutMs)
    } catch (error: any) {
      expect(error.name).toBe('AbortError')
    }
  })
})
