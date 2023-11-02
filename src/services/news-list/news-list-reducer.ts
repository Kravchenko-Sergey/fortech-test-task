import { Dispatch } from 'redux'
import { newsListApi } from '../base-api'
import { setErrorAC, setStatusAC } from '../app-reducer'
import { ActionsType, InitialStateType, ListType } from './news-list-reducer-types'

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
		case 'DELETE_SELECTED_ITEM_COMMENTS':
			return { ...state, selectedItem: { comments: [] } }
		case 'SET_CHILD_COMMENTS':
			return { ...state, selectedItem: { comments: action.comments } }
		default:
			return state
	}
}

export const setNewsListAC = (newsList: ListType[]) => ({ type: 'SET_NEWS_LIST', newsList }) as const
export const setSelectedItemAC = (item: any) => ({ type: 'SET_ITEM', item }) as const
export const setSelectedItemCommentsAC = (comments: any) => ({ type: 'SET_SELECTED_ITEM_COMMENTS', comments }) as const
export const deleteSelectedItemCommentsAC = () => ({ type: 'DELETE_SELECTED_ITEM_COMMENTS' }) as const
export const setChildCommentsAC = (comments: any) => ({ type: 'SET_CHILD_COMMENTS', comments }) as const

export const fetchNewsList = () => async (dispatch: Dispatch) => {
	dispatch(setStatusAC('loading'))
	try {
		const data = await newsListApi.getNewsList()
		const data2 = data.data.map((el: number) => newsListApi.getNewsItem(el))
		Promise.all(data2.slice(0, 200)).then(res => {
			const data = res.map(d => d.data)
			dispatch(setNewsListAC(data.filter(d => d !== null)))
			dispatch(setStatusAC('succeeded'))
		})
	} catch (error) {
		setStatusAC('failed')
		setErrorAC(String(error))
	}
}

export const fetchSelectedItem = (id: number) => async (dispatch: Dispatch) => {
	try {
		const data2 = await newsListApi.getNewsItem(id)
		dispatch(setSelectedItemAC(data2.data))
	} catch (error) {
		setStatusAC('failed')
		setErrorAC(String(error))
	}
}

export const fetchSelectedItemComments = (commentsIds: number[]) => async (dispatch: Dispatch) => {
	dispatch(setStatusAC('loading'))
	try {
		const data2 = commentsIds.map((el: number) => newsListApi.getNewsComments(el))
		Promise.all(data2).then(res => {
			const data = res.map(d => d.data)
			dispatch(setSelectedItemCommentsAC(data.filter(d => d !== null)))
			dispatch(setStatusAC('succeeded'))
		})
	} catch (error) {
		setStatusAC('failed')
		setErrorAC(String(error))
	}
}

export const fetchChildComments = (kids: number[]) => (dispatch: Dispatch) => {
	dispatch(setStatusAC('loading'))
	try {
		const data = kids.map((el: number) => newsListApi.getNewsComments(el))
		Promise.all(data).then(res => {
			const data2 = res.map(d => d.data)
			dispatch(setChildCommentsAC(data2))
			dispatch(setStatusAC('succeeded'))
		})
	} catch (error) {
		setStatusAC('failed')
		setErrorAC(String(error))
	}
}
