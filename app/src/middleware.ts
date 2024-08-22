import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ThemeMode } from '@/types/theme';
import { THEME_COOKIE_NAME } from './constants/cookies';

export const middleware = (req: NextRequest) => {

  const themeCookie = req.cookies.get(THEME_COOKIE_NAME)
  if (themeCookie) {
    const response = NextResponse.next();
    if (Object.values(ThemeMode).includes(themeCookie.value as ThemeMode)) {
      // Reset cookie and refresh expiry
      response.cookies.set(THEME_COOKIE_NAME, themeCookie.value as ThemeMode, { path: '/', maxAge: 60 * 60 * 24 * 365 });
    } else {
      // Delete unknown junk values
      response.cookies.delete(THEME_COOKIE_NAME);
    }
    return response;
  }

  return NextResponse.next();
}
