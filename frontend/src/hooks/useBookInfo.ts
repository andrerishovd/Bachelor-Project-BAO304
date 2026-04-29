// src/hooks/useBookInfo.ts
import { useState, useEffect } from "react";

export interface IBookInfo {
  isbn: string;
  title?: string;
  author?: string;
  coverUrl?: string;
}

/**
 * useBookInfo
 *
 * Fetches book metadata from Open Library API using ISBN.
 * Falls back gracefully if book is not found.
 *
 * @param isbn - ISBN-10 or ISBN-13
 */
const useBookInfo = (isbn: string) => {
  const [info, setInfo] = useState<IBookInfo>({ isbn });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch_ = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`,
        );
        const data = await res.json();
        const book = data[`ISBN:${isbn}`];

        console.log("Open Library response:", data);

        if (book) {
          setInfo({
            isbn,
            title: book.title,
            author: book.authors?.[0]?.name,
            coverUrl: book.cover?.medium,
          });
        }
      } catch {
        // Fallback – vis kun ISBN og lenke
      } finally {
        setIsLoading(false);
      }
    };

    fetch_();
  }, [isbn]);

  return { info, isLoading };
};

export default useBookInfo;
