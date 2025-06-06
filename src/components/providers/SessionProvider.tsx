'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';

export interface SessionProviderProps {
  children: React.ReactNode;
  session?: Session | null;
}

export default function SessionProvider({ children, session }: SessionProviderProps) {
  return (
    <NextAuthSessionProvider session={session} refetchInterval={5 * 60}>
      {children}
    </NextAuthSessionProvider>
  );
}
