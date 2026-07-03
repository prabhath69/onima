import { cookies } from 'next/headers';
import crypto from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export function getExpectedToken(): string {
  return crypto.createHash('sha256').update(ADMIN_PASSWORD + 'onima-salt-2026').digest('hex');
}

export async function verifyAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  return token === getExpectedToken();
}

export function checkPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}
