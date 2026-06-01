export type Sport =
  | "NFL"
  | "NBA"
  | "MLB"
  | "NHL"
  | "MLS"
  | "Soccer"
  | "NCAAF"
  | "NCAAB"
  | "UFC"
  | "Boxing"
  | "Wrestling"
  | "Tennis"
  | "Golf"
  | "Esports"
  | "Concert"
  | "Theatre"
  | "Comedy"
  | "Family"
  | "Festival"
  | "Other";

export const SPORTS: Sport[] = [
  "NFL",
  "NBA",
  "MLB",
  "NHL",
  "MLS",
  "Soccer",
  "NCAAF",
  "NCAAB",
  "UFC",
  "Boxing",
  "Wrestling",
  "Tennis",
  "Golf",
  "Esports",
  "Concert",
  "Theatre",
  "Comedy",
  "Family",
  "Festival",
  "Other",
];

export const SPORT_EMOJIS: Record<Sport, string> = {
  NFL:       "🏈",
  NBA:       "🏀",
  MLB:       "⚾",
  NHL:       "🏒",
  MLS:       "⚽",
  Soccer:    "⚽",
  NCAAF:     "🏈",
  NCAAB:     "🏀",
  UFC:       "🥊",
  Boxing:    "🥊",
  Wrestling: "🤼",
  Tennis:    "🎾",
  Golf:      "⛳",
  Esports:   "🎮",
  Concert:   "🎵",
  Theatre:   "🎭",
  Comedy:    "🎤",
  Family:    "🎪",
  Festival:  "🎉",
  Other:     "🎟️",
};

export const CATEGORY_GROUPS: { label: string; emoji: string; sports: Sport[] }[] = [
  {
    label: "All Sports",
    emoji: "🏆",
    sports: ["NFL", "NBA", "MLB", "NHL", "MLS", "Soccer", "NCAAF", "NCAAB", "UFC", "Boxing", "Wrestling", "Tennis", "Golf"],
  },
  {
    label: "Soccer / Football",
    emoji: "⚽",
    sports: ["MLS", "Soccer"],
  },
  {
    label: "Concerts",
    emoji: "🎵",
    sports: ["Concert", "Festival"],
  },
  {
    label: "Arts & Entertainment",
    emoji: "🎭",
    sports: ["Theatre", "Comedy", "Family"],
  },
];

export interface NormalizedEvent {
  id: string;
  name: string;
  sport: Sport | string;
  segment?: string;   // TM top-level segment: "Sports" | "Music" | "Arts & Theatre" | "Miscellaneous"
  genre?: string;     // TM genre / SG taxonomy detail
  league?: string;    // League / tour name
  homeTeam?: string;
  awayTeam?: string;
  homeTeamLogo?: string;
  awayTeamLogo?: string;
  venue: string;
  city: string;
  state?: string;
  country: string;
  eventDate: string;  // ISO string
  imageUrl?: string;
  lowestPrice?: number;
  averagePrice?: number;
  url?: string;
  source: string;
  externalIds: Record<string, string>;
}

export interface EventSearchParams {
  query: string;
  sport?: string;
  category?: string;  // "sports" | "music" | "arts" | "all"
  dateFrom?: string;
  dateTo?: string;
  city?: string;
  limit?: number;
}
