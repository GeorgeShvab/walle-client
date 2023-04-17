import Typography from '@mui/material/Typography'
import Popover from '@mui/material/Popover'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import { FC, useRef, useState } from 'react'
import InfoIcon from '@mui/icons-material/Info'
import { AccessType, User } from '../../../types'

const DocumentInfo: FC<{
  access: AccessType
  currentUser: User | undefined
}> = ({ access, currentUser }) => {
  const [open, setOpen] = useState<boolean>(false)

  const btnRef = useRef<HTMLButtonElement>(null)

  let message

  if (access === 'restricted') {
    message =
      'Документ належить іншому користувачу. Ви можете лише переглядати його.'
  } else if (access === 'public' && currentUser) {
    message =
      'Документ належить іншому користувачу. Ви можете переглядати та змінювати його.'
  } else if (access === 'public') {
    message =
      'Документ належить іншому користувачу. Ви можете лише переглядати його. Щоб мати змогу змінити документ, авторизуйтесь.'
  }

  return (
    <>
      <IconButton onClick={() => setOpen(true)} ref={btnRef} size="small">
        <InfoIcon />
      </IconButton>
      <Popover
        anchorEl={btnRef.current}
        open={open}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box padding="20px 25px" maxWidth="400px">
          <Typography>{message}</Typography>
        </Box>
      </Popover>
    </>
  )
}

export default DocumentInfo
