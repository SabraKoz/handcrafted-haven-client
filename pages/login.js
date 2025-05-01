import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useAppContext } from '../context/state'
import { login } from '../data/auth'
import { Box, Button, Container, Heading, Text, TextField } from '@radix-ui/themes'

export default function Login() {
    const { setToken } = useAppContext()
    const username = useRef('')
    const password = useRef('')
    const router = useRouter()

    const submit = (e) => {
        e.preventDefault()
        const user = {
            username: username.current.value,
            password: password.current.value,
        }

        login(user).then((res) => {
            setToken(res.token)
            router.push('/')
        })
    }

    return (
        <Container m="7">
            <Box m="7" style={{ padding: "20px", borderRadius: "20px", boxShadow: "0 0 20px skyblue" }}>
                <form>
                    <Heading size="8" align="center" m="5" weight="bold" style={{ color: "skyblue", textShadow: "2px 2px 2px gray"}}>Welcome Back to Handcrafted Haven!</Heading>
                    <Box m="4" style={{ display: "flex", justifyContent: "center" }}>
                        <Text m="2">Username: </Text>
                        <TextField.Root
                            m="1"
                            style={{ width: "400px" }}
                            id="username"
                            placeholder="Username"
                            ref={username}
                            type="username"
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
                            required
                            autoFocus
                        />
                    </Box>
                    <Box>
                        <Box m="3" style={{ display: "flex", justifyContent: "center" }} >
                            <Button m="3" onClick={submit}>Login</Button>
                            <Link href="/register">
                                <Button m="3">Register</Button>
                            </Link>
                        </Box>
                    </Box>
                </form>
            </Box>
        </Container>
    )
}

Login.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Navbar />
            {page}
        </Layout>
    )
}
