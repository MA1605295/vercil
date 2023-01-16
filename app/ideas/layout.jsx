"use client";
import Button from '@mui/material/Button';
import Link from 'next/link';
export default function MatchesLayout({ children }) {
  return (
    <>
      <Link href="/api/logout">
        <Button variant="text" color="warning" size="sm">Logout</Button>
      </Link>
      {children}
    </>
  )
}
