import axios from 'axios'

export const settings = {}

export const instance = axios.create({
	baseURL: 'https://hacker-news.firebaseio.com/v0/',
	...settings
})

export const newsListApi = {
	getNewsList() {
		return instance.get<GetNewsListResponse>('newstories.json')
	},
	getNewsItem(id: number | undefined) {
		return instance.get<GetNewsItemResponse>(`item/${id}.json`)
	},
	getNewsComments(id: number | undefined) {
		return instance.get<GetNewsCommentResponse>(`item/${id}.json`)
	}
}

export type GetNewsListResponse = number[]

export type GetNewsItemResponse = {
	by: string
	descendants: number
	id: number
	score: number
	text: string
	time: number
	title: string
	type: string
	url: string
}

export type GetNewsCommentResponse = {
	by: string
	id: number
	parent: number
	kids?: number[]
	text: string
	time: number
	type: string
}
