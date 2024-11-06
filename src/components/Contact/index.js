import React, { useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';
import { Snackbar, Alert } from '@mui/material';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 80px 0;
    background: ${({ theme }) => theme.bg};
    
    @media (max-width: 960px) {
        padding: 60px 20px;
    }
`;

const Wrapper = styled.div`
    max-width: 1100px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;

    @media (max-width: 960px) {
        grid-template-columns: 1fr;
        gap: 30px;
    }
`;

const LeftSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-right: 20px;

    @media (max-width: 960px) {
        padding-right: 0;
        text-align: center;
        align-items: center;
    }
`;

const Title = styled.h2`
    font-size: 42px;
    font-weight: 700;
    color: ${({ theme }) => theme.text_primary};
    line-height: 1.2;

    @media (max-width: 768px) {
        font-size: 32px;
    }
`;

const Desc = styled.p`
    font-size: 18px;
    line-height: 1.6;
    color: ${({ theme }) => theme.text_secondary};
    margin-bottom: 20px;

    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

const ContactInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    @media (max-width: 960px) {
        align-items: center;
    }
`;

const InfoItem = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    color: ${({ theme }) => theme.text_secondary};
    font-size: 16px;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`;

const ContactForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    background: ${({ theme }) => theme.card};
    padding: 32px;
    border-radius: 20px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
    border: 1px solid ${({ theme }) => theme.card_border};

    @media (max-width: 768px) {
        padding: 20px;
    }
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Label = styled.label`
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_secondary};
`;

const Input = styled.input`
    width: 100%;
    padding: 12px 16px;
    background: ${({ theme }) => theme.bg};
    border: 1px solid ${({ theme }) => theme.card_border};
    border-radius: 12px;
    color: ${({ theme }) => theme.text_primary};
    font-size: 16px;
    outline: none;
    transition: all 0.3s ease;

    &:focus {
        border-color: ${({ theme }) => theme.primary};
        box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}20;
    }

    @media (max-width: 768px) {
        font-size: 14px;
        padding: 10px 14px;
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 12px 16px;
    background: ${({ theme }) => theme.bg};
    border: 1px solid ${({ theme }) => theme.card_border};
    border-radius: 12px;
    color: ${({ theme }) => theme.text_primary};
    font-size: 16px;
    outline: none;
    resize: vertical;
    min-height: 120px;
    transition: all 0.3s ease;

    &:focus {
        border-color: ${({ theme }) => theme.primary};
        box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}20;
    }

    @media (max-width: 768px) {
        font-size: 14px;
        padding: 10px 14px;
        min-height: 100px;
    }
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 16px 32px;
    background: ${({ theme }) => theme.primary}15;
    color: ${({ theme }) => theme.primary};
    border: 1.8px solid ${({ theme }) => theme.primary};
    border-radius: 12px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.2s ease;

    svg {
        font-size: 20px;
    }

    &:hover {
        background: ${({ theme }) => theme.primary}30;
        color: ${({ theme }) => theme.primary};
        box-shadow: 0 5px 10px ${({ theme }) => theme.primary}15;
    }

    @media screen and (max-width: 768px) {
        padding: 12px 24px;
        font-size: 16px;
        
        svg {
            font-size: 18px;
        }
    }
`;

const Contact = () => {
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const form = useRef();

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        emailjs.sendForm('service_ta9bofd', 'template_uynwfeq', form.current, '7ob0JqA_SdDIyYJOa')
            .then(() => {
                setOpen(true);
                setErrorMessage('');
                form.current.reset();
            })
            .catch((error) => {
                console.error(error.text);
                setErrorMessage('Failed to send the email. Please try again later.');
                setOpen(true);
            });
    }, []);

    return (
        <Container>
            <Wrapper>
                <LeftSection>
                    <Title>Contact me</Title>
                    <Desc>
                        Feel free to reach out if you're looking for a frontend developer, 
                        have a question, or just want to connect.
                    </Desc>
                    <ContactInfo>
                        <InfoItem>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                <polyline points="22,6 12,13 2,6"/>
                            </svg>
                            turtlebole@gmail.com
                        </InfoItem>
                    </ContactInfo>
                </LeftSection>

                <ContactForm ref={form} onSubmit={handleSubmit}>
                    <InputGroup>
                        <Label>Name</Label>
                        <Input name="from_name" required placeholder="Your name" />
                    </InputGroup>
                    <InputGroup>
                        <Label>Email</Label>
                        <Input type="email" name="from_email" required placeholder="Your email" />
                    </InputGroup>
                    <InputGroup>
                        <Label>Subject</Label>
                        <Input name="subject" required placeholder="About your subject" />
                    </InputGroup>
                    <InputGroup>
                        <Label>Message</Label>
                        <TextArea name="message" required placeholder="Your message" />
                    </InputGroup>
                    <SubmitButton type="submit">
                        <svg 
                            width="20" 
                            height="20" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        >
                            <path d="M22 2L11 13"/>
                            <path d="M22 2L15 22L11 13L2 9L22 2z"/>
                        </svg>
                        Send Message
                    </SubmitButton>
                </ContactForm>
            </Wrapper>

            <Snackbar 
                open={open} 
                autoHideDuration={6000} 
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert 
                    onClose={() => setOpen(false)} 
                    severity={errorMessage ? "error" : "success"} 
                    sx={{ width: '100%' }}
                >
                    {errorMessage || "Message sent successfully!"}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Contact;
