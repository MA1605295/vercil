"use client";
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const CreateIdea = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const router = useRouter()

    //const today = date.getDate();

    //create ideas page
    const createIdea = async (e) => {
        const user = localStorage.getItem("identifier")
        e.preventDefault()
        //post idea to the server
        await fetch(`http://localhost:3000/api/${user}/ideas`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ title, description, user }),
        })
        //reset the form
        setTitle('')
        setDescription('')
        router.refresh()
        router.push('/ideas')
    }

    return (
        <form onSubmit={(e) => createIdea(e)}>
            <h3>Create a new idea</h3>
            <input
                type='text'
                required
                placeholder='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <textarea
                placeholder='Description'
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <button type='submit'>Create idea</button>
        </form>
    )
}

export default CreateIdea