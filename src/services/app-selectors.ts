import { AppRootStateType } from './store'

export const appSelectors = {
	selectStatus: (state: AppRootStateType) => state.app.status,
	selectError: (state: AppRootStateType) => state.app.error
}
