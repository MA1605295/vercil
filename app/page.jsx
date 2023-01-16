"use client"
import { useContext } from 'react';
import { UserContext } from '../lib/UserContext';
import Loading from '../components/loading';


export default function Home() {
  const [user] = useContext(UserContext);

  return <>{!user || user.loading ? <Loading /> : user.issuer && <div>You're logged in!</div>}</>;
}
