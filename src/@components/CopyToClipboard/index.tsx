import Icon from '@components/Icon'
import {useState} from 'react'
import './CopyToClipboard.scss'

interface ICopyToClipboard {
  dataToCopy: string
}

export const CopyToClipboard = ({dataToCopy}: ICopyToClipboard) => {
  const [copyFlag, setCopyFlag] = useState<boolean>(false)

  const onClickCopyLink = (url: string) => {
    setCopyFlag(true)
    navigator.clipboard.writeText(url)
    setTimeout(() => {
      setCopyFlag(false)
    }, 2000)
  }

  return (
    <div className='copy-to-clipboard'>
      {copyFlag ? (
        <Icon
          icon='done'
          role='button'
          hoverTitle={dataToCopy || ''}
          onClick={() => onClickCopyLink(dataToCopy || '')}
          size={16}
          color='success'
        />
      ) : (
        <Icon
          icon='content_copy'
          role='button'
          hoverTitle={dataToCopy || ''}
          onClick={() => onClickCopyLink(dataToCopy || '')}
          size={16}
          color='primary'
        />
      )}
      {copyFlag && <span className='copied'>Copied!</span>}
    </div>
  )
}
