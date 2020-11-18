import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';
import { bindActionCreators } from 'redux';
import * as actionCreator from '../actions/listsActions';

class TrelloActionButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formOpen: false,
			text: '',
		};
	}
	openForm = () => {
		this.setState({ formOpen: true });
	};

	closeForm = () => {
		this.setState({ formOpen: false });
	};

	handleInputChange = (event) => {
		this.setState({
			text: event.target.value,
		});
	};

	handleAddList = () => {
		const { text } = this.state;

		if (text) {
			this.setState({
				text: '',
			});
			this.props.actionCreator.addList(text);
		}
		return;
	};

	handleAddCard = () => {
		const { listID } = this.props;
		const { text } = this.state;

		if (text) {
			this.setState({
				text: '',
			});
			this.props.actionCreator.addCard(listID, text);
		}
	};

	renderAddButton = () => {
		const { list } = this.props;
		const buttonText = list ? 'Add another list' : 'Add another card';
		const buttonTextOpacity = list ? 1 : 0.5;
		const buttonTextColor = list ? 'black' : 'inherit';
		const buttonTextBackground = list ? 'White' : 'inherit';

		return (
			<div
				onClick={this.openForm}
				style={{
					...styles.openForButtonGroup,
					opacity: buttonTextOpacity,
					color: buttonTextColor,
					background: buttonTextBackground,
				}}
			>
				
				<p>{buttonText}</p>
			</div>
		);
	};

	renderForm = () => {
		const { list } = this.props;
		console.log(list);
		const placeholder = list ? 'Enter list title...' : 'Enter a title for this card';
		const buttonTitle = list ? 'Add List' : 'Add Card';
		return (
			<div>
				<Card
					style={{
						minHeight: 85,
						minWidth: 272,
						padding: '6px 8px 2px',
					}}
				>
					<Textarea
						style={{
							resize: 'none',
							width: '100%',
							overflow: 'hidden',
							outline: 'none',
							border: 'none',
						}}
						placeholder={placeholder}
						autoFocus
						onBlur={this.closeForm}
						value={this.state.text}
						onChange={this.handleInputChange}
					/>
				</Card>
				<div style={styles.formButtonGroup}>
					<Button
						onMouseDown={list ? this.handleAddList : this.handleAddCard}
						variant="contained"
						style={{ color: 'Black', backgroundColor: '#5aac44' }}
					>
						{buttonTitle}
					</Button>
				
				</div>
			</div>
		);
	};

	render() {
		return this.state.formOpen ? this.renderForm() : this.renderAddButton();
	}
}

const styles = {
	openForButtonGroup: {
		
		display: 'flex',
		alignItems: 'center',
		cursor: 'pointer',
		borderRadius: 3,
		height: 36,
		width: 272,
		paddinLeft: 10,
	},
	formButtonGroup: {
		marginTop: 10,
		display: 'flex',
		alignItems: 'center',
	
	},
};

const mapDispatchToProps = (dispatch) => {
	return {
		actionCreator: bindActionCreators(actionCreator, dispatch),
	};
};

export default connect(null, mapDispatchToProps)(TrelloActionButton);
