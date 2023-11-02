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
