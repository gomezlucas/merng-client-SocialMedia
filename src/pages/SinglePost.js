import React, { useContext, useState, useRef } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client'
import { Card, Grid, Image, Icon, Button, Label, Form } from 'semantic-ui-react';
import LikeButton from './../components/LikeButton';
import moment from 'moment'
import { AuthContext } from '../context/auth'
import DeleteButton from './../components/DeleteButton'

const SinglePost = (props) => {
    const postId = props.match.params.postId
    const [comment, setComment] = useState('')
    const { user } = useContext(AuthContext)
    const commentInputRef = useRef(null)


    const { data, loading } = useQuery(FETCH_SINGLE_POST, {
        variables: {
            postId
        }
    })


    const [createComment] = useMutation(SUBMIT_COMMENT, {
        update() {
            commentInputRef.current.blur()
            setComment('')
        },
        variables: {
            postId,
            body: comment
        }
    })

    if (loading) return <h2>Loading.... </h2>
    let postMarkup

    if (!data.getPost) {
        postMarkup = <p>Loading ... </p>
    }
    const { id, body, created_at, username, comments, likes, likeCount, commentCount } = data.getPost

    console.log(data.getPost)

    const deleteButtonCallBack = () => {
        props.history.push('/')
    }

    postMarkup = (
        <Grid>
            <Grid.Row>
                <Grid.Column width={2}>
                    <Image
                        src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
                        size="small"
                        floar="right"
                    />
                </Grid.Column>
                <Grid.Column width={10}>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>
                                {username}
                            </Card.Header>
                            <Card.Meta>
                                {moment(created_at).fromNow()}
                            </Card.Meta>
                            <Card.Description>
                                {body}
                            </Card.Description>
                        </Card.Content>
                        <hr />
                        <Card.Content extra>
                            <LikeButton user={user} post={{ likeCount, likes, id }} />
                            <Button as='div' labelPosition='right' onClick={() => { }} >
                                <Button basic color='blue'>
                                    <Icon name='comments' />

                                </Button>
                                <Label as='a' basic color='blue' pointing='left'>
                                    {commentCount}
                                </Label>
                            </Button>
                            {user && user.username === username && <DeleteButton id={postId} callback={deleteButtonCallBack} />}
                        </Card.Content>
                    </Card>
                    {
                        user && (
                            <Card fluid>
                                <Card.Content>
                                    <p>Post a comment </p>
                                    <Form>
                                        <input
                                            type="text"
                                            placeholder="Comment"
                                            name="comment"
                                            value={comment}
                                            onChange={event => setComment(event.target.value)}
                                            ref={commentInputRef}
                                        />
                                        <button
                                            type="submit"
                                            className="ui button teal"
                                            disabled={comment.trim() === ''}
                                            onClick={createComment}
                                        >
                                            Submit
                                        </button>
                                    </Form>
                                </Card.Content>
                            </Card>
                        )
                    }
                    {comments.map(comment => (

                        <Card fluid key={comment.id} >
                            <Card.Content>
                                {user && user.username === comment.username && (
                                    <DeleteButton id={id} commentId={comment.id} />
                                )}
                                <Card.Header>
                                    {comment.username}
                                </Card.Header>
                                <Card.Meta>
                                    {moment(comment.created_at).fromNow()}
                                </Card.Meta>
                                <Card.Description>
                                    {comment.body}
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    ))

                    }
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )

    return (postMarkup);
}


const FETCH_SINGLE_POST = gql`
query($postId: ID!){
    getPost(postId: $postId){
        id body created_at username likeCount 
        likes{
            username
        }
        commentCount
        comments{
            id username created_at body
        }
    }
}
`


const SUBMIT_COMMENT = gql`
mutation createComment($postId: ID! , $body: String!){
    createComment(postId: $postId, body: $body){
        id
        comments{
            id  body created_at username
        }
        commentCount
    }} `




export default SinglePost;