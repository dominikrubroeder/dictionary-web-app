"use client"

import PlayIcon from "@/app/components/PlayIcon";
import {FormEvent, useState} from "react";
import {Data, defaultData} from "@/data";

export default function Home() {
    const [searchValue, setSearchValue] = useState<string>('')
    const [data, setData] = useState<Data>(defaultData)

    async function handleSubmit(e: FormEvent<HTMLFormElement>, searchValue: string) {
        e.preventDefault()
        const modifiedSearchValue = searchValue.trim().replace(' ', '').toLowerCase()

        if (modifiedSearchValue === '') {
            setSearchValue('')
            return
        }

        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${modifiedSearchValue}`)
        const data = await response.json()
        setSearchValue(modifiedSearchValue)
        setData(data[0])
    }

    return (
        <main className="grid content-start gap-8">
            <section>
                <form onSubmit={(e) => handleSubmit(e, searchValue)}>
                    <input type="text" placeholder="Search keyword..." className="text-xl font-semibold p-4 rounded-2xl bg-gray-100" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
                    <button type="submit">Search</button>
                </form>
            </section>

            <section className="flex gap-4 justify-between">
                <div className="grid gap-2">
                    <h1 className="text-6xl font-bold">{data.word}</h1>
                    <small className="text-purple-400">{data.phonetic}</small>
                </div>
                <button
                    className="bg-purple-100 flex items-center justify-center p-4 rounded-full w-20 h-20 text-purple-600">
                    <PlayIcon/>
                </button>
            </section>

            <section>
                <header className="flex items-center gap-5 italic font-bold my-4">
                    <h2 className="text-2xl">noun</h2>
                    <div className="w-full h-[1px] bg-gray-100"></div>
                </header>

                <h2 className="mb-4">Meaning</h2>
                <ul className="grid gap-2 list-disc pl-5 mb-8">
                    <li className="text-purple-400">
                        <span className="text-black">(etc.) A set of keys used to operate a typewriter, computer etc.</span>
                    </li>
                    <li className="text-purple-400">
                        <span className="text-black">A component of many instruments including the piano, organ, and harpsichord consisting of
                        usually black and white keys that cause different tones to be produced when struck.</span>
                    </li>
                    <li className="text-purple-400">
                        <span className="text-black">A device with keys of a musical keyboard, used to control electronic sound-producing devices
                        which may be built into or separate from the keyboard device.</span>
                    </li>
                </ul>

                <div className="flex gap-4">
                    <h3>Synonyms</h3>
                    <div className="font-bold text-purple-400">electronic keyboard</div>
                </div>
            </section>

            <section>
                <header className="flex items-center gap-5 italic font-bold my-4">
                    <h2 className="text-2xl">verb</h2>
                    <div className="w-full h-[1px] bg-gray-100"></div>
                </header>

                <h2 className="mb-4">Meaning</h2>
                <ul className="grid gap-2 list-disc pl-5">
                    <li className="text-purple-400">
                        <span className="text-black">To type on a computer keyboard.</span>
                    </li>
                </ul>
                <p>“Keyboarding is the part of this job I hate the most.”</p>
            </section>

            <hr/>

            <section className="flex gap-4">
                <h4>Source</h4>
                <div>https://en.wiktionary.org/wiki/keyboard</div>
            </section>
        </main>
    )
}
