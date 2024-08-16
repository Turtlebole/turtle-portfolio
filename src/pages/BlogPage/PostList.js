import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    padding: 20px;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text_primary};
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Heading = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.primary};
    margin-bottom: 15px;
    text-align: center;
`;

const ListItem = styled.div`
    background: ${({ theme }) => theme.card};
    border: 1px solid ${({ theme }) => theme.text_secondary};
    border-radius: 6px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    margin: 8px 0;
    padding: 15px;
    width: 100%;
    max-width: 600px;
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
        background-color: ${({ theme }) => theme.card_light};
        transform: scale(0.99);
    }
`;

const PostTitle = styled.h2`
    font-size: 1.25rem;
    margin: 0;
    color: ${({ theme }) => theme.primary};
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const PostLink = styled(Link)`
    text-decoration: none;
    color: ${({ theme }) => theme.primary};
    font-weight: bold;

    &:hover {
        color: ${({ theme }) => theme.colored_detail};
    }
`;

const PostDate = styled.span`
    font-size: 0.875rem;
    color: ${({ theme }) => theme.text_secondary};
    margin-left: 10px;
`;

const SearchInput = styled.input`
    width: 100%;
    max-width: 300px;
    padding: 8px 12px;
    margin-bottom: 20px;
    border: 1px solid ${({ theme }) => theme.text_secondary};
    border-radius: 20px;
    font-size: 0.875rem;
    background-color: ${({ theme }) => theme.bgLight};
    color: ${({ theme }) => theme.text_primary};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.primary};
        box-shadow: 0 0 0 2px ${({ theme }) => theme.primary};
    }

    @media (max-width: 600px) {
        max-width: 80%;
    }
`;

const PostList = ({ theme }) => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchPostList = async () => {
            try {
                const response = await fetch('/posts.json');
                if (!response.ok) {
                    throw new Error(`Failed to fetch post list: ${response.statusText}`);
                }
                const data = await response.json();
                setPosts(data);
                setFilteredPosts(data);
            } catch (error) {
                setError(`Failed to fetch post list: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchPostList();
    }, []);

    useEffect(() => {
        if (search) {
            const regex = new RegExp(search, 'i');
            const filtered = posts.filter(post =>
                regex.test(post.filename) || regex.test(post.date)
            );
            setFilteredPosts(filtered);
        } else {
            setFilteredPosts(posts);
        }
    }, [search, posts]);

    return (
        <Container>
            <Heading>Posts List</Heading>
            <SearchInput
                type="text"
                placeholder="Search by name or date..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                filteredPosts.length > 0 ? (
                    filteredPosts.map((post, index) => (
                        <ListItem key={index}>
                            <PostTitle>
                                <PostLink to={`/blog/${post.filename}`}>
                                    {post.filename.replace('.md', '')}
                                </PostLink>
                                <PostDate>{post.date}</PostDate>
                            </PostTitle>
                        </ListItem>
                    ))
                ) : (
                    <p>No posts found</p>
                )
            )}
        </Container>
    );
};

export default PostList;
