import React from 'react'

export default function Button({ text, styles, type }) {

    return (
        <>
            <button
                type={type}
                className={styles}
            >
                {text}
            </button>
        </>
    )
}
