import React from 'react'
import styled from 'styled-components'
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Snackbar } from '@mui/material';

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
position: relative;
z-index: 1;
align-items: center;
@media (max-width: 960px) {
    padding: 0px;
}
`

const Wrapper = styled.div`
position: relative;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: column;
width: 100%;
max-width: 1350px;
padding: 0px 0px 80px 0px;
gap: 12px;
@media (max-width: 960px) {
    flex-direction: column;
}
`

const Title = styled.div`
font-size: 42px;
text-align: center;
font-weight: 400;
margin-top: 20px;
  color: ${({ theme }) => theme.colored_detail};
  @media (max-width: 768px) {
      margin-top: 12px;
      font-size: 32px;
  }
`;

const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 16px;
    }
`;


const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  align-items: left;
  margin-left: 20px;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(76, 81, 109, 0.15) 0px 4px 12px;
  margin-top: 28px;
  gap: 12px;
`

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 0;
  border-bottom: 2px solid ${({ theme }) => theme.primary};
  padding: 12px 16px;
  &:focus {
    border-bottom: 2px solid ${({ theme }) => theme.primary}; 
  }
`

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 0;
  border-bottom: 2px solid ${({ theme }) => theme.primary}; 
  padding: 12px 16px;
  &:focus {
    border-bottom: 2px solid ${({ theme }) => theme.primary}; 
  }
`

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: linear-gradient(270deg, hsla(0, 15%, 25%, 1) 0%, hsla(30, 29%, 43%, 1) 100%);
  background: -moz-linear-gradient(270deg, hsla(0, 15%, 25%, 1) 0%, hsla(30, 29%, 43%, 1) 100%);
  background: -webkit-linear-gradient(270deg, hsla(0, 15%, 25%, 1) 0%, hsla(30, 29%, 43%, 1) 100%);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  &:hover {
      transform: scale(1.05);
      filter: brightness(1.2);
  transition: all 0.4s ease-in-out;
  box-shadow:  20px 20px 60px #1F2634,
  filter: brightness(1);
`



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
    }

    emailjs.sendForm('service_ta9bofd', 'template_uynwfeq', form.current, '7ob0JqA_SdDIyYJOa')
      .then((result) => {
        setOpen(true);
        form.current.reset();
      }, (error) => {
        console.log(error.text);
      });
  }

  return (
    <Container>
      <Wrapper>
        <Title>Contact</Title>
        <Desc>Reach out to me if you want to collaborate or book a project</Desc>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>Message me</ContactTitle>
          <ContactInput placeholder="Your Email" name="from_email" />
          <ContactInput placeholder="Your Name" name="from_name" />
          <ContactInput placeholder="Subject" name="subject" />
          <ContactInputMessage placeholder="Message" rows="4" name="message" />
          <ContactButton type="submit" value="Send" />
        </ContactForm>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={()=>setOpen(false)}
          message="Email sent successfully!"
          severity="success"
        />
      </Wrapper>
    </Container>
  )
}

export default Contact