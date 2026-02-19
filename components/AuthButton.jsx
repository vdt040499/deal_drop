"use client"

import React, { useEffect, useState } from 'react'
import { LogIn, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

import { signOut } from '@/app/actions'
import AuthModal from './AuthModal'

const AuthButton = ({ user }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    console.log(user)
  }, [user])

  if (user) {
    return (
      <form action={signOut}>
        <Button variant="ghost" size="sm" type="submit" className="gap-2">
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </form>
    );
  }


  return (
    <>
      <Button
        variant="default"
        size="sm"
        className="gap-2 font-semibold"
        onClick={() => setShowAuthModal(true)}
      >
        <LogIn className="h-4 w-4" />
        Sign In</Button>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  )
}

export default AuthButton