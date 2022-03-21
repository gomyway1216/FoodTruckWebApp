import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { Box, Button, Dialog, DialogTitle, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './contact-page.module.scss';

const ContactPage = () => {
  const [input, setInput] = useState({
    'name': '',
    'email': '',
    'message': ''
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const navigate = useNavigate();

  const handleClose = () => {
    setDialogOpen(false);
    if (isSuccess) {
      navigate('/');
    }
  };

  const onSave = async () => {
    if(input.name && input.email && input.message) {
      emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE_ID, 
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID, input, process.env.REACT_APP_EMAILJS_USER_ID)
        .then((result) => {
          setIsSuccess(true);
          setDialogMessage('We got your message. We will get back to you shortly!');
          setDialogOpen(true);
        }, (error) => {
          setDialogMessage('Some issue happened. Please try again!');
          setDialogOpen(true);
        });
    } else {
      setDialogMessage('Please fill out all the fields.');
      setDialogOpen(true);
    }
  };

  const handleInputChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <div className={styles.contactRoot}>
        <div className={styles.title}>Contact Us</div>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          className={styles.formContainer}
        >
          <div className={styles.description}>We care about your opinion/advice. Please contact us for any questions/suggestions!</div>
          <TextField id="name" name="name" label="Name" variant="outlined" value={input.name} onChange={handleInputChange} className={styles.textBox} required/>
          <TextField id="email" name="email" label="Email" variant="outlined" value={input.email} onChange={handleInputChange} className={styles.textBox} required/>
          <TextField id="message" name="message" multiline label="Message" variant="outlined" value={input.message} rows={4} fullWidth onChange={handleInputChange} className={styles.textBox} required/>
          <Button variant="outlined" className={styles.submitButton} onClick={onSave}>Submit</Button>
        </Box>
      </div>
      <Dialog onClose={handleClose} open={dialogOpen}>
        <DialogTitle>{dialogMessage}</DialogTitle>
        <Button variant="outlined" onClick={handleClose}>Close</Button>
      </Dialog>
    </>
  );
};

export default ContactPage;