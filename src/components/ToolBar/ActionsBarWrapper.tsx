import { SxProps } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { FC, ReactElement } from 'react'

const ActionsBarWrapper: FC<{ children: ReactElement; sx?: SxProps }> = ({
  children,
  sx,
}) => {
  return (
    <Box padding="5px 10px" display="flex" gap="3px" sx={sx}>
      {children}
    </Box>
  )
}

export default ActionsBarWrapper
