import React, { useEffect, useState } from 'react';
import { Icon, Button, Label, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { useMutation, gql } from '@apollo/client'


const LikeButton = ({ post, user }) => {

    const [liked, setLiked] = useState(false)
    const { likeCount, likes, id } = post

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: {
            postId: id
        }
    })

    useEffect(() => {
        if (user && likes.find(like => like.username === user.username)) {
            setLiked(true)
        }
        else setLiked(false)
    }, [user, likes])

    const likeButton = user ? (
        liked ?
            (<Button as={Link} to='/' color='red'>
                <Icon name='heart' />
            </Button>
            ) :
            <Button as={Link} to='/' color='red' basic>
                <Icon name='heart' />
            </Button>
    ) : (
            <Button as={Link} to='/' color='teal'>
                <Icon name='heart' />
            </Button>
        )
    return (
        <Popup
            content="Like Button"
            trigger={
                <Button as='div' labelPosition='left' onClick={() => likePost()}>
                    {likeButton}
                    <Label as='a' basic color='red' pointing='left'>
                        {likeCount}
                    </Label>
                </Button>
            }
        />
    );
}


const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!){
            likePost(postId: $postId){
                id
                likes{
                    id
                    username
                }
                likeCount
            }
    }
`

export default LikeButton;