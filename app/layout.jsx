"use client";
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserContext } from '../lib/UserContext';
import { useRouter } from 'next/navigation';


export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  const [user, setUser] = useState();
  const router = useRouter();

  //user validation, if not validated return to login screen
  useEffect(() => {
    setUser({ loading: true });
    fetch('/api/userAuthCheck')
      .then(res => res.json())
      .then(data => {
        data.user ? setUser(data.user) : router.push('/login') && setUser({ user: null });
      });
  }, []);
  return (
    <UserContext.Provider value={[user, setUser]}>
      <QueryClientProvider client={queryClient}>
        <html lang="en">
          <head />
          <body>{children}</body>
        </html>
      </QueryClientProvider>
    </UserContext.Provider>
  )
}
