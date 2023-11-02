import React from 'react'
import './App.css'
import { Router } from './router'
import { Provider } from 'react-redux'
import { store } from './services/store'
import { ToastContainer } from 'react-toastify'

export const App = () => {
	return (
		<Provider store={store}>
			<ToastContainer
				position='top-center'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
			/>
			<Router />
		</Provider>
	)
}
