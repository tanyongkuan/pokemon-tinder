import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { Pokemon, Payload } from '../assets/models';
import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

interface PokemonState {
	suggestedPokemon: Pokemon[];
	matches: Pokemon[];
	offset: number;
}

const initialState: PokemonState = {
	suggestedPokemon: [],
	matches: [],
	offset: 0,
};

//ThunkActions
export const getSuggestedPokemon =
	(): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch, getState) => {
		if (initialState.offset === 0) {
			const offset = localStorage.getItem('offset');
			if (offset) {
				dispatch(pokemon.actions.setOffset(+offset));
			}
		}

		const response = await axios.get<Payload<Pokemon[]>>(
			`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${
				getState().pokemon.offset
			}`
		);
		const results = response.data.results;

		const getStat = async (idx: number) => {
			const response = await axios.get<Pokemon>(
				`https://pokeapi.co/api/v2/pokemon-form/${idx}`
			);

			return await response.data;
		};

		const pokemonData: Array<Pokemon> = await Promise.all(
			results.map(async (result: Pokemon, idx: number) => {
				const id = getState().pokemon.offset + idx + 1;
				const imgIndex = ('00' + id).slice(-3);
				const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${imgIndex}.png`;

				const responseData = await getStat(id);

				return {
					...result,
					id,
					image,
					types: responseData.types,
				};
			})
		);

		dispatch(pokemon.actions.setSuggestedPokemon(pokemonData.reverse()));
	};

export const getMatches =
	(): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
		let matchIDs = [];
		const storageMatches = localStorage.getItem('matches');

		if (storageMatches) {
			matchIDs = storageMatches.split(',');

			const pokemonData: Array<Pokemon> = await Promise.all(
				matchIDs.map(async (id: string) => {
					const response = await axios.get<Pokemon>(
						`https://pokeapi.co/api/v2/pokemon/${id}`
					);
					const results = response.data;

					const imgIndex = ('00' + id).slice(-3);
					const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${imgIndex}.png`;

					return {
						id: +id,
						name: results.name,
						url: `https://pokeapi.co/api/v2/pokemon/${id}`,
						image,
						types: results.types,
					};
				})
			);

			dispatch(pokemon.actions.setMatches(pokemonData));
		}
	};

export const castVote =
	(
		pokemonData: Pokemon,
		vote: boolean
	): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch, getState) => {
		const suggestedPokemon = [...getState().pokemon.suggestedPokemon].reverse();
		suggestedPokemon.shift();

		if (vote) {
			//Add to match list
			let matches: string[] = [];
			const storageMatches = localStorage.getItem('matches');

			if (storageMatches) {
				matches = [...storageMatches.split(',')];
			}
			matches.push(pokemonData.id.toString());

			localStorage.setItem('matches', matches.join(','));

			dispatch(pokemon.actions.setMatch(pokemonData));
		}
		//Update to localStorage
		localStorage.setItem('offset', pokemonData.id.toString());
		dispatch(pokemon.actions.setOffset(pokemonData.id));

		dispatch(pokemon.actions.setSuggestedPokemon(suggestedPokemon.reverse()));
	};

export const pokemon = createSlice({
	name: 'pokemon',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		setOffset: (state, action: PayloadAction<number>) => {
			return {
				...state,
				offset: action.payload,
			};
		},
		setSuggestedPokemon: (state, action: PayloadAction<Pokemon[]>) => {
			return {
				...state,
				suggestedPokemon: action.payload,
			};
		},
		setMatch: (state, action: PayloadAction<Pokemon>) => {
			return {
				...state,
				matches: [...state.matches, action.payload],
			};
		},
		setMatches: (state, action: PayloadAction<Pokemon[]>) => {
			return {
				...state,
				matches: [...action.payload],
			};
		},
	},
});

export const { setOffset, setSuggestedPokemon, setMatch } = pokemon.actions;

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.counter.value;

export default pokemon.reducer;
