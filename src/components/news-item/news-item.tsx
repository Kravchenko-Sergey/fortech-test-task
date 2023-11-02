import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import s from './news-item.module.scss'
import { AppRootStateType, useAppDispatch, useAppSelector } from '../../services/store'
import {
	fetchChildComments,
	fetchSelectedItem,
	fetchSelectedItemComments
} from '../../services/news-list/news-list-reducer'
import { useSelector } from 'react-redux'
import { Loader } from '../loader/loader'

export const NewsItem = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	const dispatch = useAppDispatch()

	const data = useAppSelector((state: AppRootStateType) => state.newsList.newsList.find((d: any) => d.id === +id!))
	const comments = useAppSelector((state: AppRootStateType) => state.newsList.selectedItem.comments)
	const status = useSelector((state: AppRootStateType) => state.app.status)

	const date = new Date(data!.time * 1000)
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hours = date.getHours()
	const minutes = date.getMinutes()

	const handleNewsListReturn = () => {
		navigate('/')
	}

	const handleUpdateComments = () => {
		if (data!.kids && data?.kids?.length) {
			dispatch(fetchSelectedItemComments(data.kids))
		}
	}

	const handleComment = (kids: any) => {
		if (kids) {
			dispatch(fetchChildComments(kids))
		}
	}

	useEffect(() => {
		if (id) {
			if (!data) {
				dispatch(fetchSelectedItem(Number(id)))
			}
			if (data!.kids && data?.kids?.length) {
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
									{el.text}
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
