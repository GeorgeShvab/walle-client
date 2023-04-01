import Box from '@mui/material/Box'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetDocumentsQuery } from '../../api/documentApiSlice'
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

  const closeDocument = (tab: types.Tab) => {
    dispatch(closeTab(tab.tabId))

    if (tab.id === id) {
      navigate('/home')
    }
  }

  return (
    <Box>
      <AddTab />
      {tabs?.map((item) => (
        <Tab key={item.tabId} onClose={closeDocument} {...item} />
      ))}
    </Box>
  )
}

export default Tabs
