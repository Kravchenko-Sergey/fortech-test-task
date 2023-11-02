import axios from 'axios'
import { GetNewsCommentResponse, GetNewsItemResponse, GetNewsListResponse } from './base-api-types'

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
