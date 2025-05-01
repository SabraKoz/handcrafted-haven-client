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
            <Box m="7" style={{ padding: "20px", borderRadius: "20px", boxShadow: "0 0 20px skyblue" }}>
                <Heading size="8" align="center" m="5" weight="bold" style={{ color: "skyblue", textShadow: "2px 2px 2px gray"}}>Welcome to Handcrafted Haven</Heading>
                <Box m="4" style={{ display: "flex", justifyContent: "center" }}>
                    <Text m="2">First Name: </Text>
                    <TextField.Root
                        m="1"
                        style={{ width: "400px" }}
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
                        style={{ width: "400px" }}
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
                        style={{ width: "400px" }}
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
                        style={{ width: "400px" }}
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
                        style={{ width: "400px" }}
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
                        <Link href="/login">
                            <Button m="3">Login</Button>
                        </Link>
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
