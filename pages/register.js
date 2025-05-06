import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useAppContext } from '../context/state'
import { register } from '../data/auth'
import { Box, Button, Container, Heading, Text, TextField } from '@radix-ui/themes'

export default function Register() {
    const { setToken } = useAppContext()

    const firstName = useRef('')
    const lastName = useRef('')
    const username = useRef('')
    const password = useRef('')
    const email = useRef('')
    const router = useRouter()

    const submit = (e) => {
        e.preventDefault()

        const user = {
            username: username.current.value,
            email: username.current.value,
            password: password.current.value,
            first_name: firstName.current.value,
            last_name: lastName.current.value,
        }

        register(user).then((res) => {
            setToken(res.token)
            router.push('/')
        })
    }

    return (
        <Container m="7">
            <Box m="7" style={{ padding: "20px", borderRadius: "20px", boxShadow: "0 0 20px teal", backgroundColor: "#BAC5BE" }}>
                <Heading size="8" align="center" m="5" weight="bold" style={{ color: "teal", textShadow: "1px 1px 2px black"}}>Welcome to Handcrafted Haven!</Heading>
                <Box m="4" style={{ display: "flex", justifyContent: "center" }}>
                    <Text m="2">First Name: </Text>
                    <TextField.Root
                        m="1"
                        style={{ width: "400px", backgroundColor: "#f5e8d5" }}
                        id="firstName"
                        placeholder="First Name"
                        ref={firstName}
                        type="text"
                        label="First Name"
                    />
                </Box>
                <Box m="4" style={{ display: "flex", justifyContent: "center" }}>
                    <Text m="2">Last Name: </Text>
                    <TextField.Root
                        m="1"
                        style={{ width: "400px", backgroundColor: "#f5e8d5" }}
                        id="lastName"
                        placeholder="Last Name"
                        ref={lastName}
                        type="text"
                        label="Last Name"
                    />
                </Box>
                <Box m="4" style={{ display: "flex", justifyContent: "center" }}>
                    <Text m="2">Username: </Text>
                    <TextField.Root
                        m="1"
                        style={{ width: "400px", backgroundColor: "#f5e8d5" }}
                        id="username"
                        placeholder="Username"
                        ref={username}
                        type="text"
                        label="Username"
                        required
                        autoFocus
                    />
                </Box>
                <Box m="4" style={{ display: "flex", justifyContent: "center" }}>
                    <Text m="2">Password: </Text>
                    <TextField.Root
                        m="1"
                        style={{ width: "400px", backgroundColor: "#f5e8d5" }}
                        id="password"
                        placeholder="Password"
                        ref={password}
                        type="password"
                        label="Password"
                    />
                </Box>
                <Box m="4" style={{ display: "flex", justifyContent: "center" }}>
                    <Text m="2">Email: </Text>
                    <TextField.Root
                        m="1"
                        style={{ width: "400px", backgroundColor: "#f5e8d5" }}
                        id="email"
                        placeholder="Email"
                        ref={email}
                        type="text"
                        label="Email"
                    />
                </Box>
                <Box>
                    <Box m="3" style={{ display: "flex", justifyContent: "center" }}>
                        <Button m="3" onClick={submit}>Register</Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}

Register.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Navbar />
            {page}
        </Layout>
    )
}
