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
  return (
    <Portal>
      <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={() => {
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
