import React, { ComponentType, FC, ReactNode } from 'react'
import styled from 'styled-components'

import { Theme, useTheme } from '../../hooks/useTheme'

import { Props as IconProps } from '../Icon'
import { buttonStyle, getIconComponent } from './appNaviHelper'

export type AppNaviCustomTagProps = {
  children: ReactNode
  tag: ComponentType<any>
  icon?: IconProps['name']
  current?: boolean
  disabled?: boolean
} & { [key: string]: any }

const Active = styled.div<{ themes: Theme }>`
  ${buttonStyle.active}
`
const InActive = styled.div<{ themes: Theme }>`
  ${buttonStyle.inactive}
`

export const AppNaviCustomTag: FC<AppNaviCustomTagProps> = ({
  children,
  tag,
  icon,
  current,
  disabled = false,
  ...props
}) => {
  const theme = useTheme()
  const iconComponent = getIconComponent(theme, { icon, current, disabled })
  const additionalProps = disabled ? { disabled: true, className: 'disabled' } : {}

  if (current) {
    return (
      <Active as={tag} themes={theme} aria-selected="true" {...props} {...additionalProps}>
        {iconComponent}
        {children}
      </Active>
    )
  }

  return (
    <InActive as={tag} themes={theme} {...props} {...additionalProps}>
      {iconComponent}
      {children}
    </InActive>
  )
}
