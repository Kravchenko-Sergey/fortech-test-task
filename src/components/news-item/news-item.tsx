import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import s from './news-item.module.scss'
import { useAppDispatch, useAppSelector } from '../../services/store'
import {
	deleteSelectedItemCommentsAC,
	fetchChildComments,
	fetchSelectedItem,
	fetchSelectedItemComments
} from '../../services/news-list/news-list-reducer'
import { Loader } from '../loader/loader'
import { newsListSelectors } from '../../services/news-list/news-list-selectors'
import { appSelectors } from '../../services/app-selectors'
import { GetNewsItemResponse } from '../../services/base-api-types'

export const NewsItem = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const data = useAppSelector(state => state.newsList.newsList.find((d: GetNewsItemResponse) => d.id === +id!))
	const comments = useAppSelector(newsListSelectors.selectComments)
	const status = useAppSelector(appSelectors.selectStatus)

	const date = data ? new Date(data.time * 1000) : new Date()
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hours = date.getHours()
	const minutes = date.getMinutes()

	const handleNewsListReturn = () => {
		dispatch(deleteSelectedItemCommentsAC())
		navigate('/')
	}

	const handleUpdateComments = () => {
		if (data!.kids && data?.kids?.length) {
			dispatch(fetchSelectedItemComments(data.kids))
		}
	}

	const handleComment = (kids: number[] | undefined) => {
		if (kids) {
			dispatch(fetchChildComments(kids))
		}
	}

	useEffect(() => {
		if (id) {
			if (!data) {
				dispatch(fetchSelectedItem(Number(id)))
			}
			if (data?.kids && data?.kids?.length) {
				dispatch(fetchSelectedItemComments(data!.kids))
			}
		}
	}, [])

	return (
		<div>
			{data ? (
				<div className={s.container}>
					<div className={s.title}>{data.title}</div>
					<div className={s.author}>
						<span>author: </span> {data.by}
					</div>
					<div className={s.date}>
						<span>date: </span>
						{`${day}.${month}.${year} ${hours}:${minutes}`}
					</div>
					<Link to={data.url} className={s.url}>
						{data.url}
					</Link>
					<div className={s.comments}>
						<span>comments: </span>
						{data.descendants}
					</div>
					{status === 'loading' ? (
						<Loader />
					) : (
						<div>
							{comments.map((el: Comment) => (
								<div key={el.id} onClick={() => handleComment(el.kids)} className={s.comment}>
									<div className={s.authorComment}>{el.by}:</div>
									<div>{el.text}</div>
								</div>
							))}
						</div>
					)}
					<button onClick={handleUpdateComments} disabled={status === 'loading'} className={s.btn}>
						update comments
					</button>
					<button onClick={handleNewsListReturn} className={s.btn}>
						to the news list
					</button>
				</div>
			) : (
				<div>Not found</div>
			)}
		</div>
	)
}

export type Comment = {
	by: string
	id: number
	parent: number
	kids?: number[]
	text: string
	time: number
	type: string
}
