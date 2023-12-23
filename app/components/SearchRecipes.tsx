"use client"

import Link from "next/link"
import { useState } from "react"

export default function SearchRecipes({getSearchResults}: any) {
    const [query, setQuery] = useState('');

    const onChange = async (e: any) => {
        const q = e.target.value;
        setQuery(q);
    }

    const onKeyUp = async (e: any) => {
        handleSubmit(e);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const response = await fetch(`/api/search?query=${query}`);
        const recipe = await response.json();
        getSearchResults(recipe)
    }

    return (
        <div className="flex grow">
            <form onSubmit={handleSubmit} className="flex grow gap-3">
                <input className="bg-zinc-800 grow bg-transparent rounded-xl border-zinc-800" type="text" placeholder="Search" value={query} onChange={onChange} onKeyUp={onKeyUp}/>
                <button className="bg-zinc-800 border border-zinc-800 p-2 rounded-xl" type="submit">Seach</button>
            </form>
        </div>
    )
}