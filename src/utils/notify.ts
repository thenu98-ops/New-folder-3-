// Her answers are emailed to you via FormSubmit (free, no account or key needed).
// IMPORTANT: the very first email sent goes to you as an "Activate form" email —
// click Activate once, and every email after that arrives normally.
export const EMAIL_TO = 'thenurathisalkarunarathna@gmail.com';

const STORAGE_KEY = 'faith-fairytale-log';

/** Keeps a local backup of every event on her device. */
export function logEvent(event: string, value: string) {
  try {
    const existing: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    existing.push(`${new Date().toISOString()} — ${event}: ${value}`);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {

    // storage unavailable — ignore
  }}

/** Sends one email with every field as a row in a table. */
export function sendEmail(subject: string, fields: Record<string, string>) {
  fetch(`https://formsubmit.co/ajax/${EMAIL_TO}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      _subject: subject,
      _template: 'table',
      _captcha: 'false',
      Sent: new Date().toLocaleString(),
      ...fields
    }),
    keepalive: true
  }).catch(() => {

    // never block her experience if the network fails
  });}
