import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import avatar from '../../images/avatar.jpg';
import { useParams, Link } from 'react-router-dom';
import { FaCalendar, FaArrowLeft, FaCircle } from 'react-icons/fa';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 20px 40px;
    padding-top: 170px;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text_primary};
    position: relative;
    overflow: hidden;
    
    @media (max-width: 768px) {
        padding: 70px 16px 30px;
        padding-top: 170px;
    }
    
    @media (max-width: 480px) {
        padding: 60px 12px 24px;
        padding-top: 160px;
    }
`;

// Floating decorative elements
const FloatingElement = styled.div`
    position: absolute;
    width: ${props => props.size || '60px'};
    height: ${props => props.size || '60px'};
    border-radius: 50%;
    background: ${props => props.bg || 'rgba(255, 255, 255, 0.03)'};
    filter: blur(${props => props.blur || '15px'});
    opacity: ${props => props.opacity || '0.5'};
    top: ${props => props.top};
    left: ${props => props.left};
    right: ${props => props.right};
    bottom: ${props => props.bottom};
    z-index: 0;
    pointer-events: none;
`;

const BackButton = styled(Link)`
    position: absolute;
    top: 125px;
    left: 40px;
    display: flex;
    align-items: center;
    gap: 8px;
    background: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text_primary};
    border: none;
    padding: 10px 16px;
    border-radius: 50px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 8;
    text-decoration: none;

    &:hover {
        transform: translateY(-3px);
        background: ${({ theme }) => theme.primary};
        color: white;
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
    }

    @media (max-width: 768px) {
        top: 120px;
        left: 20px;
        font-size: 14px;
        padding: 8px 12px;
    }
    
    @media (max-width: 480px) {
        top: 120px;
        left: 16px;
        font-size: 13px;
        padding: 6px 10px;
    }
`;

const Wrapper = styled.div`
    max-width: 900px;
    width: 100%;
    background-color: ${({ theme }) => theme.card};
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    color: ${({ theme }) => theme.text_primary};
    margin-bottom: 40px;
    padding: 40px;
    transition: all 0.3s ease;
    border: 1px solid ${({ theme }) => theme.primary}30;
    position: relative;
    z-index: 1;

    &:hover {
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
        border-color: ${({ theme }) => theme.primary}60;
    }

    @media (max-width: 768px) {
        padding: 30px 25px;
        margin-bottom: 30px;
    }
    
    @media (max-width: 480px) {
        padding: 24px 18px;
        margin-bottom: 24px;
        border-radius: 16px;
    }
`;

const Header = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
    position: relative;
    
    @media (max-width: 768px) {
        margin-bottom: 30px;
    }
    
    @media (max-width: 480px) {
        margin-bottom: 24px;
    }
`;

const Title = styled.h1`
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 20px;
    text-align: center;
    line-height: 1.3;
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
        font-size: 2.3rem;
        margin-bottom: 16px;
    }
    
    @media (max-width: 480px) {
        font-size: 1.8rem;
        margin-bottom: 14px;
        line-height: 1.25;
    }
`;

const Meta = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 1rem;
    color: ${({ theme }) => theme.text_secondary};
    margin-bottom: 30px;
    padding: 12px 24px;
    background: ${({ theme }) => theme.card_light || theme.bgLight};
    border-radius: 50px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    
    @media (max-width: 768px) {
        padding: 10px 20px;
        margin-bottom: 24px;
        font-size: 0.9rem;
        flex-wrap: wrap;
        justify-content: center;
    }
    
    @media (max-width: 480px) {
        padding: 8px 16px;
        margin-bottom: 20px;
        font-size: 0.85rem;
        gap: 8px;
        border-radius: 40px;
    }
`;

const Avatar = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid ${({ theme }) => theme.primary};
    
    @media (max-width: 480px) {
        width: 30px;
        height: 30px;
    }
`;

const AuthorName = styled.span`
    font-weight: 500;
    color: ${({ theme }) => theme.text_primary};
`;

const PostDate = styled.span`
    display: flex;
    align-items: center;
    gap: 6px;
    
    svg {
        color: ${({ theme }) => theme.primary};
    }
    
    @media (max-width: 480px) {
        gap: 4px;
    }
`;

const DotDivider = styled.span`
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.text_secondary};
    opacity: 0.6;
    
    @media (max-width: 480px) {
        display: none;
    }
`;

const Divider = styled.hr`
    width: 100%;
    border: none;
    border-top: 1px solid ${({ theme }) => theme.card_light || theme.bgLight};
    margin: 32px 0;
    
    @media (max-width: 768px) {
        margin: 24px 0;
    }
    
    @media (max-width: 480px) {
        margin: 20px 0;
    }
`;

const Content = styled.div`
    width: 100%;
    font-size: 1.1rem;
    line-height: 1.8;

    h1, h2, h3, h4, h5, h6 {
        color: ${({ theme }) => theme.text_primary};
        margin: 2.5rem 0 1.5rem 0;
        line-height: 1.4;
        font-weight: 600;
    }

    h1 { 
        font-size: 2.4rem; 
        background: linear-gradient(
            90deg,
            ${({ theme }) => theme.text_primary},
            ${({ theme }) => theme.primary}
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        
        @media (max-width: 768px) {
            font-size: 2rem;
        }
        
        @media (max-width: 480px) {
            font-size: 1.7rem;
            margin: 2rem 0 1.2rem 0;
        }
    }
    
    h2 { 
        font-size: 2rem; 
        border-bottom: 2px solid ${({ theme }) => theme.card_light || theme.bgLight};
        padding-bottom: 0.5rem;
        
        @media (max-width: 768px) {
            font-size: 1.7rem;
        }
        
        @media (max-width: 480px) {
            font-size: 1.5rem;
            margin: 1.8rem 0 1rem 0;
        }
    }
    
    h3 { 
        font-size: 1.8rem; 
        
        @media (max-width: 768px) {
            font-size: 1.5rem;
        }
        
        @media (max-width: 480px) {
            font-size: 1.3rem;
        }
    }
    
    h4 { 
        font-size: 1.6rem; 
        
        @media (max-width: 768px) {
            font-size: 1.4rem;
        }
        
        @media (max-width: 480px) {
            font-size: 1.2rem;
        }
    }
    
    h5 { 
        font-size: 1.4rem; 
        
        @media (max-width: 768px) {
            font-size: 1.2rem;
        }
        
        @media (max-width: 480px) {
            font-size: 1.1rem;
        }
    }
    
    h6 { 
        font-size: 1.2rem;
        
        @media (max-width: 768px) {
            font-size: 1.1rem;
        }
        
        @media (max-width: 480px) {
            font-size: 1rem;
        }
    }

    p {
        margin: 1.5rem 0;
        color: ${({ theme }) => theme.text_secondary};
        
        @media (max-width: 768px) {
            margin: 1.2rem 0;
            font-size: 1rem;
        }
        
        @media (max-width: 480px) {
            margin: 1rem 0;
            font-size: 0.95rem;
            line-height: 1.6;
        }
    }

    a {
        color: ${({ theme }) => theme.primary};
        text-decoration: none;
        border-bottom: 2px solid transparent;
        transition: border-color 0.3s ease;

        &:hover {
            border-color: ${({ theme }) => theme.primary};
        }
    }

    img {
        max-width: 100%;
        height: auto;
        border-radius: 12px;
        margin: 2rem auto;
        display: block;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        
        @media (max-width: 768px) {
            margin: 1.5rem auto;
            border-radius: 10px;
        }
        
        @media (max-width: 480px) {
            margin: 1.2rem auto;
            border-radius: 8px;
        }
    }

    blockquote {
        margin: 2rem 0;
        padding: 1rem 2rem;
        border-left: 4px solid ${({ theme }) => theme.primary};
        background: ${({ theme }) => theme.card_light || theme.bgLight};
        border-radius: 0 12px 12px 0;
        font-style: italic;
        color: ${({ theme }) => theme.text_secondary};
        
        @media (max-width: 768px) {
            margin: 1.5rem 0;
            padding: 0.8rem 1.5rem;
        }
        
        @media (max-width: 480px) {
            margin: 1.2rem 0;
            padding: 0.7rem 1.2rem;
            font-size: 0.9rem;
        }
    }

    ul, ol {
        margin: 1.5rem 0;
        padding-left: 2rem;
        color: ${({ theme }) => theme.text_secondary};
        
        @media (max-width: 768px) {
            margin: 1.2rem 0;
            padding-left: 1.8rem;
        }
        
        @media (max-width: 480px) {
            margin: 1rem 0;
            padding-left: 1.5rem;
            font-size: 0.95rem;
        }
    }

    li {
        margin: 0.5rem 0;
        
        @media (max-width: 480px) {
            margin: 0.4rem 0;
        }
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin: 2rem 0;
        background: ${({ theme }) => theme.card_light || theme.bgLight};
        border-radius: 12px;
        overflow: hidden;
        
        @media (max-width: 768px) {
            margin: 1.5rem 0;
            display: block;
            overflow-x: auto;
            border-radius: 10px;
        }
        
        @media (max-width: 480px) {
            margin: 1.2rem 0;
            border-radius: 8px;
            font-size: 0.9rem;
        }
    }

    th, td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid ${({ theme }) => theme.card};
        
        @media (max-width: 768px) {
            padding: 0.8rem;
        }
        
        @media (max-width: 480px) {
            padding: 0.6rem;
        }
    }

    th {
        background: ${({ theme }) => theme.card_light || theme.bgLight};
        font-weight: 600;
        color: ${({ theme }) => theme.text_primary};
    }
    
    @media (max-width: 768px) {
        font-size: 1rem;
        line-height: 1.7;
    }
    
    @media (max-width: 480px) {
        font-size: 0.95rem;
        line-height: 1.6;
    }
`;

const CustomSyntaxHighlighter = styled(SyntaxHighlighter)`
    margin: 2rem 0 !important;
    border-radius: 12px !important;
    padding: 20px !important;
    font-size: 0.9rem !important;
    border: 1px solid ${({ theme }) => theme.primary}30 !important;
    
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.primary}80;
        border-radius: 4px;
    }

    ::-webkit-scrollbar-track {
        background-color: ${({ theme }) => theme.card_light || theme.bgLight};
        border-radius: 4px;
    }
`;

const Loader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.text_secondary};
    gap: 12px;

    svg {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;

const PostPage = ({ theme }) => {
    const { postName } = useParams();
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await fetch('/posts.json');
                if (!response.ok) {
                    throw new Error(`Failed to fetch post data: ${response.statusText}`);
                }
                const data = await response.json();
                const post = data.find(p => p.filename === postName);
                setPostData(post);
            } catch (error) {
                console.error("Error fetching post data:", error);
            }
        };

        fetchPostData();
    }, [postName]);

    useEffect(() => {
        const fetchMarkdownFile = async () => {
            try {
                const response = await fetch(`/content/${postName}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch ${postName}: ${response.statusText}`);
                }
                const text = await response.text();
                setContent(text);
            } catch (error) {
                setError(`Failed to fetch markdown file: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchMarkdownFile();
    }, [postName]);

    const syntaxStyle = theme === 'light' ? oneLight : oneDark;

    return (
        <Container>
            {/* Add decorative floating elements */}
            <FloatingElement size="140px" blur="30px" opacity="0.3" top="15%" left="5%" bg="rgba(71, 7, 234, 0.2)" />
            <FloatingElement size="160px" blur="25px" opacity="0.2" bottom="10%" right="8%" bg="rgba(71, 7, 234, 0.15)" />
            <FloatingElement size="90px" blur="15px" opacity="0.2" top="30%" right="20%" bg="rgba(71, 7, 234, 0.1)" />
            
            <BackButton to="/blog">
                <FaArrowLeft /> Back to Blog
            </BackButton>
            
            <Wrapper>
                <Header>
                    <Title>{postName.replace('.md', '').replace(/-/g, ' ')}</Title>
                    <Meta>
                        <Avatar src={avatar} alt="Avatar" />
                        <AuthorName>Turtle</AuthorName>
                        {postData && (
                            <PostDate>
                                <FaCalendar />
                                {postData.date}
                            </PostDate>
                        )}
                    </Meta>
                </Header>
                {loading ? (
                    <Loader>
                        <span>Loading content...</span>
                    </Loader>
                ) : error ? (
                    <Loader>Error: {error}</Loader>
                ) : (
                    <Content>
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                code: ({ node, inline, className, children, ...props }) => {
                                    const match = /language-(\w+)/.exec(className || '');
                                    return !inline && match ? (
                                        <CustomSyntaxHighlighter
                                            language={match[1]}
                                            PreTag="div"
                                            style={syntaxStyle}
                                            {...props}
                                        >
                                            {String(children).replace(/\n$/, '')}
                                        </CustomSyntaxHighlighter>
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    );
                                }
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </Content>
                )}
            </Wrapper>
        </Container>
    );
};

export default PostPage;
