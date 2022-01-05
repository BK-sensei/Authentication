import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { ChakraProvider } from '@chakra-ui/react'
import { Input, Button } from "@chakra-ui/react"
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/form-control"

const Login = () => {
    const [isLogged, setIsLogged] = useState(false)
    const [errors, setErrors] = useState("")

    const navigate = useNavigate()

    const userLogged = () => {
        setIsLogged(false)
    }

    const formik = useFormik ({
        initialValues: {
            username: "",
            password: ""
        },
        onSubmit: values => {
            fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json' // ça veut dire qu'on envoie du JSON et qu'on attend en retour du JSON
                },
                body: JSON.stringify(values)
            })
            .then(response => {
                if(response.status >= 400){
                    alert('Bande de gros bâtards de snow')
                }
                else{
                    navigate('/admin')
                }
            })
        },
        validationSchema: Yup.object().shape({
            username: Yup.string()
             .required("Username is required"),
            password: Yup.string()
             .required("Password is required")
        }),
        validateOnChange: false
    })

    

    return (
        <ChakraProvider>
            <h1>Login</h1>
            <br/>
            {!isLogged ?
                <form onSubmit={formik.handleSubmit}>

                    <FormControl id="username" w="300px" isInvalid={formik.errors.username}>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <Input
                            type="text"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                        />
                        <FormErrorMessage>
                            {formik.errors.username}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl id="password" mt={5} w="300px" isInvalid={formik.errors.password}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        <FormErrorMessage>
                            {formik.errors.password}
                        </FormErrorMessage>
                    </FormControl>

                    <Button type="submit" colorScheme="teal" variant="solid" w="300px" mt={5}>
                        Login
                    </Button>

                </form>

            :
                <Button onClick={userLogged} colorScheme="teal" variant="solid" w="300px" mt={5}>
                    Logout
                </Button>
            }

        </ChakraProvider>
    )
}

export default Login