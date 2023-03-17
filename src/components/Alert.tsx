import { FC, useState, useEffect } from 'react'
import MuiAlert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

interface Props {
  type?: 'success' | 'error' | 'warning'
  duration?: number
  open: boolean
  text?: string
}

const Alert: FC<Props> = ({
  type = 'error',
  duration = 5000,
  text = "Помила з'єднання",
  open,
}) => {
  const [state, setState] = useState(open)

  useEffect(() => {
    setState(open)
  }, [open])

  return (
    <Snackbar
      open={state}
      autoHideDuration={duration}
      onClose={() => setState(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <MuiAlert severity={type} sx={{ width: '100%' }}>
        {text}
      </MuiAlert>
    </Snackbar>
  )
}

export default Alert
