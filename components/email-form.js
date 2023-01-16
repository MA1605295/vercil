import { useState } from 'react';
import { Input, Icon, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';

const EmailForm = ({ onEmailSubmit, disabled }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    onEmailSubmit(email);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <Input
            placeholder="Enter your email"
            size="sm"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            prefix={<Icon inline type={EmailIcon} size={22} />}
          />
        </div>
        <div>
          <Button variant="contained" color="primary" size="sm" endIcon={<SendIcon />} disabled={disabled} onClick={handleSubmit}>
            Send Magic Link
          </Button>
        </div>
      </form>
      <style jsx>{`
        form,
        label {
          display: flex;
          flex-flow: column;
          text-align: center;
        }
        .form-header {
          font-size: 22px;
          margin-bottom: 25px;
        }
        .input-wrapper {
          width: 75%;
          margin: 0 auto 20px;
        }
      `}</style>
    </>
  );
};

export default EmailForm;
