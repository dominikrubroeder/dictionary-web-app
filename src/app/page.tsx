"use client";

import { FormEvent, useEffect, useState } from "react";
import { Data, defaultData, SearchValue } from "@/data";
import SearchIcon from "@/app/components/SearchIcon";
import { useAnimate } from "framer-motion";
import AudioComponent from "@/app/components/AudioComponent";

export default function Home() {
  const [data, setData] = useState<Data | null>(defaultData);
  const [searchValue, setSearchValue] = useState<SearchValue>({
    hasError: false,
    value: "",
  });
  const [scope, animate] = useAnimate();

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
      setSearchValue({ hasError: true, value: "" });
      return;
    }

    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${modifiedSearchValue}`
    );

    if (!response.ok) {
      return setData(null);
    }

    const data = await response.json();
    setSearchValue({ hasError: false, value: "" });
    setData(data[0]);
  }

  const phonetics = data?.phonetics.find((phonetic) => phonetic.audio !== "");

  useEffect(() => {
    animate(
      scope.current,
      {
        opacity: [0, 1],
        y: [16, 0],
      },
      { duration: 0.3 }
    );
  }, [animate, scope, data]);

  return (
    <main className="grid content-start gap-8">
      <section>
        <form
          className="relative flex"
          onSubmit={(e) => getApiData(e, searchValue.value)}
        >
          <input
            type="text"
            placeholder="Search keyword..."
            className={`w-full rounded-2xl border-[1px] bg-gray-100 p-4 text-xl font-semibold outline-0 ${
              searchValue.hasError
                ? "border-app-peach"
                : "border-transparent focus:border-app-purple"
            }`}
            value={searchValue.value}
            onChange={(e) =>
              setSearchValue((prevState) => {
                return { ...prevState, value: e.target.value };
              })
            }
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2"
            aria-label="Search"
          >
            <SearchIcon />
          </button>
        </form>
        {searchValue.hasError && (
          <div className="mt-1.5 text-app-peach">
            Whoops, can&apos;t be empty...
          </div>
        )}
      </section>

      {searchValue.hasError ? (
        <div></div>
      ) : data === null ? (
        <div
          ref={scope}
          className="fm-animate grid gap-6 text-center opacity-0"
        >
          <p className="text-6xl">😕</p>
          <div className="grid gap-4">
            <h1 className="font-bold dark:text-white">No Definitions found.</h1>
            <p className="text-app-gray-500">
              Sorry pal, we couldn&apos;t find definitions for the word you were
              looking for. You can try the search again at later time or head to
              the web instead.
            </p>
          </div>
        </div>
      ) : (
        <>
          <section
            ref={scope}
            className="fm-animate flex flex-wrap justify-between gap-4 opacity-0"
          >
            <div className="grid gap-2">
              <h1 className="break-all text-6xl font-bold dark:text-white">
                {data?.word}
              </h1>
              <small className="text-2xl text-purple-400">
                {data?.phonetic}
              </small>
            </div>

            {phonetics?.audio && <AudioComponent src={phonetics.audio} />}
          </section>

          {data?.meanings.map((meaning, index) => (
            <section key={index}>
              <header className="my-4 flex items-center gap-5 font-bold italic">
                <h2 className="text-2xl dark:text-white">
                  {meaning.partOfSpeech}
                </h2>
                <div className="h-[1px] w-full bg-app-gray-200 dark:bg-app-gray-700"></div>
              </header>

              <h2 className="mb-4 text-app-gray-500">Meaning</h2>
              <ul className="mb-8 grid list-disc gap-2 pl-5">
                {meaning.definitions.map((definition, index) => (
                  <li key={index} className="text-purple-400">
                    <span className="text-black dark:text-white">
                      {definition.definition}
                    </span>
                    {definition.example && (
                      <p className="mt-2 text-app-gray-500">
                        &ldquo;{definition.example}&rdquo;
                      </p>
                    )}
                  </li>
                ))}
              </ul>

              {meaning.synonyms.length >= 1 && (
                <div className="flex gap-4">
                  <h3 className="text-app-gray-500">Synonyms</h3>
                  <div className="flex flex-wrap items-center gap-2 font-bold text-purple-400">
                    {meaning.synonyms.map((synonym, index) => (
                      <div
                        key={index}
                        className="group flex items-center gap-2"
                      >
                        <span
                          className="inline-block cursor-pointer"
                          onClick={() => getApiData(null, synonym)}
                        >
                          {synonym}
                        </span>
                        <span className="inline-block h-6 w-[1px] bg-app-gray-200 group-last-of-type:hidden dark:bg-app-gray-700"></span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          ))}

          <hr className="border-app-gray-200 dark:border-app-gray-700" />

          <section className="flex gap-4">
            <h4 className="text-sm text-app-gray-500 underline">Source</h4>
            <ul className="grid gap-1">
              {data?.sourceUrls.map((url, index) => (
                <li key={index} className="leading-[1]">
                  <a
                    className="break-all text-sm underline dark:text-white"
                    href={url}
                    target="_blank"
                  >
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
