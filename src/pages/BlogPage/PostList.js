import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaList, FaTh, FaSearch, FaCalendar, FaTags } from 'react-icons/fa';
import throttle from 'lodash/throttle';

const Container = styled.div`
    padding: 80px 20px;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text_primary};
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Heading = styled.h1`
    font-size: 42px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 16px;
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
        font-size: 32px;
    }
`;

const Subtitle = styled.p`
    font-size: 18px;
    color: ${({ theme }) => theme.text_secondary};
    text-align: center;
    max-width: 600px;
    margin-bottom: 48px;
    
    @media (max-width: 768px) {
        font-size: 16px;
        margin-bottom: 32px;
    }
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
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border: 1px solid ${({ theme }) => theme.primary}30;
    position: relative;

    &:hover {
        transform: translateY(-12px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        border-color: ${({ theme }) => theme.primary}60;
    }
    
    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(
            135deg,
            ${({ theme }) => theme.primary}10,
            transparent 80%
        );
        opacity: 0;
        transition: opacity 0.4s ease;
        z-index: 0;
    }
    
    &:hover::before {
        opacity: 1;
    }
`;

const PostImage = styled.div`
    width: 100%;
    height: 200px;
    background-image: url(${({ backgroundImage }) => backgroundImage || '/default-post-image.jpg'});
    background-size: cover;
    background-position: center;
    position: relative;
    
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50%;
        background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);
    }
`;

const PostContent = styled.div`
    padding: 24px;
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
`;

const PostTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
    margin-bottom: 8px;
    line-height: 1.4;
    transition: color 0.3s ease;
    
    ${PostCard}:hover & {
        background: linear-gradient(
            90deg,
            ${({ theme }) => theme.text_primary},
            ${({ theme }) => theme.primary}
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`;

const PostMeta = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
`;

const PostDate = styled.div`
    font-size: 0.9rem;
    color: ${({ theme }) => theme.text_secondary};
    display: flex;
    align-items: center;
    gap: 6px;
    
    svg {
        color: ${({ theme }) => theme.primary};
        font-size: 0.9rem;
    }
`;

const PostDescription = styled.p`
    font-size: 1rem;
    color: ${({ theme }) => theme.text_secondary};
    line-height: 1.6;
    margin-bottom: 20px;
    flex: 1;
    
    /* Limit to 3 rows with ellipsis */
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: auto;
`;

const Tag = styled.span`
    font-size: 0.85rem;
    color: ${({ theme }) => theme.text_secondary};
    background-color: ${({ theme }) => theme.bgLight || 'rgba(255, 255, 255, 0.05)'};
    padding: 5px 12px;
    border-radius: 8px;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    
    &::before {
        content: '#';
        font-size: 12px;
        color: ${({ theme }) => theme.primary};
        margin-right: 4px;
    }

    &:hover {
        background-color: ${({ theme }) => theme.primary}15;
        color: ${({ theme }) => theme.primary};
        transform: translateY(-2px);
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
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border: 1px solid ${({ theme }) => theme.primary}30;
    position: relative;
    overflow: hidden;

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        border-color: ${({ theme }) => theme.primary}60;
    }
    
    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(
            135deg,
            ${({ theme }) => theme.primary}10,
            transparent 80%
        );
        opacity: 0;
        transition: opacity 0.4s ease;
        z-index: 0;
    }
    
    &:hover::before {
        opacity: 1;
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
    position: relative;
    z-index: 1;
    
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50%;
        background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);
        border-radius: 0 0 12px 12px;
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const ListPostContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
`;

const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    text-align: center;
    
    svg {
        font-size: 3rem;
        color: ${({ theme }) => theme.primary};
        margin-bottom: 20px;
        opacity: 0.5;
    }
    
    h3 {
        font-size: 1.5rem;
        color: ${({ theme }) => theme.text_primary};
        margin-bottom: 10px;
    }
    
    p {
        color: ${({ theme }) => theme.text_secondary};
        max-width: 400px;
    }
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
                                    <PostTitle>{post.filename.replace('.md', '').replace(/-/g, ' ')}</PostTitle>
                                    <PostMeta>
                                        <PostDate>
                                            <FaCalendar />
                                            {post.date}
                                        </PostDate>
                                    </PostMeta>
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
                                    <PostTitle>{post.filename.replace('.md', '').replace(/-/g, ' ')}</PostTitle>
                                    <PostMeta>
                                        <PostDate>
                                            <FaCalendar />
                                            {post.date}
                                        </PostDate>
                                    </PostMeta>
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
            <Subtitle>Thoughts, tutorials, and insights from my journey as a developer</Subtitle>
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
                <EmptyState>
                    <h3>Loading posts...</h3>
                    <p>Please wait while we fetch the latest content.</p>
                </EmptyState>
            ) : error ? (
                <EmptyState>
                    <h3>Error loading posts</h3>
                    <p>{error}</p>
                </EmptyState>
            ) : (
                filteredPosts.length > 0 ? (
                    renderPosts()
                ) : (
                    <EmptyState>
                        <FaSearch />
                        <h3>No posts found</h3>
                        <p>Try adjusting your search or check back later for new content.</p>
                    </EmptyState>
                )
            )}
        </Container>
    );
};

export default PostList;
