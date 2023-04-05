import Box from '@mui/material/Box'
import { FC, useCallback, useEffect, useRef } from 'react'
import useTheme from '@mui/material/styles/useTheme'
import usePage from '../../hooks/usePage'
import * as types from '../../../types'
import { useNavigate } from 'react-router-dom'
import { ScrollContainer } from 'react-indiana-drag-scroll'
import 'react-indiana-drag-scroll/dist/style.css'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import AddButton from './AddButton'
import Tab from '../Tab/HorizontalTab'
import { closeTab, selectTabs } from '../../redux/slices/tabs'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const Tabs: FC = () => {
  const dispatch = useAppDispatch()

  const { palette } = useTheme()

  const { id } = usePage()

  const navigate = useNavigate()

  const tabs = useAppSelector(selectTabs)

  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    wrapperRef.current?.addEventListener('wheel', wheel)

    return () => {
      wrapperRef.current?.removeEventListener('wheel', wheel)
    }
  }, [])

  const wheel = (e: WheelEvent) => {
    e.preventDefault()

    wrapperRef.current?.scrollBy({ left: e.deltaY < 0 ? -30 : 30 })
  }

  const closeDocument = useCallback(
    (tab: types.Tab) => {
      dispatch(closeTab(tab.id || tab.tabId))

      if (tab.id === id) {
        navigate('/home')
      }
    },
    [id]
  )

  return (
    <Box
      borderRadius="0 0 5px 5px"
      sx={{
        backgroundColor:
          palette.mode === 'light'
            ? palette.grey[50]
            : palette.background.light,
      }}
      width="100%"
      height="100%"
      overflow="hidden"
      boxShadow={
        palette.mode === 'light'
          ? `inset 0 0 1px 0 ${palette.grey[300]}`
          : undefined
      }
    >
      <ScrollContainer
        className="scroll-container"
        mouseScroll={true}
        ref={wrapperRef as any}
        style={{ cursor: 'default' }}
      >
        <Box display="flex" width="fit-content" sx={{ cursor: 'default' }}>
          <TransitionGroup
            style={{
              display: 'flex',
              padding: '0 16px',
              width: 'fit-content',
              cursor: 'default',
            }}
            component="div"
          >
            {tabs?.map((item) => (
              <CSSTransition key={item.tabId} timeout={300} classNames="tab">
                <Tab
                  onClose={closeDocument}
                  selected={id === item.id || !item.id}
                  {...item}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </Box>
      </ScrollContainer>
    </Box>
  )
}

export default Tabs
