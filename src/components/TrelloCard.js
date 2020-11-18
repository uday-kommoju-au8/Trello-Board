import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreator from '../actions/listsActions';
class TrelloCard extends Component {
	
	handleDeleteCard = () => {
		this.props.actionCreator.deleteCard(this.props.listID, this.props.id);
	};

	render() {
		const { text, id, index } = this.props;
		return (
			<Draggable draggableId={String(id)} index={index}>
				{(provided) => (
					<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
						<Card style={styels.cardContainer}>
							<CardContent>
								<Typography gutterBottom>{text}</Typography>
								
							</CardContent>
						</Card>
					</div>
				)}
			</Draggable>
		);
	}
}

const styels = {
	cardContainer: {
		marginBottom: 8,
	},
	icon: {
		marginLeft: 250,
		cursor: 'pointer',
	},
};

const mapDispatchToProps = (dispatch) => {
	return {
		actionCreator: bindActionCreators(actionCreator, dispatch),
	};
};

export default connect(null, mapDispatchToProps)(TrelloCard);
