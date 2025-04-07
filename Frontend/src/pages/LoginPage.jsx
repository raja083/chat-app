import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
function LoginPage() {
    const {authUser} = useAuthStore()
  return (
    <div>
      Login Page
    </div>
  )
}

export default LoginPage
