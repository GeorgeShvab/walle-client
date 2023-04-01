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

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    openTab: (state, action: OpenTabAction) => {
      const tabsIds = state.tabs.map((item) => item.tabId)
      const docIds = state.tabs.map((item) => item.id)

      if (
        tabsIds.includes(action.payload.tabId as string) ||
        docIds.includes(action.payload.id)
      ) {
        state.tabs = state.tabs.map((item) => {
          if (
            item.tabId === action.payload.tabId ||
            item.id === action.payload.id
          ) {
            return {
              ...item,
              ...action.payload,
              selected: true,
            }
          }

          return { ...item, selected: false }
        })
      } else {
        state.tabs = [
          ...state.tabs.map((item) => ({ ...item, selected: false })),
          { ...(action.payload as Tab), selected: true },
        ]
      }
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
            selected: item.selected,
          }
        }

        return item
      })
    },
  },
})

export default tabsSlice.reducer

export const { closeTab, openTab, mergeTabs } = tabsSlice.actions

export const selectTabs = ({ tabs }: { tabs: TabsState }) => tabs.tabs
