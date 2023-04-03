import { Action, createSlice } from '@reduxjs/toolkit'
import { Document, Tab } from '../../../types'

interface TabsState {
  tabs: Tab[]
}

const initialState: TabsState = {
  tabs: [],
}

interface OpenTabAction extends Action {
  payload: ({ tabId?: string } & Omit<Tab, 'tabId'>) | Tab
}

interface CloseTabAction extends Action {
  payload: string
}

interface MergeTabsAction extends Action {
  payload: Document[]
}

interface UnselectAction extends Action {
  payload: string
}

interface NewTabAction extends Action {
  payload: Omit<Tab, 'id'>
}

interface MergeTabAction extends Action {
  payload: Document & { tabId: string; selected: boolean }
}

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    openTab: (state, action: OpenTabAction) => {
      state.tabs = state.tabs.map((item) => {
        if (item.id === action.payload.id && item.id) {
          return {
            ...item,
            ...action.payload,
            selected: true,
          }
        }

        return { ...item, selected: false }
      })
    },
    newTab: (state, action: NewTabAction) => {
      state.tabs = [
        ...state.tabs.map((item) => ({ ...item, selected: false })),
        { ...action.payload, selected: true },
      ]
    },
    mergeTab: (state, action: MergeTabAction) => {
      state.tabs = state.tabs.map((item) =>
        item.tabId === action.payload.tabId
          ? {
              id: action.payload.id,
              title: action.payload.title,
              type: action.payload.type,
              selected: action.payload.selected,
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
            selected: item.selected,
            tabId: item.tabId,
          }
        }

        return item
      })
    },
    unselect: (state, action: UnselectAction) => {
      state.tabs = state.tabs.map((item) =>
        item.id === action.payload ? { ...item, selected: false } : item
      )
    },
  },
})

export default tabsSlice.reducer

export const { closeTab, openTab, mergeTabs, unselect, newTab, mergeTab } =
  tabsSlice.actions

export const selectTabs = ({ tabs }: { tabs: TabsState }) => tabs.tabs
