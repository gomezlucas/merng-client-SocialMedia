import React from 'react';
import { Form, Button, Transition } from 'semantic-ui-react'
import { useForm } from '../utils/hooks'
import { gql, useMutation } from '@apollo/client'

const PostForm = () => {
 
    const [createPost, { error }] = useMutation(CREATE_POST, {
        update(cache, result) {
            const { getPosts } = cache.readQuery({ query: GET_POSTS })
            console.log(getPosts, 'getpostss')
            cache.writeQuery({
                query: GET_POSTS,
                data: {
                    getPosts: [
                        ...getPosts, result]

                }
            })

        }
    })



    const { values, onChange, onSubmit } = useForm(createPostCallBack, {
        body: ''
    })

    const onSubmitForm = async () => {
        try {
            const { data } = await createPost({
                variables: {
                    body: values.body
                }
            })
            console.log(data.createPost)
        } catch (e) {
            console.log(e.graphQLErrors[0].message)
        }

    }

    function createPostCallBack() {
        onSubmitForm()
        values.body = ""
    }

    return (
        <>
            <Form onSubmit={onSubmit}>
                <h2> Create a new Post </h2>
                <Form.Field>
                    <Form.Input
                        placeholder="Hi World"
                        name="body"
                        onChange={onChange}
                        value={values.body}
                        error={error}
                    />
                </Form.Field>
                <Button type="submit" color="teal">
                    Submit
            </Button>
            </Form>
            <Transition.Group>
                {
                    error && (
                        <div className="ui error message">
                            <ul className="list">
                                <li> {error.graphQLErrors[0].message}</li>
                            </ul>
                        </div>
                    )
                }
            </Transition.Group>
        </>
    );
}

const CREATE_POST = gql`
mutation  createPost($body: String!) {
      createPost(body: $body) {
    id
    body
    username
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


export default PostForm;