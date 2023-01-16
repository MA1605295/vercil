"use client";
import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EmailForm from '../../components/email-form';
import { UserContext } from '../../lib/UserContext';
import { magic } from '../../lib/magic';

const Login = () => {
  const [disabled, setDisabled] = useState(false);
  const [user, setUser] = useContext(UserContext);
  const router = useRouter();

  // Redirect logged in users to /ideas if trying to visit login page
  useEffect(() => {
    user?.issuer && router.push('/ideas');
  }, [user]);

  async function handleLoginWithEmail(email) {
    try {
      setDisabled(true); // disable login button to prevent multiple emails from being triggered

      // Trigger Magic link to be sent to user
      let didToken = await magic.auth.loginWithMagicLink({ email });

      // Validate didToken with server
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + didToken,
        },
      });
      
      if (res.status === 200) {
        let data = await res.json();
        setUser(data.user);
        Router.push('/ideas');
      }
    } catch (error) {
      setDisabled(false); // re-enable login button - user may have requested to edit their email
      console.log(error);
    }
  }

  return (
    <div className='login'>
      <EmailForm disabled={disabled} onEmailSubmit={handleLoginWithEmail} />
      <style jsx>{`
        .login {
          max-width: 320px;
          margin: 40px auto 0;
          padding: 45px 15px;
          border: 1px solid #dfe1e5;
          border-radius: 8px;
          text-align: center;
          box-shadow: 0px 0px 6px 6px #f7f7f7;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};
export default Login;