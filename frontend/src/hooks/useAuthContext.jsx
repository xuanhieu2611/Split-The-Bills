import React, { useContext } from 'react'
import { AuthContext } from '../contexts/authContext'

export default function useAuthContext() {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error("useAuthContext must be used inside an AuthContext Provider")
    }
  return (
    context
  )
}
