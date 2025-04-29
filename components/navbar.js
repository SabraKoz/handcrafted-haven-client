import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { useAppContext } from '../context/state'
import { useRouter } from 'next/router'
import { Flex, TabNav } from '@radix-ui/themes'

export default function Navbar() {
  const { token, profile } = useAppContext()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  const { pathname } = useRouter()

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true)
    }
  }, [token])

  // const getLoggedInButtons = () => {
  //   return (
  //     <section>
  //       <div>
  //         <Link href="/cart" className="navbar-item">Cart</Link>
  //         <Link href="/my-orders" className="navbar-item">My Orders</Link>
  //         <Link href="/payments" className="navbar-item">Payment Methods</Link>
  //         <Link href="/profile" className="navbar-item">Profile</Link>
  //         {
  //           profile.store ?
  //             <>
  //               <Link href={`/stores/${profile.store.id}`} className="navbar-item">View Your Store</Link>
  //               <Link href="/products/new" className="navbar-item">Add a new Product</Link>
  //             </>
  //             :
  //             <Link href="/stores/new" className="navbar-item">Interested in selling?</Link>
  //         }
  //         <hr className="navbar-divider"></hr>
  //         <Link href='/login' className="navbar-item" onClick={
  //           () => {
  //             localStorage.removeItem('token')
  //             setIsLoggedIn(false)
  //             router.push('/login')
  //           }}
  //         >
  //           Log out
  //         </Link>
  //       </div>
  //     </section>
  //   )
  // }

  // const getLoggedOutButtons = () => {
  //   return (
  //     <div>
  //       <div>
  //         <Link href="/register">
  //           <strong>Sign up</strong>
  //         </Link>
  //         <Link href="/login">
  //           Log in
  //         </Link>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <Flex direction="column" gap="4" p="3">
      <TabNav.Root color="violet">

        <TabNav.Link style={{ padding: "15px" }} href="/products" active={pathname === "/products"}>
          Products
        </TabNav.Link>

        <TabNav.Link style={{ padding: "15px" }} href="/stores" active={pathname === "/stores"}>
          Stores
        </TabNav.Link>

        {/* <div >
          {
            isLoggedIn ? getLoggedInButtons() : getLoggedOutButtons()
          }
        </div> */}
      </TabNav.Root>
    </Flex>
  )
}
