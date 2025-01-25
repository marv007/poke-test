export interface PokeTypes {
  type: {
    name: string;
  };
}

export interface PokeStats {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokeApiSingleResponse {
  abilities: [];
  base_experience: number;
  cries: [];
  forms: [];
  game_indices: [];
  height: number;
  held_items: [];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: [];
  name: string;
  order: number;
  sprites: {
    back_default: string;
    front_default: string;
  };
  stats: PokeStats[];
  types: [];
  weight: number;
}
