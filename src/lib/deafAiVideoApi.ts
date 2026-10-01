export type PilotAnnouncementType =
  | 'greeting'
  | 'preboarding'
  | 'final_call'
  | 'delayed'
  | 'cancelled'
  | 'gate_change'
  | 'boarding'
  | 'passenger_page';

export type PilotLanguage = 'ASL' | 'LSQ';

export interface PilotVideoRequest {
  airportName: string;
  gateNumber: string;
  airlineName: string;
  destinationName: string;
  flightNumber: string;
  announcementType: PilotAnnouncementType;
  language: PilotLanguage;
}

export type PilotJobState = 'idle' | 'requesting' | 'pending' | 'running' | 'completed' | 'failed';

interface GenerateResponse {
  jobId?: string;
  status?: string;
  error?: string;
  message?: string;
}

interface StatusResponse extends GenerateResponse {
  videoUrl?: string;
}

const FUNCTION_URL = '/.netlify/functions/deaf-ai-video';

async function callProxy(body: Record<string, unknown>) {
  const response = await fetch(FUNCTION_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  });

  const raw = await response.text();
  let data: any = {};
  try {
    data = raw ? JSON.parse(raw) : {};
  } catch {
    data = { message: raw || `HTTP ${response.status}` };
  }

  if (!response.ok) {
    throw new Error(data?.error || data?.message || `API request failed (${response.status})`);
  }
  return data;
}

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

/**
 * Request one pilot announcement video and poll until the temporary video URL is ready.
 * The bearer token never enters browser code; the Netlify Function adds it server-side.
 */
export async function requestPilotVideo(
  payload: PilotVideoRequest,
  onState?: (state: PilotJobState) => void,
  options: { pollMs?: number; maxPolls?: number } = {},
): Promise<string> {
  const pollMs = options.pollMs ?? 2000;
  const maxPolls = options.maxPolls ?? 20;

  onState?.('requesting');
  const created = (await callProxy({ action: 'generate', payload })) as GenerateResponse;
  if (!created.jobId) throw new Error(created.error || created.message || 'API did not return a jobId.');

  for (let attempt = 0; attempt < maxPolls; attempt += 1) {
    if (attempt > 0) await wait(pollMs);
    const result = (await callProxy({ action: 'status', jobId: created.jobId })) as StatusResponse;
    const status = result.status;

    if (status === 'completed') {
      if (!result.videoUrl) throw new Error('Job completed but no videoUrl was returned.');
      onState?.('completed');
      return result.videoUrl;
    }
    if (status === 'failed') {
      onState?.('failed');
      throw new Error(result.error || result.message || 'Video generation failed.');
    }
    if (status === 'running') onState?.('running');
    else onState?.('pending');
  }

  onState?.('failed');
  throw new Error('Timed out waiting for the pilot video.');
}

