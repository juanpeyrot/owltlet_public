import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
	
  if (pathname.startsWith('/api')) {
    const apiKeyHeader = req.headers.get('x-api-key');
    if (!apiKeyHeader || apiKeyHeader !== API_KEY) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
  }

  return NextResponse.next();
}
