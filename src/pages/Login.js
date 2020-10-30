import React, { useState, useContext } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation, gql } from '@apollo/client'
import { useForm } from '../utils/hooks'
import { AuthContext } from '../context/auth'


const Login = (props) => {
    const context = useContext(AuthContext)
    const [loginUser, { loading }] = useMutation(LOGIN_USER)

    const [errorMsg, setErrorMsg] = useState({})

    const { onSubmit, onChange, values } = useForm(submitForm, {
        username: '',
        password: '',
    })

    const onSubmitForm = async (e) => {
        try {
            const { data } = await loginUser({
                variables: {
                    loginInput: {
                        username: values.username,
                        password: values.password,
                    }
                }
            }
            )
            
              context.login(data.loginUser)
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
                <h1> Login </h1>
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
                    label="password"
                    type="password"
                    name="password"
                    placeholder="Pasword"
                    values={values.password}
                    onChange={onChange}
                    error={errorMsg.password}
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


const LOGIN_USER = gql`
mutation loginUser($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
     id
     token
     username
    }
  } 
`

export default Login;