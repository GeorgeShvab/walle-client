import { Action, createSlice } from '@reduxjs/toolkit'
import { Document, Tab } from '../../../types'
import { ListItem } from '@mui/material'

interface TabsState {
  tabs: Tab[]
}

const initialState: TabsState = {
  tabs: [],
}

interface OpenTabAction extends Action {
  payload: Tab
}

interface CloseTabAction extends Action {
  payload: string
}

interface MergeTabsAction extends Action {
  payload: Document[]
}

interface NewTabAction extends Action {
  payload: Omit<Tab, 'id'>
}

interface MergeTabAction extends Action {
  payload: Document & { tabId: string }
}

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    openTab: (state, action: OpenTabAction) => {
      const docIds = state.tabs.map((item) => item.id)

      if (!docIds.includes(action.payload.id)) {
        state.tabs = [...state.tabs, action.payload]
      } else {
        state.tabs = state.tabs
      }
    },
    newTab: (state, action: NewTabAction) => {
      state.tabs = [...state.tabs.map((item) => ({ ...item })), action.payload]
    },
    mergeTab: (state, action: MergeTabAction) => {
      state.tabs = state.tabs.map((item) =>
        item.tabId === action.payload.tabId
          ? {
              id: action.payload.id,
              title: action.payload.title,
              type: action.payload.type,
              tabId: action.payload.tabId,
            }
          : item
      )
    },
    closeTab: (state, action: CloseTabAction) => {
      state.tabs = state.tabs.filter(
        (item) => item.tabId !== action.payload && item.id !== action.payload
      )
    },
    mergeTabs: (state, action: MergeTabsAction) => {
      state.tabs = state.tabs.map((item) => {
        const loadedTab = action.payload.find((tab) => tab.id === item.id)

        if (loadedTab) {
          return {
            id: item.id,
            title: loadedTab.title,
            type: loadedTab.type,
            tabId: item.tabId,
          }
        }

        return item
      })
    },
  },
})

export default tabsSlice.reducer

export const { closeTab, openTab, mergeTabs, newTab, mergeTab } =
  tabsSlice.actions

export const selectTabs = ({ tabs }: { tabs: TabsState }) => tabs.tabs
