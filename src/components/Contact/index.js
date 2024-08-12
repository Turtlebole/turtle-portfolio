import React, { useRef } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';
import { Snackbar } from '@mui/material';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  padding: 20px;
  @media (max-width: 960px) {
    padding: 20px 10px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 40px 20px;
  background-color: transparent;
  border-radius: 16px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Title = styled.div`
  font-size: 36px;
  text-align: center;
  font-weight: 500;
  color: ${({ theme }) => theme.colored_detail};
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Desc = styled.div`
  font-size: 16px;
  text-align: center;
  max-width: 500px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ContactForm = styled.form`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 24px;
  border-radius: 12px;
  box-shadow: rgba(76, 81, 109, 0.15) 0px 4px 12px;
  gap: 12px;
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const ContactTitle = styled.div`
  font-size: 20px;
  margin-bottom: 8px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  border-bottom: 2px solid ${({ theme }) => theme.primary};
  padding: 10px;
  border-radius: 4px;
  &:focus {
    border-bottom: 2px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  border-bottom: 2px solid ${({ theme }) => theme.primary};
  padding: 10px;
  border-radius: 4px;
  resize: vertical;
  &:focus {
    border-bottom: 2px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.buttonGradient};
  padding: 12px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
    filter: brightness(1.2);
    box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px;
  }
`;

const Contact = () => {
  const [open, setOpen] = React.useState(false);
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const templateParams = {
      email: formData.get('from_email'),
      from_name: formData.get('from_name'),
      subject: formData.get('subject'),
      message_html: formData.get('message')
    };

    emailjs.sendForm('service_ta9bofd', 'template_uynwfeq', form.current, '7ob0JqA_SdDIyYJOa')
        .then((result) => {
          setOpen(true);
          form.current.reset();
        }, (error) => {
          console.log(error.text);
        });
  };

  return (
      <Container>
        <Wrapper>
          <Title>Contact</Title>
          <Desc>Reach out to me if you want to collaborate or book a project</Desc>
          <ContactForm ref={form} onSubmit={handleSubmit}>
            <ContactTitle>Message me</ContactTitle>
            <ContactInput placeholder="Your Email" name="from_email" required />
            <ContactInput placeholder="Your Name" name="from_name" required />
            <ContactInput placeholder="Subject" name="subject" required />
            <ContactInputMessage placeholder="Message" rows="4" name="message" required />
            <ContactButton type="submit">Send</ContactButton>
          </ContactForm>
          <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={() => setOpen(false)}
              message="Email sent successfully!"
              severity="success"
          />
        </Wrapper>
      </Container>
  );
};

export default Contact;
