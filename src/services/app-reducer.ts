const initialState: InitialStateType = {
	status: 'idle',
	error: null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'SET_STATUS':
			return { ...state, status: action.status }
		case 'SET_ERROR':
			return { ...state, error: action.error }
		default:
			return state
	}
}

export const setStatusAC = (status: StatusType) => ({ type: 'SET_STATUS', status }) as const
export const setErrorAC = (error: string | null) => ({ type: 'SET_ERROR', error }) as const

export type InitialStateType = {
	status: string
	error: string | null
}

export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type SetStatusACType = ReturnType<typeof setStatusAC>
export type SetErrorACType = ReturnType<typeof setErrorAC>

type ActionsType = SetStatusACType | SetErrorACType
