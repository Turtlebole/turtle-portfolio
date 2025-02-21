import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaList, FaTh, FaSearch } from 'react-icons/fa';
import throttle from 'lodash/throttle';

const Container = styled.div`
    padding: 40px 20px;
    margin-top: 8vh;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text_primary};
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Heading = styled.h1`
    font-size: 2.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.text_primary};
    margin-bottom: 2rem;
    text-align: center;
`;

const ControlsContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    gap: 20px;
    
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
    }
`;

const SearchContainer = styled.div`
    position: relative;
    max-width: 400px;
    width: 100%;
    
    svg {
        position: absolute;
        left: 16px;
        top: 50%;
        transform: translateY(-50%);
        color: ${({ theme }) => theme.text_secondary};
        font-size: 1.2rem;
    }
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 12px 20px 12px 48px;
    border: 2px solid ${({ theme }) => theme.card_light};
    border-radius: 12px;
    font-size: 1rem;
    background-color: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text_primary};
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.primary};
        box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}30;
    }
`;

const ViewControls = styled.div`
    display: flex;
    gap: 10px;
    
    @media (max-width: 640px) {
        display: none;
    }
`;

const ViewButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    background: ${({ isActive, theme }) => 
        isActive ? theme.primary : theme.card};
    color: ${({ isActive, theme }) => 
        isActive ? theme.white : theme.text_secondary};
    transition: all 0.3s ease;

    &:hover {
        background: ${({ theme }) => theme.primary};
        color: ${({ theme }) => theme.white};
        transform: translateY(-2px);
    }

    svg {
        font-size: 1.2rem;
    }
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 24px;
    width: 100%;
    max-width: 1200px;
    padding: 0 10px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const PostCard = styled.div`
    background: ${({ theme }) => theme.card};
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border: 1px solid ${({ theme }) => theme.card_border};

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    }
`;

const PostImage = styled.div`
    width: 100%;
    height: 200px;
    background-image: url(${({ backgroundImage }) => backgroundImage || '/default-post-image.jpg'});
    background-size: cover;
    background-position: center;
`;

const PostContent = styled.div`
    padding: 24px;
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const PostTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
    margin-bottom: 8px;
    line-height: 1.4;
`;

const PostDate = styled.div`
    font-size: 0.9rem;
    color: ${({ theme }) => theme.text_secondary};
    margin-bottom: 16px;
`;

const PostDescription = styled.p`
    font-size: 1rem;
    color: ${({ theme }) => theme.text_secondary};
    line-height: 1.6;
    margin-bottom: 20px;
    flex: 1;
`;

const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: auto;
`;

const Tag = styled.span`
    font-size: 0.85rem;
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.primary}15;
    padding: 6px 12px;
    border-radius: 20px;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${({ theme }) => theme.primary}25;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    width: 100%;
    height: 100%;
    display: block;
    
    &:hover {
        text-decoration: none;
    }
`;

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 1200px;
    padding: 0 10px;
`;

const ListPostCard = styled.div`
    background: ${({ theme }) => theme.card};
    border-radius: 16px;
    padding: 20px;
    display: flex;
    gap: 20px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border: 1px solid ${({ theme }) => theme.card_border};

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    }

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const ListPostImage = styled.div`
    width: 300px;
    height: 200px;
    border-radius: 12px;
    background-image: url(${({ backgroundImage }) => backgroundImage || '/default-post-image.jpg'});
    background-size: cover;
    background-position: center;
    flex-shrink: 0;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const ListPostContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [viewType, setViewType] = useState('list');

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

    const filteredPosts = useMemo(() => {
        if (search) {
            const regex = new RegExp(search, 'i');
            return posts.filter(post =>
                regex.test(post.filename) || regex.test(post.date) || regex.test(post.desc)
            );
        }
        return posts;
    }, [search, posts]);

    useEffect(() => {
        const handleResize = throttle(() => {
            if (window.innerWidth <= 640) {
                setViewType('list');
            }
        }, 200);

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleViewType = useCallback((type) => setViewType(type), []);

    const renderPosts = useCallback(() => {
        if (viewType === 'grid') {
            return (
                <GridContainer>
                    {filteredPosts.map((post, index) => (
                        <StyledLink key={index} to={`/blog/${post.filename}`}>
                            <PostCard>
                                <PostImage backgroundImage={post.backgroundImage} />
                                <PostContent>
                                    <PostTitle>{post.filename.replace('.md', '')}</PostTitle>
                                    <PostDate>{post.date}</PostDate>
                                    <PostDescription>{post.desc}</PostDescription>
                                    <Tags>
                                        {post.tags && post.tags.map((tag, index) => (
                                            <Tag key={index}>{tag}</Tag>
                                        ))}
                                    </Tags>
                                </PostContent>
                            </PostCard>
                        </StyledLink>
                    ))}
                </GridContainer>
            );
        } else {
            return (
                <ListContainer>
                    {filteredPosts.map((post, index) => (
                        <StyledLink key={index} to={`/blog/${post.filename}`}>
                            <ListPostCard>
                                <ListPostImage backgroundImage={post.backgroundImage} />
                                <ListPostContent>
                                    <PostTitle>{post.filename.replace('.md', '')}</PostTitle>
                                    <PostDate>{post.date}</PostDate>
                                    <PostDescription>{post.desc}</PostDescription>
                                    <Tags>
                                        {post.tags && post.tags.map((tag, index) => (
                                            <Tag key={index}>{tag}</Tag>
                                        ))}
                                    </Tags>
                                </ListPostContent>
                            </ListPostCard>
                        </StyledLink>
                    ))}
                </ListContainer>
            );
        }
    }, [filteredPosts, viewType]);

    return (
        <Container>
            <Heading>Blog Posts</Heading>
            <ControlsContainer>
                <SearchContainer>
                    <FaSearch />
                    <SearchInput
                        type="text"
                        placeholder="Search posts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </SearchContainer>
                <ViewControls>
                    <ViewButton 
                        onClick={() => toggleViewType('list')} 
                        isActive={viewType === 'list'}
                        title="List view"
                    >
                        <FaList />
                    </ViewButton>
                    <ViewButton 
                        onClick={() => toggleViewType('grid')} 
                        isActive={viewType === 'grid'}
                        title="Grid view"
                    >
                        <FaTh />
                    </ViewButton>
                </ViewControls>
            </ControlsContainer>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                filteredPosts.length > 0 ? (
                    renderPosts()
                ) : (
                    <p>No posts found</p>
                )
            )}
        </Container>
    );
};

export default PostList;
