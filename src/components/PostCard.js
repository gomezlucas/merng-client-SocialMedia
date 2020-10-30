import React, { useContext } from 'react';
import { Card, Icon, Image, Button, Label, Popup } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';


const PostCard = ({ post }, props) => {
    const { user } = useContext(AuthContext)
    const { body, created_at, username, likes, likeCount, commentCount, id } = post

    const commentPost = (id) => {
        console.log('commment')
    }

    return (

        <Card fluid >
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
                />
                <Card.Header>{username} </Card.Header>
                <Card.Meta
                    as={Link}
                    to={`/singlepost/${id}`}
                >
                    {moment(created_at).fromNow(true)}
                </Card.Meta>
                <Card.Description>
                    {body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div>

                    <Popup
                        content="Like Post"
                        trigger={
                            <LikeButton user={user} post={{ likeCount, likes, id }} />
                        }
                    />
                    <Popup
                        content="Comment on Post"
                        trigger={
                            <Button
                                labelPosition='right'
                                as={Link}
                                to={`/singlepost/${id}`}
                            >
                                <Button basic color='blue'>
                                    <Icon name='comments' />

                                </Button>
                                <Label as='a' basic color='blue' pointing='left'>
                                    {commentCount}
                                </Label>
                            </Button>
                        }
                    />


                    <DeleteButton id={id} />
                </div>
            </Card.Content>
        </Card>

    );
}

export default PostCard;