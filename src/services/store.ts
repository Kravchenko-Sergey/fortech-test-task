import { AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import { newsListReducer } from './news-list/news-list-reducer'
import thunk, { ThunkDispatch } from 'redux-thunk'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { appReducer } from './app-reducer'

const rootReducer = combineReducers({
	app: appReducer,
	newsList: newsListReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export const useAppDispatch = useDispatch<AppDispatchType>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>

//@ts-ignore
window.store = store.getState
