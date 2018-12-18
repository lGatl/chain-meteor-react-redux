import React from 'react';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } 	from 'redux';
import ReduxPromise from 'redux-promise';

import reducers from '../7_reducers';

import SmartMenu from '../_common/5_smartComponent/SmartMenu';
import TitlePage from '../_common/5_smartComponent/TitlePage';
import Footer from '../_common/4_dumbComponent/Footer';
import Resize from '../_common/5_smartComponent/Resize';
import InitState from '../_common/5_smartComponent/InitState';

var store={};
//To make working ReduxDevTools (), remove it in prod
const composeEnhancers = composeWithDevTools({});

store = createStore(reducers,composeEnhancers(
	applyMiddleware(ReduxPromise)
));
//A simple Layout with Provider for the state Redux
export const Layout = ({ content }) => {

	return(
		<Provider store={store}>
			<div style={{
				display: 'flex',
				minHeight: '100vh',
				flexDirection: 'column'
			}}>
				{/* Component to initiate first request in database, to get global needed state */}
				<InitState/>
				{/* Component to give the windowWidth in Redux state */}
				<Resize/>
				{/* Call the Menu on the top */}
				<SmartMenu  />
				{/* This component display the title of the page */}
				<TitlePage />
					
					<div style={{
								flex:1,
								display: 'flex',
								flexDirection:'column'
							}}>	
								{/* Here is put component injected by the router */}
								{content}
							</div>
				<Footer style = {{flex:'none'}}/>
			</div>
		</Provider>
	);
};
