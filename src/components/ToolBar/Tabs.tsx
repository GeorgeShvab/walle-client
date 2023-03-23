import Box from '@mui/material/Box'
import { FC, useEffect, useRef } from 'react'
import { useGetDocumentsQuery } from '../../api/documentApiSlice'
import useTheme from '@mui/material/styles/useTheme'
import usePage from '../../hooks/usePage'
import * as types from '../../../types'
import { useNavigate } from 'react-router-dom'
import { ScrollContainer } from 'react-indiana-drag-scroll'
import 'react-indiana-drag-scroll/dist/style.css'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { selectOpened, close } from '../../redux/slices/opened'
import AddButton from './AddButton'
import Tab from '../Tab/HorizontalTab'

const Tabs: FC = () => {
  const dispatch = useAppDispatch()

  const { palette } = useTheme()

  const navigate = useNavigate()

  const opened = useAppSelector(selectOpened)

  const { data } = useGetDocumentsQuery('documents=' + opened.join('+'))

  const { id } = usePage()

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

  const selectDocument = (doc: types.Document) => {
    navigate(`/documents/${doc.id}`)
  }

  const closeDocument = (doc: types.Document) => {
    dispatch(close(doc.id))
  }

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
    >
      <ScrollContainer
        className="scroll-container"
        mouseScroll={true}
        ref={wrapperRef as any}
        style={{ cursor: 'default' }}
      >
        <Box
          display="flex"
          padding="0 10px"
          width="fit-content"
          sx={{ cursor: 'default' }}
        >
          {data?.map((item) => (
            <Tab
              key={item.id}
              onClick={selectDocument}
              onClose={closeDocument}
              selected={Boolean(id === item.id)}
              {...item}
            />
          ))}
          <AddButton />
        </Box>
      </ScrollContainer>
    </Box>
  )
}

export default Tabs
