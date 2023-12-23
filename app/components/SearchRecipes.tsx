"use client"

import { FormEvent } from 'react';
import { useState } from "react"

export default function SearchRecipes({getSearchResults}: any) {
    const [query, setQuery] = useState('');

    const onChange = async (e: any) => {
        setQuery(e.target.value);
    }

    const onKeyUp = async (e: any) => {
        onSubmit(e);
    }

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const response = await fetch(`/api/search?query=${query}`);
        const data = await response.json();
        
        getSearchResults(data)
    }

    return (
        <div className="flex grow">
            <form onSubmit={onSubmit} className="flex grow gap-3">
                <input className="bg-zinc-800 grow bg-transparent rounded-xl border-zinc-800" type="text" placeholder="Search" value={query} onChange={onChange} onKeyUp={onKeyUp}/>
                <button className="bg-zinc-800 border border-zinc-800 p-2 rounded-xl" type="submit">Seach</button>
            </form>
        </div>
    )
}