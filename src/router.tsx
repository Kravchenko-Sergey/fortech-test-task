import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import * as React from 'react'
import { NewsList } from './components/news-list/news-list'
import { NewsItem } from './components/news-item/news-item'

const router = createBrowserRouter([
	{
		path: '/',
		element: <NewsList />
	},
	{
		path: '/:id',
		element: <NewsItem />
	}
])

export const Router = () => {
	return <RouterProvider router={router} />
}
