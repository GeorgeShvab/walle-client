import Box from '@mui/material/Box'
import { FC, memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import usePage from '../../hooks/usePage'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import * as types from '../../../types'
import Tab from '../Tab/VerticalTab'
import AddTab from './AddTab'
import { closeTab, selectTabs } from '../../redux/slices/tabs'

const Tabs: FC = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { id } = usePage()

  const tabs = useAppSelector(selectTabs)

  const closeDocument = useCallback((tab: types.Tab) => {
    dispatch(closeTab(tab.id || tab.tabId))

    if (tab.id === id) {
      navigate('/home')
    }
  }, [])

  return (
    <Box>
      <AddTab />
      {tabs?.map((item) => (
        <Tab
          key={item.id || item.tabId}
          onClose={closeDocument}
          selected={id === item.id}
          {...item}
        />
      ))}
    </Box>
  )
}

export default memo(Tabs)
