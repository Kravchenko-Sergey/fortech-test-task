import { Dispatch } from 'redux'
import { newsListApi } from '../base-api'
import { setStatusAC } from '../app-reducer'
import { Comment } from '../../components/news-item/news-item'

const initialState: InitialStateType = {
	newsList: [],
	selectedItem: {
		comments: []
	}
}

export const newsListReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'SET_NEWS_LIST':
			return { ...state, newsList: action.newsList }
		case 'SET_ITEM':
			return { ...state, selectedItem: { ...state.selectedItem.comments, ...action.item } }
		case 'SET_SELECTED_ITEM_COMMENTS':
			return { ...state, selectedItem: { comments: action.comments } }
		case 'SET_CHILD_COMMENTS':
			return { ...state, selectedItem: { comments: action.comments } }
		default:
			return state
	}
}

export const setNewsListAC = (newsList: ListType[]) => ({ type: 'SET_NEWS_LIST', newsList }) as const
export const setSelectedItemAC = (item: any) => ({ type: 'SET_ITEM', item }) as const
export const setSelectedItemCommentsAC = (comments: any) => ({ type: 'SET_SELECTED_ITEM_COMMENTS', comments }) as const
export const setChildCommentsAC = (comments: any) => ({ type: 'SET_CHILD_COMMENTS', comments }) as const

export const fetchNewsList = () => async (dispatch: Dispatch) => {
	dispatch(setStatusAC('loading'))
	const data = await newsListApi.getNewsList()
	const data2 = data.data.map((el: number) => newsListApi.getNewsItem(el))
	Promise.all(data2.slice(0, 200)).then(res => {
		const data = res.map(d => d.data)
		dispatch(setNewsListAC(data.filter(d => d !== null)))
		dispatch(setStatusAC('succeeded'))
	})
}

export const fetchSelectedItem = (id: number) => async (dispatch: Dispatch) => {
	const data2 = await newsListApi.getNewsItem(id)
	dispatch(setSelectedItemAC(data2.data))
}

export const fetchSelectedItemComments = (commentsIds: number[]) => async (dispatch: Dispatch) => {
	dispatch(setStatusAC('loading'))
	const data2 = commentsIds.map((el: number) => newsListApi.getNewsComments(el))
	Promise.all(data2).then(res => {
		const data = res.map(d => d.data)
		dispatch(setSelectedItemCommentsAC(data.filter(d => d !== null)))
		dispatch(setStatusAC('succeeded'))
	})
}

export const fetchChildComments = (kids: Comment[]) => (dispatch: Dispatch) => {
	dispatch(setStatusAC('loading'))
	const data = kids.map((el: any) => newsListApi.getNewsComments(el))
	Promise.all(data).then(res => {
		const data2 = res.map(d => d.data)
		dispatch(setChildCommentsAC(data2))
		dispatch(setStatusAC('succeeded'))
	})
}

type InitialStateType = {
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

type ActionsType = SetNewsListACType | SetSelectedItemACType | SetSelectedItemCommentsACType | SetChildCommentsACType
