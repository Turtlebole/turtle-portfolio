import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import avatar from '../../images/avatar.jpg';
import { useParams, Link } from 'react-router-dom';
import { FaCalendar, FaArrowLeft } from 'react-icons/fa';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 20px 40px;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text_primary};
    position: relative;
`;

const BackButton = styled(Link)`
    position: absolute;
    top: 100px;
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
    z-index: 10;
    text-decoration: none;

    &:hover {
        transform: translateY(-3px);
        background: ${({ theme }) => theme.primary};
        color: white;
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
    }

    @media (max-width: 768px) {
        top: 80px;
        left: 20px;
        font-size: 14px;
        padding: 8px 12px;
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

    &:hover {
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
        border-color: ${({ theme }) => theme.primary}60;
    }

    @media (max-width: 768px) {
        padding: 20px;
    }
`;

const Header = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
    position: relative;
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

    @media (max-width: 768px) {
        font-size: 2rem;
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
`;

const Avatar = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid ${({ theme }) => theme.primary};
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
`;

const Divider = styled.hr`
    width: 100%;
    border: none;
    border-top: 1px solid ${({ theme }) => theme.card_light || theme.bgLight};
    margin: 32px 0;
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
    }
    
    h2 { 
        font-size: 2rem; 
        border-bottom: 2px solid ${({ theme }) => theme.card_light || theme.bgLight};
        padding-bottom: 0.5rem;
    }
    
    h3 { font-size: 1.8rem; }
    h4 { font-size: 1.6rem; }
    h5 { font-size: 1.4rem; }
    h6 { font-size: 1.2rem; }

    p {
        margin: 1.5rem 0;
        color: ${({ theme }) => theme.text_secondary};
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
    }

    blockquote {
        margin: 2rem 0;
        padding: 1rem 2rem;
        border-left: 4px solid ${({ theme }) => theme.primary};
        background: ${({ theme }) => theme.card_light || theme.bgLight};
        border-radius: 0 12px 12px 0;
        font-style: italic;
        color: ${({ theme }) => theme.text_secondary};
    }

    ul, ol {
        margin: 1.5rem 0;
        padding-left: 2rem;
        color: ${({ theme }) => theme.text_secondary};
    }

    li {
        margin: 0.5rem 0;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin: 2rem 0;
        background: ${({ theme }) => theme.card_light || theme.bgLight};
        border-radius: 12px;
        overflow: hidden;
    }

    th, td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid ${({ theme }) => theme.card};
    }

    th {
        background: ${({ theme }) => theme.card_light || theme.bgLight};
        font-weight: 600;
        color: ${({ theme }) => theme.text_primary};
    }
    
    code:not([class*="language-"]) {
        background: ${({ theme }) => theme.card_light || theme.bgLight};
        color: ${({ theme }) => theme.primary};
        padding: 0.2em 0.4em;
        border-radius: 4px;
        font-size: 0.9em;
        font-family: 'Fira Code', monospace;
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
