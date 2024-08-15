import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';
import avatar from '../../images/avatar.jpg';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark} from "react-syntax-highlighter/src/styles/prism";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text_primary};
`;

const Wrapper = styled.div`
    max-width: 800px;
    width: 100%;
    background-color: ${({ theme }) => theme.card};
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 8px;
    color: ${({ theme }) => theme.text_primary};
    margin-bottom: 20px;
    padding: 20px;
`;

const Header = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    color: ${({ theme }) => theme.primary};
    margin-bottom: 10px;
    text-align: center;
`;

const Meta = styled.div`
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.text_secondary};
`;

const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
`;

const Divider = styled.hr`
    width: 100%;
    border: none;
    border-top: 1px solid ${({ theme }) => theme.text_secondary};
    margin: 20px 0;
`;

const Content = styled.div`
    width: 100%;

    img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 20px auto;
    }

    @media (min-width: 768px) {
        img {
            max-width: 40%;
            margin: 20px 20px 20px 0;
            display: inline-block;
            float: left;
        }
    }

    h1, h2, h3, h4, h5, h6 {
        margin-top: 2rem;
        font-weight: 600;
    }

    p + h1, p + h2, p + h3, p + h4, p + h5, p + h6,
    ul + h1, ul + h2, ul + h3, ul + h4, ul + h5, ul + h6,
    ol + h1, ol + h2, ol + h3, ol + h4, ol + h5, ol + h6,
    blockquote + h1, blockquote + h2, blockquote + h3, blockquote + h4, blockquote + h5, blockquote + h6 {
        margin-top: 2rem;
    }
`;

const Loader = styled.div`
    text-align: center;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.text_secondary};
    margin-top: 20px;
`;

const BlogPage = () => {
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMarkdownFiles = async () => {
            const fileNames = ['post1.md'];
            try {
                const fileContents = await Promise.all(
                    fileNames.map(async (fileName) => {
                        const response = await fetch(`/content/${fileName}`);
                        if (!response.ok) {
                            throw new Error(`Failed to fetch ${fileName}: ${response.statusText}`);
                        }
                        return response.text();
                    })
                );
                setContents(fileContents);
            } catch (error) {
                setError(`Failed to fetch markdown files: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchMarkdownFiles();
    }, []);

    return (
        <Container>
            <Header>
                <Title>Turtle's Blog</Title>
            </Header>
            <Wrapper>
                <Meta>
                    <Avatar src={avatar} alt="Avatar" />
                    <span>Turtle</span>
                </Meta>
                {loading ? (
                    <Loader>Loading...</Loader>
                ) : error ? (
                    <Loader>Error loading content: {error}</Loader>
                ) : (
                    contents.map((content, index) => (
                        <div key={index}>
                            <Divider />
                            <Content>
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        code: ({ node, inline, className, children, ...props }) => {
                                            const match = /language-(\w+)/.exec(className || '');
                                            return !inline && match ? (
                                                <SyntaxHighlighter
                                                    language={match[1]}
                                                    PreTag="div"
                                                    style={materialDark}
                                                    {...props}
                                                >
                                                    {String(children).replace(/\n$/, '')}
                                                </SyntaxHighlighter>
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
                        </div>
                    ))
                )}
            </Wrapper>
        </Container>
    );
};

export default BlogPage;
