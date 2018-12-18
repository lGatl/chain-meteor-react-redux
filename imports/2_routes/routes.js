import React from 'react';
import { mount } from 'react-mounter';

import {Layout } from '../3_layout/layout';

import HomePage from '../4_pages/HomePage';
import ConnexionPage from '../4_pages/ConnexionPage';
import InfiniteScrollPage from '../4_pages/InfiniteScrollPage';

//Here we declare Routes and inject Pages components into the Layout
FlowRouter.route( '/', {
	name: 'home',
	action: function() {
		mount(Layout, { content: <HomePage /> });
		window.scrollTo(0, 0);
	}
});
FlowRouter.route( '/connexion', {
	name: 'connexion',
	action: function() {
		mount(Layout, { content: <ConnexionPage /> });
		window.scrollTo(0, 0);
	}
	});
FlowRouter.route( '/infinite_scroll', {
	name: 'infinite_scroll',
	action: function() {
		mount(Layout, { content: <InfiniteScrollPage /> });
		window.scrollTo(0, 0);
	}
	});
