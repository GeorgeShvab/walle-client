import {
  FC,
  useState,
  useMemo,
  MouseEvent,
  FormEvent,
  useRef,
  useEffect,
  memo,
} from 'react'
import { EditorState, RichUtils } from 'draft-js'
import Paper from '@mui/material/Paper'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS'
import Button from '@mui/material/Button'
import Popover from '@mui/material/Popover'
import TextField from '@mui/material/TextField'
import useMediaQuery from '@mui/material/useMediaQuery'
import Divider from '@mui/material/Divider'
import useTheme from '@mui/material/styles/useTheme'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import AddLinkIcon from '@mui/icons-material/AddLink'
import LinkOffIcon from '@mui/icons-material/LinkOff'
import ToolBarButton from './ToolBarButton'
import { BlockStyle, InlineStyle } from '../../../types'
import Box from '@mui/material/Box'

interface PropsType {
  editorState: EditorState
  setEditorState: (arg: EditorState) => void
}

const ToolBar: FC<PropsType> = ({ editorState, setEditorState }) => {
  const { breakpoints } = useTheme()

  const isLesserThanMd = useMediaQuery(breakpoints.down('md'))

  const inputRef = useRef<HTMLInputElement>(null)

  const [linkPopoverEl, setLinkPopoverEl] = useState<HTMLButtonElement>()

  useEffect(() => {
    if (linkPopoverEl) setTimeout(() => inputRef.current?.focus(), 50)
  }, [linkPopoverEl])

  const styles = useMemo(
    () =>
      editorState
        .getCurrentInlineStyle()
        .toArray()
        .concat(RichUtils.getCurrentBlockType(editorState)),
    [editorState]
  )

  const toggleInlineStyle = (type: InlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, type))
  }

  const toggleBlockStyle = (type: BlockStyle) => {
    setEditorState(RichUtils.toggleBlockType(editorState, type))
  }

  const addLink = (url: string) => {
    const currentContentState = editorState.getCurrentContent()

    const contentState = currentContentState.createEntity('LINK', 'MUTABLE', {
      url: url,
    })

    const entity = contentState.getLastCreatedEntityKey()

    let nextEditorState = EditorState.set(editorState, {
      currentContent: contentState,
    })

    setEditorState(
      RichUtils.toggleLink(nextEditorState, editorState.getSelection(), entity)
    )
  }

  const removeLink = () => {
    const selection = editorState.getSelection()
    if (!selection.isCollapsed()) {
      setEditorState(RichUtils.toggleLink(editorState, selection, null))
    }
  }

  const handleAddLinkClick = (e: MouseEvent<HTMLButtonElement>) => {
    setLinkPopoverEl(e.currentTarget)
  }

  const handleSubmit = (
    e: FormEvent<HTMLFormElement> & { target: { url: HTMLInputElement } }
  ) => {
    e.preventDefault()

    let url = e.target.url.value.trim()

    if (!/http|https/.test(url)) {
      url = 'https://' + url
    }

    if (url) {
      addLink(url)
    }

    setLinkPopoverEl(undefined)
  }

  return (
    <Paper
      sx={{
        position: 'fixed',
        left: '50%',
        bottom: '0',
        transform: 'translateX(-50%)',
        display: 'flex',
        zIndex: '10',
        borderRadius: isLesserThanMd ? '0' : '5px 5px 0 0',
        width: isLesserThanMd ? '100vw' : undefined,
      }}
    >
      <Box display="flex">
        <ToolBarButton
          onSelect={() => toggleInlineStyle('BOLD')}
          selected={styles.includes('BOLD')}
          title="Жирний"
        >
          <FormatBoldIcon />
        </ToolBarButton>
        <ToolBarButton
          onSelect={() => toggleInlineStyle('ITALIC')}
          selected={styles.includes('ITALIC')}
          title="Курсив"
        >
          <FormatItalicIcon />
        </ToolBarButton>
        <ToolBarButton
          onSelect={() => toggleInlineStyle('UNDERLINE')}
          selected={styles.includes('UNDERLINE')}
          title="Підкреслений"
        >
          <FormatUnderlinedIcon />
        </ToolBarButton>
        <ToolBarButton
          onSelect={() => toggleInlineStyle('STRIKETHROUGH')}
          selected={styles.includes('STRIKETHROUGH')}
          title="Закреслений"
        >
          <StrikethroughSIcon />
        </ToolBarButton>
      </Box>
      <Divider
        orientation="vertical"
        sx={{
          width: '1px',
          height: '44px',
          display: 'block',
          flex: '0 0 1px',
        }}
      />
      <Box display="flex">
        <ToolBarButton
          onSelect={() => toggleBlockStyle('ordered-list-item')}
          selected={styles.includes('ordered-list-item')}
          title="Впорядкований список"
        >
          <FormatListNumberedIcon />
        </ToolBarButton>
        <ToolBarButton
          onSelect={() => toggleBlockStyle('unordered-list-item')}
          selected={styles.includes('unordered-list-item')}
          title="Невпорядкований список"
        >
          <FormatListBulletedIcon />
        </ToolBarButton>
      </Box>
      <Divider
        orientation="vertical"
        sx={{
          width: '1px',
          height: '44px',
          display: 'block',
          flex: '0 0 1px',
        }}
      />
      <Box display="flex">
        <ToolBarButton onSelect={handleAddLinkClick} title="Додати посилання">
          <AddLinkIcon />
        </ToolBarButton>
        <Popover
          open={Boolean(linkPopoverEl)}
          anchorEl={linkPopoverEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          onClose={() => setLinkPopoverEl(undefined)}
        >
          <form onSubmit={handleSubmit}>
            <Box padding="10px" display="block" gap="105px">
              <Box mb="10px">
                <TextField
                  type="text"
                  variant="outlined"
                  size="small"
                  placeholder="https://example.com"
                  name="url"
                  inputRef={inputRef}
                />
              </Box>
              <Button type="submit" fullWidth>
                Додати
              </Button>
            </Box>
          </form>
        </Popover>
        <ToolBarButton onSelect={removeLink} title="Видалити посилання">
          <LinkOffIcon />
        </ToolBarButton>
      </Box>
    </Paper>
  )
}

export default memo(ToolBar)
