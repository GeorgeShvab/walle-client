import { Action, createSlice } from '@reduxjs/toolkit'

interface OpenedState {
  documents: string[]
}

interface OpenedAction extends Action {
  payload: string
}

const initialState: OpenedState = {
  documents: [],
}

const openedSlice = createSlice({
  name: 'opened',
  initialState,
  reducers: {
    close: (state, action: OpenedAction) => {
      state.documents = state.documents.filter(
        (item) => item !== action.payload
      )
    },
    open: (state, action: OpenedAction) => {
      if (!state.documents.includes(action.payload)) {
        state.documents = [...state.documents, action.payload]
      } else {
        return state
      }
    },
  },
})

export default openedSlice.reducer

export const { close, open } = openedSlice.actions

export const selectOpened = ({ opened }: { opened: OpenedState }) =>
  opened.documents
