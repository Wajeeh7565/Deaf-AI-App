const DEFAULT_BASE_URL = 'https://6d75lyt478.execute-api.us-east-2.amazonaws.com';

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });

export default async (request) => {
  if (request.method !== 'POST') return json(405, { error: 'Method not allowed' });

  const token = process.env.DEAF_AI_PILOT_TOKEN;
  if (!token) {
    return json(500, {
      error: 'DEAF_AI_PILOT_TOKEN is not configured on Netlify.',
    });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json(400, { error: 'Invalid JSON body.' });
  }

  const baseUrl = (process.env.DEAF_AI_BASE_URL || DEFAULT_BASE_URL).replace(/\/$/, '');
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  };

  let upstream;
  try {
    if (body?.action === 'generate') {
      if (!body.payload || typeof body.payload !== 'object') {
        return json(400, { error: 'Missing generate payload.' });
      }
      upstream = await fetch(`${baseUrl}/generate-video`, {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(body.payload),
      });
    } else if (body?.action === 'status') {
      if (!body.jobId || typeof body.jobId !== 'string') {
        return json(400, { error: 'Missing jobId.' });
      }
      upstream = await fetch(`${baseUrl}/job-status/${encodeURIComponent(body.jobId)}`, {
        method: 'GET',
        headers,
      });
    } else {
      return json(400, { error: 'Unknown action.' });
    }
  } catch (error) {
    return json(502, { error: `Could not reach Deaf AI pilot API: ${error?.message || 'network error'}` });
  }

  const text = await upstream.text();
  let payload;
  try {
    payload = text ? JSON.parse(text) : {};
  } catch {
    payload = { message: text };
  }

  return json(upstream.status, payload);
};
