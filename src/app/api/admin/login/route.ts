import { NextResponse } from 'next/server';
import { checkPassword, getExpectedToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }
    
    if (checkPassword(password)) {
      const response = NextResponse.json({ success: true, message: 'Logged in successfully' });
      
      // Set secure cookie
      response.cookies.set('admin_token', getExpectedToken(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
      
      return response;
    }
    
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred during login' }, { status: 500 });
  }
}
