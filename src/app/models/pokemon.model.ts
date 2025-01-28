interface Stats {
  key: string;
  name: string;
  value: number;
  defaultValue: number;
}
export interface Pokemon {
  name: string;
  url: string;
  sprite?: string;
  index?: number;
  types?: string[];
  stats: Stats[];
}
