import { AppRootStateType } from '../store'

export const newsListSelectors = {
	selectNewsList: (state: AppRootStateType) => state.newsList.newsList,
	selectComments: (state: AppRootStateType) => state.newsList.selectedItem.comments
}
