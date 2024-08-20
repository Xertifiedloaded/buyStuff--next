'use client'

import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'


import { InputForm } from '../components/Input'
import { useAuth } from './AuthContext'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'



const AccountForm = () => {
    const API = 'http://localhost:3000/api/auth'
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { user, setUser } = useAuth()
  const [changePassword, setChangePassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    reset,
    watch,
  } = useForm()

  const password = useRef({})
  password.current = watch('password', '')

  const router = useNavigate()

  const onSubmit = useCallback(
    async (data) => {
      if (user) {
        const response = await fetch(`${API}/create`, {
          credentials: 'include',
          method: 'PATCH',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const json = await response.json()
          setUser(json.doc)
          setSuccess('Successfully updated account.')
          setError('')
          setChangePassword(false)
          reset({
            email: json.doc.email,
            name: json.doc.name,
            password: '',
            passwordConfirm: '',
          })
        } else {
          setError('There was a problem updating your account.')
        }
      }
    },
    [user, setUser, reset],
  )

  useEffect(() => {
    if (user === null) {
      router(
        `/login?error=${encodeURIComponent(
          'You must be logged in to view this page.',
        )}&redirect=${encodeURIComponent('/account')}`,
      )
    }
    if (user) {
      reset({
        email: user.email,
        name: user.name,
        password: '',
        passwordConfirm: '',
      })
    }
  }, [user, router, reset, changePassword])

  return (
    <form onSubmit={handleSubmit(onSubmit)} >

      {!changePassword ? (
        <div>
          <p>
            {'Change your account details below, or '}
            <button
              type="button"
              onClick={() => setChangePassword(!changePassword)}
            >
              click here
            </button>
            {' to change your password.'}
          </p>
          <InputForm
            name="email"
            label="Email Address"
            required
            register={register}
            error={errors.email}
            type="email"
          />
          <InputForm name="name" label="Name" register={register} error={errors.name} />
        </div>
      ) : (
        <div>
          <p>
            {'Change your password below, or '}
            <button
              type="button"
              onClick={() => setChangePassword(!changePassword)}
            >
              cancel
            </button>
            .
          </p>
          <InputForm
            name="password"
            type="password"
            label="Password"
            required
            register={register}
            error={errors.password}
          />
          <InputForm
            name="passwordConfirm"
            type="password"
            label="Confirm Password"
            required
            register={register}
            validate={value => value === password.current || 'The passwords do not match'}
            error={errors.passwordConfirm}
          />
        </div>
      )}
      <button
        type="submit"
        label={isLoading ? 'Processing' : changePassword ? 'Change Password' : 'Update Account'}
        disabled={isLoading}
        appearance="primary"
      />
    </form>
  )
}

export default AccountForm