import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import s from './news-list.module.scss'
import { useAppDispatch, useAppSelector } from '../../services/store'
import { fetchNewsList } from '../../services/news-list/news-list-reducer'
import { Loader } from '../loader/loader'
import { appSelectors } from '../../services/app-selectors'
import { newsListSelectors } from '../../services/news-list/news-list-selectors'
import { GetNewsItemResponse } from '../../services/base-api-types'

export const NewsList = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const data = useAppSelector(newsListSelectors.selectNewsList)
	const status = useAppSelector(appSelectors.selectStatus)

	useEffect(() => {
		dispatch(fetchNewsList())
		const interval = setInterval(fetchNewsList, 60000)
		return () => clearInterval(interval)
	}, [])

	const handleItem = (id: number) => navigate(`${id}`)

	const handleUpdateNews = () => dispatch(fetchNewsList())

	return (
		<div className={s.container}>
			<button onClick={handleUpdateNews} disabled={status === 'loading'} className={s.btn}>
				update news
			</button>
			{status === 'loading' ? (
				<Loader />
			) : (
				<table className={s.table}>
					<thead>
						<tr className={s.row}>
							<th className={`${s.headCell} ${s.cellTitle}`}>title</th>
							<th className={`${s.headCell} ${s.cellScore}`}>score</th>
							<th className={`${s.headCell} ${s.cellBy}`}>author</th>
							<th className={`${s.headCell} ${s.cellTime}`}>date</th>
						</tr>
					</thead>
					<tbody>
						{data.map((item: Item) => {
							const date = new Date(item.time * 1000)
							const year = date.getFullYear()
							const month = date.getMonth() + 1
							const day = date.getDate()
							const hours = date.getHours()
							const minutes = date.getMinutes()
							return (
								<tr key={item.id} onClick={() => handleItem(item.id)} className={s.row}>
									<td className={`${s.tableCell} ${s.cellTitle}`}>{item.title}</td>
									<td className={`${s.tableCell} ${s.cellScore}`}>{item.score}</td>
									<td className={`${s.tableCell} ${s.cellBy}`}>{item.by}</td>
									<td className={`${s.tableCell} ${s.cellTime}`}>{`${day}.${month}.${year} ${hours}:${minutes}`}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			)}
		</div>
	)
}

export type Item = Omit<GetNewsItemResponse, 'url'>
