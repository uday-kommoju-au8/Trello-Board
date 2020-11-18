import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TrelloCard from './TrelloCard';
import TrelloActionButton from './TrelloActionButton';

const TrelloList = ({ title, cards, listID, index }) => {
	return (
		<Draggable draggableId={String(listID)} index={index}>
			{(provided) => (
				<div
					{...provided.draggableProps}
					ref={provided.innerRef}
					{...provided.dragHandleProps}
					style={styles.container}
				>
					<Droppable droppableId={String(listID)}>
						{(provided) => (
							<div {...provided.droppableProps} ref={provided.innerRef}>
								<h4>{title}</h4>
								{cards.map((card, index) => (
									<TrelloCard
										key={card.id}
										text={card.text}
										id={card.id}
										index={index}
										listID={listID}
									/>
								))}
								{provided.placeholder}
								<TrelloActionButton listID={listID} />
							</div>
						)}
					</Droppable>
				</div>
			)}
		</Draggable>
	);
};

const styles = {
	container: {
		backgroundColor: 'gray',
		borderRadius: 3,
		width: 300,
		height: '100%',
		padding: 8,
		marginRight: 8,
		
	},
};

export default TrelloList;
