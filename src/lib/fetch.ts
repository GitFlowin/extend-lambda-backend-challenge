import fetch, { Response as NodeFetchResponse } from 'node-fetch';
import AbortController from 'abort-controller';

export const getWithTimeout = async (url: URL, timeoutMs?: number): Promise<NodeFetchResponse> => {
  const TIMEOUT_MS = timeoutMs || 300;

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, TIMEOUT_MS);

  try {
    const res: NodeFetchResponse = await fetch(url, { signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timeout);
  }
};
