import { CircularProgress, useMediaQuery, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { FC, useEffect } from 'react'
import { useCreateDocument } from '../../hooks/useDocument'
import { useNavigate } from 'react-router-dom'
import Error from '../../components/Error'
import { useAppDispatch } from '../../redux/store'
import { openTab } from '../../redux/slices/tabs'
import { Tab } from '../../../types'
import generateId from '../../utils/generateId'

const NewDocument: FC = () => {
  const dispatch = useAppDispatch()

  const { breakpoints } = useTheme()

  const isLesserThanMd = useMediaQuery(breakpoints.down('md'))

  const navigate = useNavigate()

  const [createDocument, status] = useCreateDocument()

  useEffect(() => {
    const tabId = generateId()

    const tab: Tab = {
      tabId: tabId,
      title: 'Новий документ',
      type: 'txt',
      selected: true,
    }

    dispatch(openTab(tab))
    ;(async () => {
      const data = await createDocument()

      if (data) {
        navigate('/documents/' + data.id + '?tabId=' + tabId)
      }
    })()
  }, [])

  return (
    <Box component="main">
      <Box
        padding={isLesserThanMd ? '15px 15px' : '25px'}
        height={`calc(100vh - ${isLesserThanMd ? '150px' : '50px'})`}
        position="relative"
      >
        <CircularProgress
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        {status.error && (
          <Error
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            title="Помилка"
            subtitle="Помилка при створенні документа"
          />
        )}
      </Box>
    </Box>
  )
}

export default NewDocument