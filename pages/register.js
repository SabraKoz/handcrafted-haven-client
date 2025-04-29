import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useAppContext } from '../context/state'
import { register } from '../data/auth'
import { Box, Button, Container, Heading, TextField } from '@radix-ui/themes'

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
        <Container>
            <Box m="5" style={{ padding: "20px", borderRadius: "20px", boxShadow: "0 0 20px gray", background: "teal"}}>
                <form>
                    <Heading size="8" align="center" m="4">Welcome to Handcrafted Haven</Heading>
                    <Box m="3" style={{ display: "flex", justifyContent: "center" }}>
                        <TextField.Root
                            style={{ width: "400px" }}
                            id="firstName"
                            placeholder="First Name"
                            ref={firstName}
                            type="text"
                            label="First Name"
                        />
                    </Box>
                    <Box m="3" style={{ display: "flex", justifyContent: "center" }}>
                        <TextField.Root
                            style={{ width: "400px" }}
                            id="lastName"
                            placeholder="Last Name"
                            ref={lastName}
                            type="text"
                            label="Last Name"
                        />
                    </Box>
                    <Box m="3" style={{ display: "flex", justifyContent: "center" }}>
                        <TextField.Root
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
                    <Box m="3" style={{ display: "flex", justifyContent: "center" }}>
                        <TextField.Root
                            style={{ width: "400px" }}
                            id="password"
                            placeholder="Password"
                            ref={password}
                            type="password"
                            label="Password"
                        />
                    </Box>
                    <Box m="3" style={{ display: "flex", justifyContent: "center" }}>
                        <TextField.Root
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
                            <Button onClick={submit}>Register</Button>
                        </Box>
                        <Box m="3" style={{ display: "flex", justifyContent: "center" }}>
                            <Link href="/login">
                                <Button>Cancel</Button>
                            </Link>
                        </Box>
                    </Box>
                </form>
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
