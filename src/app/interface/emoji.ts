export interface Emoji {
  id: string;
  aliases: string[];
  name: string;
  category: string | null;
  host: string | null;
  url: string;
}
