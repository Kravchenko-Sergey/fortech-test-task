import { setErrorAC, setStatusAC } from './app-reducer'

export type InitialStateType = {
	status: string
	error: string | null
}

export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type SetStatusACType = ReturnType<typeof setStatusAC>
export type SetErrorACType = ReturnType<typeof setErrorAC>

export type ActionsType = SetStatusACType | SetErrorACType
