import { merge } from '../libs/lodash'

export interface PaletteProperty {
  primary?: string
  white?: string
  black?: string
  success?: {
    primary?: string
    secondary?: string
  }
  info?: {
    primary?: string
    secondary?: string
  }
  warning?: {
    primary?: string
    secondary?: string
  }
  danger?: {
    primary?: string
    secondary?: string
  }
}

export interface CreatedPaletteTheme {
  primary: string
  white: string
  black: string
  success: {
    primary: string
    secondary: string
  }
  info: {
    primary: string
    secondary: string
  }
  warning: {
    primary: string
    secondary: string
  }
  danger: {
    primary: string
    secondary: string
  }
}

export const createPalette = (palette: PaletteProperty = {}) => {
  const created: CreatedPaletteTheme = merge(
    {
      primary: '#4ed0d6',
      white: '#fff',
      black: '#222',
      success: {
        primary: '#c9e2b3',
        secondary: '#3c763d',
      },
      info: {
        primary: '#b3e5ef',
        secondary: '#31708f',
      },
      warning: {
        primary: '#faebcc',
        secondary: '#8a6d3b',
      },
      danger: {
        primary: '#ebccd1',
        secondary: '#a94442',
      },
    },
    palette,
  )

  return created
}
