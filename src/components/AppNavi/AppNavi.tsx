import React, { FC, ReactNode } from 'react'
import styled, { css } from 'styled-components'

import { Theme, useTheme } from '../../hooks/useTheme'

import { StatusLabel as StatusLabelComponent } from '../StatusLabel/StatusLabel'
import { AppNaviButton, AppNaviButtonProps } from './AppNaviButton'
import { AppNaviAnchor, AppNaviAnchorProps } from './AppNaviAnchor'
import { AppNaviDropdown, AppNaviDropdownProps } from './AppNaviDropdown'
import { AppNaviCustomTag, AppNaviCustomTagProps } from './AppNaviCustomTag'

export type ButtonsProps =
  | (AppNaviButtonProps & { type: 'button' })
  | (AppNaviAnchorProps & { type: 'anchor' })
  | (AppNaviDropdownProps & { type: 'dropdown' })
  | (AppNaviCustomTagProps & { type: 'custom' })

interface Props {
  label?: string
  buttons?: ButtonsProps[]
  children?: ReactNode
}

export const AppNavi: FC<Props> = ({ label, buttons, children = null }) => {
  const theme = useTheme()

  return (
    <Wrapper themes={theme}>
      {label && <StatusLabel themes={theme}>{label}</StatusLabel>}

      {buttons && (
        <Buttons themes={theme}>
          {buttons.map((button, i) => {
            switch (button.type) {
              case 'anchor': {
                return (
                  <li key={i}>
                    <AppNaviAnchor
                      href={button.href}
                      icon={button.icon}
                      current={button.current}
                      disabled={button.disabled}
                    >
                      {button.children}
                    </AppNaviAnchor>
                  </li>
                )
              }
              case 'dropdown': {
                return (
                  <li key={i}>
                    <AppNaviDropdown
                      dropdownContent={button.dropdownContent}
                      icon={button.icon}
                      current={button.current}
                      disabled={button.disabled}
                    >
                      {button.children}
                    </AppNaviDropdown>
                  </li>
                )
              }
              case 'button': {
                return (
                  <li key={i}>
                    <AppNaviButton
                      icon={button.icon}
                      current={button.current}
                      disabled={button.disabled}
                      onClick={button.onClick}
                    >
                      {button.children}
                    </AppNaviButton>
                  </li>
                )
              }
              case 'custom': {
                const { tag, icon, current, children: buttonChildren, ...props } = button
                return (
                  <li key={i}>
                    <AppNaviCustomTag
                      tag={tag}
                      icon={icon}
                      current={current}
                      disabled={button.disabled}
                      {...props}
                    >
                      {buttonChildren}
                    </AppNaviCustomTag>
                  </li>
                )
              }
            }
            // @ts-expect-error This is unreachable, for a runtime error
            throw new Error(`${button.type} is not supported`)
          })}
        </Buttons>
      )}

      {children}
    </Wrapper>
  )
}

const Wrapper = styled.nav<{ themes: Theme }>`
  ${({ themes }) => {
    const { pxToRem } = themes.size

    return css`
      display: flex;
      align-items: center;
      width: 100%;
      height: 40px;
      padding: 0 ${pxToRem(20)};
      background-color: #fff;
      box-sizing: border-box;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
    `
  }}
`
const StatusLabel = styled(StatusLabelComponent)<{ themes: Theme }>`
  ${({ themes }) => {
    const { pxToRem, space } = themes.size

    return css`
      margin-right: ${pxToRem(space.XS)};
    `
  }}
`
const Buttons = styled.ul<{ themes: Theme }>`
  ${({ themes }) => {
    const { pxToRem, space } = themes.size

    return css`
      display: flex;
      align-items: center;
      margin: 0;
      padding: 0;

      > li {
        list-style: none;

        &:not(:first-child) {
          margin-left: ${pxToRem(space.XS)};
        }
      }
    `
  }}
`
