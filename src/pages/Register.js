import React, { useState, useContext } from 'react';
import { Button, Form } from 'semantic-ui-react';
import {gql, useMutation  } from '@apollo/client'
import { useForm } from '../utils/hooks'
import { AuthContext } from '../context/auth'


const Register = (props) => {
    const context = useContext(AuthContext)
    const [registerUser, { loading }] = useMutation(REGISTER_USER)
    const [errorMsg, setErrorMsg] = useState({})


    const { onSubmit, onChange, values } = useForm(submitForm, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })


    const onSubmitForm = async (e) => {
        try {
            const { data } = await registerUser({
                variables: {
                    registerInput: {
                        username: values.username,
                        password: values.password,
                        confirmPassword: values.confirmPassword,
                        email: values.email
                    }
                }
            }
            )
            context.login(data.registerUser)
            props.history.push('/')
        } catch (e) {
            setErrorMsg(e.graphQLErrors[0].extensions.exception.errors)
        }
    }

    function submitForm() {
        onSubmitForm()
    }

    return (
        <div class="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Register</h1>
                <Form.Input
                    label="username"
                    name="username"
                    type="text"
                    placeholder="Username"
                    values={values.username}
                    onChange={onChange}
                    error={errorMsg.username}
                />
                <Form.Input
                    label="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    values={values.email}
                    onChange={onChange}
                    error={errorMsg.email}
                />
                <Form.Input
                    label="password"
                    type="password"
                    name="password"
                    placeholder="Pasword"
                    values={values.password}
                    onChange={onChange}
                    error={errorMsg.password}
                />
                <Form.Input
                    label="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="confirmPassword"
                    values={values.confirmPassword}
                    onChange={onChange}
                    error={errorMsg.confirmPassword}
                />
                <Button type="submit" primary>
                    Submit
        </Button>
            </Form>
            {
                Object.keys(errorMsg).length > 0 &&
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errorMsg).map(value => {
                            return <li key={value}>{value} </li>
                        })}
                    </ul>
                </div>
            }
        </div>


    );
}

const REGISTER_USER = gql`
mutation registerUser($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
     id
     token
     username
    }
  } 
`


export default Register;