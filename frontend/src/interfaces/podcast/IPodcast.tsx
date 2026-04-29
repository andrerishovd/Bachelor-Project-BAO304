/**
 * IPodcast
 *
 * Represents a generated podcast episode.
 * Matches the expected backend response structure.
 */
export interface IPodcast {
  id: string;
  title: string;
  audioUrl: string;
  imageUrl?: string;
  duration: number;
  createdAt: string; // ISO 8601
  settings: {
    length: "short" | "medium" | "long";
    tone: "formal" | "casual";
    speakers: 1 | 2;
    language: string;
  };
}
