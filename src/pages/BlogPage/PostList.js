import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    padding: 20px;  // Reduced padding
    min-height: 100vh;
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text_primary};
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Heading = styled.h1`
    font-size: 1.5rem;  // Reduced font size
    font-weight: bold;
    color: ${({ theme }) => theme.primary};
    margin-bottom: 15px;  // Reduced margin
    text-align: center;
`;

const ListItem = styled.div`
    background: ${({ theme }) => theme.card};
    border: 1px solid ${({ theme }) => theme.text_secondary};
    border-radius: 6px;  // Reduced border radius
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);  // Reduced box-shadow
    margin: 8px 0;  // Reduced margin
    padding: 15px;  // Reduced padding
    width: 100%;
    max-width: 600px;  // Reduced max-width
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
        background-color: ${({ theme }) => theme.card_light};
        transform: scale(0.99);  // Reduced scale effect
    }
`;

const PostTitle = styled.h2`
    font-size: 1.25rem;  // Reduced font size
    margin: 0;
    color: ${({ theme }) => theme.primary};
`;

const PostLink = styled(Link)`
    text-decoration: none;
    color: ${({ theme }) => theme.primary};
    font-weight: bold;

    &:hover {
        color: ${({ theme }) => theme.colored_detail};
    }
`;

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPostList = async () => {
            try {
                const response = await fetch('/posts.json');
                if (!response.ok) {
                    throw new Error(`Failed to fetch post list: ${response.statusText}`);
                }
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                setError(`Failed to fetch post list: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchPostList();
    }, []);

    return (
        <Container>
            <Heading>Posts List</Heading>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                posts.map((post, index) => (
                    <ListItem key={index}>
                        <PostTitle>
                            <PostLink to={`/blog/${post}`}>{post.replace('.md', '')}</PostLink>
                        </PostTitle>
                    </ListItem>
                ))
            )}
        </Container>
    );
};

export default PostList;
