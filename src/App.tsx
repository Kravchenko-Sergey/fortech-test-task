import React from 'react'
import './App.css'
import { Router } from './router'
import { Provider } from 'react-redux'
import { store } from './services/store'

export const App = () => {
	return (
		<Provider store={store}>
			<Router />
		</Provider>
	)
}
