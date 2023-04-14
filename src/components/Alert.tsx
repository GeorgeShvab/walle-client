import { FC, useState, useEffect } from 'react'
import MuiAlert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import Portal from '@mui/material/Portal'

interface Props {
  type?: 'success' | 'error' | 'warning'
  duration?: number
  open: boolean
  text?: string
  onClose?: () => void
}

const Alert: FC<Props> = ({
  type = 'error',
  duration = 5000,
  text = "Помила з'єднання",
  open,
  onClose,
}) => {
  const [state, setState] = useState(open)

  useEffect(() => {
    setState(open)
  }, [open])

  return (
    <Portal>
      <Snackbar
        open={state}
        autoHideDuration={duration}
        onClose={() => {
          setState(false)
          onClose && onClose()
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert severity={type} sx={{ width: '100%' }}>
          {text}
        </MuiAlert>
      </Snackbar>
    </Portal>
  )
}

export default Alert
