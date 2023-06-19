"use client";

import PlayIcon from "@/app/components/PlayIcon";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Data, defaultData } from "@/data";
import SearchIcon from "@/app/components/SearchIcon";

export default function Home() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [data, setData] = useState<Data | null>(defaultData);
  const audioRef = useRef<null | HTMLAudioElement>(null);

  async function getApiData(
    e: FormEvent<HTMLFormElement> | null,
    searchValue: string
  ) {
    if (e) e.preventDefault();
    const modifiedSearchValue = searchValue
      .trim()
      .replace(" ", "-")
      .toLowerCase();

    if (modifiedSearchValue === "") {
      setSearchValue("");
      return;
    }

    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${modifiedSearchValue}`
    );

    if (!response.ok) {
      return setData(null);
    }

    const data = await response.json();
    setSearchValue("");
    setData(data[0]);
  }

  function playPhonetic() {
    if (audioRef.current) audioRef.current.play();
  }

  useEffect(() => console.log(data), [data]);

  return (
    <main className="grid content-start gap-8">
      <section>
        <form
          className="relative flex"
          onSubmit={(e) => getApiData(e, searchValue)}
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

      {data === null ? (
        <div className="grid gap-6 text-center">
          <p className="text-6xl">😕</p>
          <div className="grid gap-4">
            <h1 className="font-bold">No Definitions found.</h1>
            <p>
              Sorry pal, we couldn&apos;t find definitions for the word you were
              looking for. You can try the search again at later time or head to
              the web instead.
            </p>
          </div>
        </div>
      ) : (
        <>
          <section className="flex justify-between gap-4">
            <div className="grid gap-2">
              <h1 className="text-6xl font-bold dark:text-white">
                {data?.word}
              </h1>
              <small className="text-2xl text-purple-400">
                {data?.phonetic}
              </small>
            </div>

            {data?.phonetics.map((phonetic, index) => {
              if (phonetic.audio !== "")
                return (
                  <div key={index}>
                    <button
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 p-4 text-purple-600"
                      onClick={playPhonetic}
                    >
                      <PlayIcon />
                    </button>

                    <audio ref={audioRef}>
                      <source src={phonetic.audio} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                );
            })}
          </section>

          {data?.meanings.map((meaning, index) => (
            <section key={index}>
              <header className="my-4 flex items-center gap-5 font-bold italic">
                <h2 className="text-2xl dark:text-white">
                  {meaning.partOfSpeech}
                </h2>
                <div className="h-[1px] w-full bg-gray-100 dark:bg-gray-900"></div>
              </header>

              <h2 className="mb-4 dark:text-white">Meaning</h2>
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
                  <h3 className="dark:text-white">Synonyms</h3>
                  <div className="flex items-center gap-2 font-bold text-purple-400">
                    {meaning.synonyms.map((synonym, index) => (
                      <>
                        <span
                          key={index}
                          className="cursor-pointer"
                          onClick={() => getApiData(null, synonym)}
                        >
                          {synonym}
                        </span>
                        <span className="h-full w-[1px] bg-gray-100 last-of-type:hidden dark:bg-gray-900"></span>
                      </>
                    ))}
                  </div>
                </div>
              )}
            </section>
          ))}

          <hr className="dark:border-gray-900" />

          <section className="flex gap-4">
            <h4 className="dark:text-white">Source</h4>
            <ul>
              {data?.sourceUrls.map((url, index) => (
                <li key={index}>
                  <a className="dark:text-white" href={url} target="_blank">
                    {url}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </main>
  );
}
