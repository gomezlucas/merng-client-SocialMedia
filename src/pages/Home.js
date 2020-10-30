import React, { useContext } from 'react';
import { Grid, Image } from 'semantic-ui-react'
import { gql, useQuery } from '@apollo/client'
import PostCard from './../components/PostCard';
import { AuthContext } from '../context/auth'
import PostForm from '../components/PostForm'

const Home = () => {
    const { user } = useContext(AuthContext)
    const { loading, data } = useQuery(GET_POSTS)


    if (data) {
        console.log(data)
    }


    return (
        <Grid columns={3}   >
            <Grid.Row className="page__title">
                <h1>Recents Posts</h1>
            </Grid.Row>

            <Grid.Row centered>
                {user &&
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                }

                {
                    loading ? (
                        <h3>Loading ...</h3>
                    ) : (data.getPosts && data.getPosts.map(post =>
                        <Grid.Column key={post.id} style={{ margin: 20 }} >
                            <PostCard post={post} />
                        </Grid.Column>
                    ))
                }
            </Grid.Row>
        </Grid>);
}

const GET_POSTS = gql`
query getPosts{
  getPosts{
    id
    body
    username
    created_at
    likeCount
    commentCount
    likes{
      id
      username
    }
     comments{
        username
        created_at
        body
        }
  }
}
`

export default Home;