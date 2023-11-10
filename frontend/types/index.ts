export type NavItemType = {
  title: string,
  href: string,
}

export type UserType = {
  email: string,
  name: string,
  isLoggedIn: boolean,
}

export type SentimentType = {
  id: number,
  name: string,
  count: number,
}

export type DailyScoreType = {
  date: string,
  score: number,
}
