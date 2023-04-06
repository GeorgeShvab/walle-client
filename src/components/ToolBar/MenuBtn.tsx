import useTheme from '@mui/material/styles/useTheme'
import useMediaQuery from '@mui/material/useMediaQuery'
import IconButton from '@mui/material/IconButton'
import { FC, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import Menu from '../Menu/Menu'

const MenuBtn: FC = () => {
  const { breakpoints } = useTheme()

  const isLesserThanMd = useMediaQuery(breakpoints.down('md'))

  const [open, setOpen] = useState<boolean>(false)

  const handleClick = () => {
    setOpen((prev) => !prev)
  }

  const close = () => {
    setOpen(false)
  }

  if (!isLesserThanMd) return null

  return (
    <>
      <Menu onClose={close} open={open} />
      <IconButton onClick={handleClick}>
        <MenuIcon />
      </IconButton>
    </>
  )
}

export default MenuBtn
