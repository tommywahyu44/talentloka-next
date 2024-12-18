'use client'

import { fireAuth, firestore } from '@/plugins/firebase'
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setPersistence(fireAuth, browserLocalPersistence).catch(console.error)

    const unsubscribe = onAuthStateChanged(fireAuth, async (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signup = async (email, password) => {
    const { user } = await createUserWithEmailAndPassword(fireAuth, email, password)
    await setDoc(doc(firestore, 'users', user.uid), {
      email: user.email,
      onboardingStep: 'email-verification',
      createdAt: new Date().toISOString(),
      isApproved: false,
    })
    await verifyEmail()
  }

  const signin = async (email, password) => {
    return await signInWithEmailAndPassword(fireAuth, email, password)
  }

  const signout = async () => {
    await signOut(fireAuth)
  }

  const verifyEmail = async () => {
    if (!currentUser) throw new Error('No user logged in')
    await sendEmailVerification(currentUser)
  }

  const value = {
    currentUser,
    signup,
    signin,
    signout,
    verifyEmail,
    loading,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
