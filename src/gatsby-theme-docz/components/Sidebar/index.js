/** @jsx jsx */
/** @jsxFrag React.Fragment */
import React, { useState, useRef, useEffect } from 'react'
import { Global } from '@emotion/core'
import { jsx, Box } from 'theme-ui'
import { useMenus, useCurrentDoc } from 'docz'

import * as styles from './styles'
import { NavSearch } from 'gatsby-theme-docz/src/components/NavSearch'
import { NavLink } from 'gatsby-theme-docz/src/components/NavLink'
import { NavGroup } from 'gatsby-theme-docz/src/components/NavGroup'

export const Sidebar = React.forwardRef((props, ref) => {
  const [query, setQuery] = useState('')
  const menus = useMenus({ query })
  const currentDoc = useCurrentDoc()
  const currentDocRef = useRef()
  const handleChange = ev => {
    setQuery(ev.target.value)
  }
  useEffect(() => {
    if (ref.current && currentDocRef.current) {
      ref.current.scrollTo(0, currentDocRef.current.offsetTop)
    }
  }, [])

  const groupedMenu = menus.reduce((accMenu, menuItem) => {
    let group = menuItem.group;
    if (!group && menuItem.hasOwnProperty('menu')) {
      group = menuItem.menu[0].group;
    }

    if (group && accMenu.hasOwnProperty(group)) {
      accMenu[group].push(menuItem);
    } else if (group) {
      accMenu[group] = [menuItem];
    } else {
      if (accMenu.hasOwnProperty(null)) {
        accMenu[null].push(menuItem);
      } else {
        accMenu[null] = [menuItem]
      }
    }

    return accMenu;
  }, {});

  return (
    <>
      <Box onClick={props.onClick} sx={styles.overlay(props)}>
        {props.open && <Global styles={styles.global} />}
      </Box>
      <Box ref={ref} sx={styles.wrapper(props)} data-testid="sidebar">
        <NavSearch
          placeholder="Type to search..."
          value={query}
          onChange={handleChange}
        />
        {
          groupedMenu &&
          Object.entries(groupedMenu).map(([group, subMenu], idx) => (
            <React.Fragment key={idx}>
              <div
                sx={{
                  fontSize: 1,
                  color: 'rgb(249, 172, 0)',
                  textTransform: 'lowercase',
                  fontVariant: 'small-caps',
                  minHeight: '15px',
                  fontWeight: 'bold',
                  letterSpacing: 'caps',
                  paddingTop: idx === 0 ? 0 : 4,
                }}
                key={idx}
              >
                {group === 'null' ? '' : group}
              </div>
              {
                subMenu.map(menu => {
                  if (!menu.route)
                    return <NavGroup key={menu.id} item={menu} sidebarRef={ref} />
                  if (menu.route === currentDoc.route) {
                    return (
                      <NavLink key={menu.id} item={menu} ref={currentDocRef}>
                        {menu.name}
                      </NavLink>
                    )
                  }
                  return (
                    <NavLink key={menu.id} item={menu}>
                      {menu.name}
                    </NavLink>
                  )
                })
              }
            </React.Fragment>
          ))
        }
      </Box>
    </>
  )
})
