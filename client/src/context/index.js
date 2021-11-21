import { useReducer, createContex, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const initialState = {
	user: null,
};

const rootReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return { ...state, user: action.payload };
		case 'LOGOUT':
			return { ...state, user: null };
		default:
			return state;
	}
};

const Provider = ({ children }) => {
	const [state, dispatch] = useReducer(rootReducer, initialState);

	const history = useHistory();

	const loginUser = async () => {
		const { data } = await axios.get('/auth/login');
	};

	useEffect(() => {
		const user = loginUser();
		dispatch({
			type: 'LOGIN',
			payload: user,
		});
	}, []);
};
