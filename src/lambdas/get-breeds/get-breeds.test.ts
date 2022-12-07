import fetch from 'node-fetch';
import { handler } from './get-breeds';

jest.mock('node-fetch');

const mockedFetch: jest.Mock = fetch as any;

const mockFetchResponse = {
  message: {
    affenpinscher: [],
    african: [],
    australian: ['shepherd'],
    bulldog: ['boston', 'english', 'french'],
  },
  status: 'success',
};

describe('get-breeds', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return all breeds', async () => {
    mockedFetch.mockResolvedValueOnce({
      json: () => {
        return mockFetchResponse;
      },
    });

    const response = await handler();

    expect(response).not.toBeNull();
    expect(response.statusCode).toEqual(200);
    if ('body' in response) {
      expect(response.body).toEqual([
        'affenpinscher',
        'african',
        'shepherd australian',
        'boston bulldog',
        'english bulldog',
        'french bulldog',
      ]);
    }
  });
});
