/** @jsx jsx */
import { jsx, Box, Flex } from 'theme-ui'
import { useConfig, useCurrentDoc } from 'docz'

import * as styles from './styles'
import { Menu, Github } from 'gatsby-theme-docz/src/components/Icons'
import { Logo } from '../Logo'
import data from '@core/package.json';

export const Header = props => {
  const { onOpen } = props
  const {
    repository,
    themeConfig: { showDarkModeSwitch, showMarkdownEditButton },
  } = useConfig()
  const { edit = true, ...doc } = useCurrentDoc()

  return (
    <div sx={styles.wrapper} data-testid="header">
      <Box sx={styles.menuIcon}>
        <button sx={styles.menuButton} onClick={onOpen}>
          <Menu size={25} />
        </button>
      </Box>
      <div sx={styles.innerContainer}>
        <Logo />
        <Flex sx={{alignItems: 'baseline'}}>
          <h5 sx={{m: '0', mr: '20px'}}>{'v' + data.version}</h5>
          {repository && (
            <Box sx={{ mr: 2 }}>
              <a
                href={repository}
                sx={styles.headerButton}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={15} />
              </a>
            </Box>
          )}
        </Flex>
      </div>
    </div>
  )
}
