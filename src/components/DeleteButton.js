import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Icon, Button, Confirm, Popup } from 'semantic-ui-react'

const DeleteButton = ({ id, commentId, callback }, props) => {

    const [confirm, setConfirm] = useState(false)

    const mutation = commentId ? DELETE_COMMENT : DELETE_POST

    const [deletePost] = useMutation(mutation, {
        update(cache) {
            setConfirm(false)
            if (!commentId) {
                let { getPosts } = cache.readQuery(
                    { query: GET_POSTS }
                )

                console.log(getPosts, '11')
                getPosts = getPosts.filter(p => p.id !== id)
                console.log(getPosts, '22')

                cache.writeQuery({
                    query: GET_POSTS,
                    data: { getPosts }
                })
            } else {
                props.history.push('/')
            }

            if (callback) callback()

        },
        variables: {
            postId: id,
            commentId
        }
    })

    return (
        <>
            <Popup
                content="Delete"
                trigger={
                    <Button
                        as="div"
                        color="red"
                        floated="right"
                        onClick={() => setConfirm(true)}
                    >
                        <Icon name="trash" style={{ margin: 0 }} />
                    </Button>
                }
            />
            <Confirm
                open={confirm}
                onCancel={() => setConfirm(false)}
                onConfirm={() => deletePost(id)}
            />
        </>
    );
}

const DELETE_POST = gql`
mutation deletePost($postId: ID!){
    deletePost(postId: $postId)
}
`

const DELETE_COMMENT = gql`
mutation deleteComment($postId: ID!, $commentId: ID!){
    deleteComment(postId: $postId, commentId: $commentId){
        id
        comments{
            id username created_at
        }
        commentCount
    }

}
`

const GET_POSTS = gql`
query getPosts{
  getPosts{
    id
    body
    username
    created_at
    likeCount
    commentCount
    comments{
        username
        created_at
        body
        }
  }
}
`

export default DeleteButton;