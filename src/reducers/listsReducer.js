import { ADD_CARD, ADD_LIST, DRAG_HAPPENED} from '../actions/actionType';

let listID = 0;
let cardID = 0;

const intialState = [];
const listsReducer = (state = intialState, action) => {
	switch (action.type) {
		case ADD_LIST: {
			const newList = {
				title: action.payload,
				cards: [],
				id: `list-${listID}`,
			};
			listID += 1;
			return [...state, newList];
		}

		case ADD_CARD: {
			const newCard = {
				text: action.payload.text,
				id: `card-${cardID}`,
			};
			cardID += 1;

			const newState = state.map((list) => {
				if (list.id === action.payload.listID) {
					return {
						...list,
						cards: [...list.cards, newCard],
					};
				} else {
					return list;
				}
			});
			return newState;
		}

		case DRAG_HAPPENED: {
			const {
				droppableIdStart,
				droppableIdEnd,
				droppableIndexStart,
				droppableIndexEnd,
				type,
			} = action.payload;
			const newState = [...state];
			if (type === 'list') {
				const list = newState.splice(droppableIndexStart, 1);
				newState.splice(droppableIndexEnd, 0, ...list);
				return newState;
			}
			if (droppableIdStart === droppableIdEnd) {
				const list = state.find((list) => droppableIdStart === list.id);
				const card = list.cards.splice(droppableIndexStart, 1);
				list.cards.splice(droppableIndexEnd, 0, ...card);
			}
			if (droppableIdStart !== droppableIdEnd) {
				const listStart = state.find((list) => droppableIdStart === list.id);
				const card = listStart.cards.splice(droppableIndexStart, 1);
				const listEnd = state.find((list) => droppableIdEnd === list.id);
				listEnd.cards.splice(droppableIndexEnd, 0, ...card);
			}
			return newState;
		}

        
		default:
			return state;
	}
};

export default listsReducer;
