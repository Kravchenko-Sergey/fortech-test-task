import { setChildCommentsAC, setNewsListAC, setSelectedItemAC, setSelectedItemCommentsAC } from './news-list-reducer'

export type InitialStateType = {
	newsList: ListType[]
	selectedItem: {
		comments: []
	}
}

export type ListType = {
	by: string
	descendants: number
	kids?: number[]
	text: string
	id: number
	score: number
	time: number
	title: string
	type: string
	url: string
}

export type SetNewsListACType = ReturnType<typeof setNewsListAC>
export type SetSelectedItemACType = ReturnType<typeof setSelectedItemAC>
export type SetSelectedItemCommentsACType = ReturnType<typeof setSelectedItemCommentsAC>
export type SetChildCommentsACType = ReturnType<typeof setChildCommentsAC>

export type ActionsType =
	| SetNewsListACType
	| SetSelectedItemACType
	| SetSelectedItemCommentsACType
	| SetChildCommentsACType
