import MuiLink from '@mui/material/Link'
import useTheme from '@mui/material/styles/useTheme'
import { DraftDecoratorComponentProps } from 'draft-js'
import { ComponentProps, ComponentType, FC, ReactElement } from 'react'

interface LinkifyProps {
  children: ReactElement[]
  className: string
  href: string
  rel: string
  target: string
}

export const Link: FC<DraftDecoratorComponentProps> = (props) => {
  const { palette } = useTheme()

  const { url } = props.contentState.getEntity(props.entityKey).getData()

  const handleClick = () => {
    window.open(url)
  }

  return (
    <MuiLink
      href={url}
      color={palette.mode === 'light' ? '#0000ee' : '#8D79C6'}
      onClick={handleClick}
      sx={{ cursor: 'pointer' }}
    >
      {props.children}
    </MuiLink>
  )
}

export const LinkifyLink: ComponentType<ComponentProps<any>> = (
  props: LinkifyProps
) => {
  const { palette } = useTheme()

  const handleClick = () => {
    window.open(props.href)
  }

  return (
    <MuiLink
      color={palette.mode === 'light' ? '#0000ee' : '#8D79C6'}
      onClick={handleClick}
      sx={{ cursor: 'pointer' }}
      href={props.href}
    >
      {props.children}
    </MuiLink>
  )
}
