import axios from 'axios';
import { API_BASE_HOST, POKEMON_PATH } from './constant';

export const fetchPokemonCharacter = (
  offset = 20,
  limit = 20,
) => axios.request({
  baseURL: API_BASE_HOST,
  url: POKEMON_PATH,
  params: {
    offset,
    limit,
  }
});

export const getPokemonDetailByName = (
  name = '',
) => axios.request({
  baseURL: API_BASE_HOST,
  url: `${POKEMON_PATH}/${name}`,
});
