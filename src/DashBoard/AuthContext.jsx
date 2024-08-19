'use client'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const Context = createContext({});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(undefined);
  const API = 'http://localhost:2024/api/users';

  const create = useCallback(async (payload) => {
    try {
      const res = await fetch(`${API}/create`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const { data, errors } = await res.json();
        if (errors) throw new Error(errors[0].message);
        setUser(data?.loginUser?.user);
        setStatus('loggedIn');
      } else {
        throw new Error('Invalid login');
      }
    } catch (e) {
      console.error(e);
      throw new Error('An error occurred while attempting to create an account');
    }
  }, []);

  const login = useCallback(async (payload) => {
    try {
      const res = await fetch(`${API}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const { user, errors, token } = await res.json();
        console.log(token);
        
        if (errors) throw new Error(errors[0].message);
        Cookies.set('token', token); 
        setUser(user);
        setStatus('loggedIn');
        console.log(user);
        
        return user;
      } else {
        throw new Error('Invalid login');
      }
    } catch (e) {
      console.error(e);
      throw new Error('An error occurred while attempting to login.');
    }
  }, []);

  // Logout user
  const logout = useCallback(async () => {
    try {
      const res = await fetch(`${API}/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        Cookies.remove('token');
        setUser(null);
        setStatus('loggedOut');
      } else {
        throw new Error('An error occurred while attempting to logout.');
      }
    } catch (e) {
      console.error(e);
      throw new Error('An error occurred while attempting to logout.');
    }
  }, []);

  // Fetch currently logged in user
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const token = Cookies.get('token');

        console.log(token);
        
        const res = await fetch(`${API}/me`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`, 
          },
        });

        if (res.ok) {
          const { user: meUser } = await res.json();
          setUser(meUser || null);
          setStatus(meUser ? 'loggedIn' : undefined);
        } else {
          setUser(null);
          setStatus(undefined);
        }
      } catch (e) {
        setUser(null);
        setStatus(undefined);
        console.error(e);
      }
    };

    fetchMe();
  }, []);

  // Forgot password
  const forgotPassword = useCallback(async (args) => {
    try {
      const res = await fetch(`${API}/forgot-password`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: args.email,
        }),
      });

      if (res.ok) {
        const { data, errors } = await res.json();
        if (errors) throw new Error(errors[0].message);
        setUser(data?.loginUser?.user);
      } else {
        throw new Error('Error in forgot password process.');
      }
    } catch (e) {
      console.error(e);
      throw new Error('An error occurred while attempting to reset the password.');
    }
  }, []);

  // Reset password
  const resetPassword = useCallback(async (args) => {
    try {
      const res = await fetch(`${API}/reset-password`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: args.password,
          passwordConfirm: args.passwordConfirm,
          token: args.token,
        }),
      });

      if (res.ok) {
        const { data, errors } = await res.json();
        if (errors) throw new Error(errors[0].message);
        setUser(data?.loginUser?.user);
        setStatus(data?.loginUser?.user ? 'loggedIn' : undefined);
      } else {
        throw new Error('Error in reset password process.');
      }
    } catch (e) {
      console.error(e);
      throw new Error('An error occurred while attempting to reset the password.');
    }
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        create,
        resetPassword,
        forgotPassword,
        status,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAuth = () => useContext(Context);