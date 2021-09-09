export interface Odds {
  id: number,
  week: number,
  away_team: string,
  away_spread: string,
  home_team: string,
  home_spread: string,
  winner: null,
  isLocked: boolean
  selection: string
}
