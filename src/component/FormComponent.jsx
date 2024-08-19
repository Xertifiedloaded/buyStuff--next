import React from 'react'
import { LoginInput } from './Input'
import Button from './Button'


export default function FormComponent({ error,text, handleSubmit, payload, styleName, title, handleChange }) {
    return (
        <>
            <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">{title}</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <LoginInput payload={payload} handleChange={handleChange} />
                <Button text={text} styles={styleName} type='submit' />
            </form>
        </>
    )
}
