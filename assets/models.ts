export interface Pokemon {
	id: number;
	name: string;
	url: string;
	image: string;
	types: PokemonType[];
}

export interface PokemonType {
	slot: number;
	type: {
		name: string;
		url: string;
	};
}

export interface Props {
	bgcolor: string;
}

export interface Payload<T> {
	results: T;
}
