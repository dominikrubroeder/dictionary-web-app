"use client";

import PlayIcon from "@/app/components/PlayIcon";
import { FormEvent, useEffect, useState } from "react";
import { Data, defaultData } from "@/data";
import SearchIcon from "@/app/components/SearchIcon";

export default function Home() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [data, setData] = useState<Data>(defaultData);

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>,
    searchValue: string
  ) {
    e.preventDefault();
    const modifiedSearchValue = searchValue
      .trim()
      .replace(" ", "")
      .toLowerCase();

    if (modifiedSearchValue === "") {
      setSearchValue("");
      return;
    }

    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${modifiedSearchValue}`
    );
    const data = await response.json();
    setSearchValue("");
    setData(data[0]);
  }

  useEffect(() => console.log(data), [data]);

  return (
    <main className="grid content-start gap-8">
      <section>
        <form
          className="relative flex"
          onSubmit={(e) => handleSubmit(e, searchValue)}
        >
          <input
            type="text"
            placeholder="Search keyword..."
            className="w-full rounded-2xl bg-gray-100 p-4 text-xl font-semibold"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2"
            aria-label="Search"
          >
            <SearchIcon />
          </button>
        </form>
      </section>

      <section className="flex justify-between gap-4">
        <div className="grid gap-2">
          <h1 className="text-6xl font-bold dark:text-white">{data.word}</h1>
          <small className="text-2xl text-purple-400">{data.phonetic}</small>
        </div>
        <button className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 p-4 text-purple-600">
          <PlayIcon />
        </button>
      </section>

      {data.meanings.map((meaning, index) => (
        <section key={index}>
          <header className="my-4 flex items-center gap-5 font-bold italic">
            <h2 className="text-2xl dark:text-white">{meaning.partOfSpeech}</h2>
            <div className="h-[1px] w-full bg-gray-100 dark:bg-gray-900"></div>
          </header>

          <h2 className="mb-4">Meaning</h2>
          <ul className="mb-8 grid list-disc gap-2 pl-5">
            {meaning.definitions.map((definition, index) => (
              <li key={index} className="text-purple-400">
                <span className="text-black dark:text-white">
                  {definition.definition}
                </span>
                {definition.example && (
                  <p className="text-black dark:text-white">
                    &ldquo;{definition.example}&rdquo;
                  </p>
                )}
              </li>
            ))}
          </ul>

          {meaning.synonyms.length >= 1 && (
            <div className="flex gap-4">
              <h3>Synonyms</h3>
              <div className="font-bold text-purple-400">
                {meaning.synonyms.map((synonym, index) => (
                  <span key={index}>{synonym}</span>
                ))}
              </div>
            </div>
          )}
        </section>
      ))}

      <hr />

      <section className="flex gap-4">
        <h4>Source</h4>
        <ul>
          {data.sourceUrls.map((url, index) => (
            <li key={index}>
              <a href={url} target="_blank">
                {url}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
