import React, { useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';
import { Snackbar, Alert } from '@mui/material';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 80px 0;
    position: relative;
    overflow: hidden;
    z-index: 1;
    
    @media (max-width: 960px) {
        padding: 60px 20px;
    }
    
    @media (max-width: 480px) {
        padding: 50px 16px;
    }
`;

const Wrapper = styled.div`
    max-width: 1100px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    position: relative;
    z-index: 2;

    @media (max-width: 960px) {
        grid-template-columns: 1fr;
        gap: 40px;
    }
    
    @media (max-width: 480px) {
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
    
    @media (max-width: 480px) {
        gap: 18px;
    }
`;

const Title = styled.h2`
    font-size: 42px;
    font-weight: 700;
    color: ${({ theme }) => theme.text_primary};
    line-height: 1.2;
    background: linear-gradient(
        135deg,
        ${({ theme }) => theme.text_primary} 0%,
        ${({ theme }) => theme.primary} 50%,
        ${({ theme }) => theme.text_primary} 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientText 6s ease infinite;
    
    @keyframes gradientText {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    @media (max-width: 768px) {
        font-size: 32px;
    }
    
    @media (max-width: 480px) {
        font-size: 28px;
    }
`;

const Desc = styled.p`
    font-size: 18px;
    line-height: 1.6;
    color: ${({ theme }) => theme.text_secondary};
    margin-bottom: 20px;

    @media (max-width: 768px) {
        font-size: 16px;
        margin-bottom: 15px;
    }
    
    @media (max-width: 480px) {
        font-size: 15px;
        line-height: 1.5;
    }
`;

const ContactInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    @media (max-width: 960px) {
        align-items: center;
    }
    
    @media (max-width: 480px) {
        gap: 12px;
    }
`;

const InfoItem = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    color: ${({ theme }) => theme.text_secondary};
    font-size: 16px;
    transition: all 0.3s ease;
    
    &:hover {
        color: ${({ theme }) => theme.primary};
        transform: translateY(-2px);
    }

    svg {
        color: ${({ theme }) => theme.primary};
    }

    @media (max-width: 768px) {
        font-size: 15px;
    }
    
    @media (max-width: 480px) {
        font-size: 14px;
        gap: 8px;
    }
`;

const ContactForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    background: ${({ theme }) => theme.card};
    padding: 32px;
    border-radius: 20px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    border: 1px solid ${({ theme }) => theme.text_primary + '15'};
    transition: all 0.3s ease;
    transform: translateY(0);
    
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        border-color: ${({ theme }) => theme.primary + '60'};
    }

    @media (max-width: 768px) {
        padding: 24px;
        gap: 16px;
    }
    
    @media (max-width: 480px) {
        padding: 20px;
        gap: 14px;
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
    transition: color 0.3s ease;
    
    ${InputGroup}:focus-within & {
        color: ${({ theme }) => theme.primary};
    }
`;

const Input = styled.input`
    width: 100%;
    padding: 12px 16px;
    background: ${({ theme }) => theme.bg};
    border: 1px solid ${({ theme }) => theme.text_primary + '20'};
    border-radius: 12px;
    color: ${({ theme }) => theme.text_primary};
    font-size: 16px;
    outline: none;
    transition: all 0.3s ease;

    &:focus {
        border-color: ${({ theme }) => theme.primary};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
    }
    
    &::placeholder {
        color: ${({ theme }) => theme.text_secondary + '80'};
    }

    @media (max-width: 768px) {
        font-size: 15px;
        padding: 10px 14px;
    }
    
    @media (max-width: 480px) {
        font-size: 14px;
        padding: 9px 12px;
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 12px 16px;
    background: ${({ theme }) => theme.bg};
    border: 1px solid ${({ theme }) => theme.text_primary + '20'};
    border-radius: 12px;
    color: ${({ theme }) => theme.text_primary};
    font-size: 16px;
    outline: none;
    resize: vertical;
    min-height: 120px;
    transition: all 0.3s ease;

    &:focus {
        border-color: ${({ theme }) => theme.primary};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
    }
    
    &::placeholder {
        color: ${({ theme }) => theme.text_secondary + '80'};
    }

    @media (max-width: 768px) {
        font-size: 15px;
        padding: 10px 14px;
        min-height: 100px;
    }
    
    @media (max-width: 480px) {
        font-size: 14px;
        padding: 9px 12px;
        min-height: 90px;
    }
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 16px 32px;
    background: ${({ theme }) => `linear-gradient(135deg, ${theme.primary}15, ${theme.primary}30)`};
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
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
        );
        transition: 0.5s;
    }

    svg {
        font-size: 20px;
        transition: transform 0.3s ease;
    }

    &:hover {
        background: ${({ theme }) => theme.primary};
        color: ${({ theme }) => '#fff'};
        box-shadow: 0 8px 20px ${({ theme }) => theme.primary}40;
        transform: translateY(-3px);
        
        &::before {
            left: 100%;
        }
        
        svg {
            transform: translateX(3px);
        }
    }

    @media screen and (max-width: 768px) {
        padding: 14px 24px;
        font-size: 16px;
        
        svg {
            font-size: 18px;
        }
    }
    
    @media screen and (max-width: 480px) {
        padding: 12px 20px;
        font-size: 15px;
        
        svg {
            font-size: 16px;
        }
    }
`;

// Floating decorative elements
const FloatingElement = styled.div`
    display: none;
`;

const Contact = () => {
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const form = useRef();
    const [theme] = useState(() => {
        // Get theme from localStorage or default to 'dark'
        const savedTheme = localStorage.getItem('darkMode');
        return savedTheme ? (JSON.parse(savedTheme) ? 'dark' : 'light') : 'dark';
    });

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
        <Container id="contact">
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
                    sx={{ width: '100%', fontWeight: 500 }}
                >
                    {errorMessage || "Message sent successfully!"}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Contact;
