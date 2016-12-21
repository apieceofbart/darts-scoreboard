export const ADD_PLAYER = 'ADD_PLAYER';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';
export const EDIT_PLAYER = 'EDIT_PLAYER';

export function addPlayer(name) {
	return {
		type: ADD_PLAYER,
		name
	}
};

export function removePlayer(id) {
	return {
		type: REMOVE_PLAYER,
		id
	}
};


export function editPlayer(id, name) {
	return {
		type: EDIT_PLAYER,
		id,
		name
	}
};