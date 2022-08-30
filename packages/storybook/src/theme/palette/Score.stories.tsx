import React from 'react'
import { capitalize, Typography, useTheme } from '@mui/material'
import Box from '@mui/material/Box'

import { getRawColorObject } from '../../helpers.js'
import { ColorMap, ColorSwatchContainer } from './palette.components'
import type { ColorCardProps, ThemeName } from './palette.types'

export default {
  title: 'Theme/Palette/Score',
  parameters: {
    layout: 'fullscreen',
  },
}

export const Score = () => {
  const theme = useTheme()
  const colorMode = capitalize(theme.palette.mode)

  const rawColorMapping = React.useMemo(
    () => getRawColorObject(theme.name as ThemeName),
    [theme.name],
  )

  const scoreColors: Array<{ name: string; data: Array<ColorCardProps> }> = [
    {
      name: 'Low',
      data: [
        {
          token: 'palette.score.low.light',
          colorValue: theme.palette.score.low.light,
          figmaStyle: 'Score/Low/Light',
        },
        {
          token: 'palette.score.low.main',
          colorValue: theme.palette.score.low.main,
          figmaStyle: 'Score/Low/Main',
        },
        {
          token: 'palette.score.low.dark',
          colorValue: theme.palette.score.low.dark,
          figmaStyle: 'Score/Low/Dark',
        },
        {
          token: 'palette.score.low.contrastText',
          colorValue: theme.palette.score.low.contrastText,
          figmaStyle: 'Score/Low/Contrast Text',
          description:
            'Use for text or icons on containers with score background colors.',
        },
      ],
    },
    {
      name: 'Low Moderate',
      data: [
        {
          token: 'palette.score.lowModerate.light',
          colorValue: theme.palette.score.lowModerate.light,
          figmaStyle: 'Score/Low Moderate/Light',
        },
        {
          token: 'palette.score.lowModerate.main',
          colorValue: theme.palette.score.lowModerate.main,
          figmaStyle: 'Score/Low Moderate/Main',
        },
        {
          token: 'palette.score.lowModerate.dark',
          colorValue: theme.palette.score.lowModerate.dark,
          figmaStyle: 'Score/Low Moderate/Dark',
        },
        {
          token: 'palette.score.lowModerate.contrastText',
          colorValue: theme.palette.score.lowModerate.contrastText,
          figmaStyle: 'Score/Low Moderate/Contrast Text',
          description:
            'Use for text or icons on containers with score background colors.',
        },
      ],
    },
    {
      name: 'Moderate',
      data: [
        {
          token: 'palette.score.moderate.light',
          colorValue: theme.palette.score.moderate.light,
          figmaStyle: 'Score/Moderate/Light',
        },
        {
          token: 'palette.score.moderate.main',
          colorValue: theme.palette.score.moderate.main,
          figmaStyle: 'Score/Moderate/Main',
        },
        {
          token: 'palette.score.moderate.dark',
          colorValue: theme.palette.score.moderate.dark,
          figmaStyle: 'Score/Moderate/Dark',
        },
        {
          token: 'palette.score.moderate.contrastText',
          colorValue: theme.palette.score.moderate.contrastText,
          figmaStyle: 'Score/Moderate/Contrast Text',
          description:
            'Use for text or icons on containers with score background colors.',
        },
      ],
    },
    {
      name: 'High Moderate',
      data: [
        {
          token: 'palette.score.highModerate.light',
          colorValue: theme.palette.score.highModerate.light,
          figmaStyle: 'Score/High Moderate/Light',
        },
        {
          token: 'palette.score.highModerate.main',
          colorValue: theme.palette.score.highModerate.main,
          figmaStyle: 'Score/High Moderate/Main',
        },
        {
          token: 'palette.score.highModerate.dark',
          colorValue: theme.palette.score.highModerate.dark,
          figmaStyle: 'Score/High Moderate/Dark',
        },
        {
          token: 'palette.score.highModerate.contrastText',
          colorValue: theme.palette.score.highModerate.contrastText,
          figmaStyle: 'Score/High Moderate/Contrast Text',
          description:
            'Use for text or icons on containers with score background colors.',
        },
      ],
    },
    {
      name: 'High',
      data: [
        {
          token: 'palette.score.high.light',
          colorValue: theme.palette.score.high.light,
          figmaStyle: 'Score/High/Light',
        },
        {
          token: 'palette.score.high.main',
          colorValue: theme.palette.score.high.main,
          figmaStyle: 'Score/High/Main',
        },
        {
          token: 'palette.score.high.dark',
          colorValue: theme.palette.score.high.dark,
          figmaStyle: 'Score/High/Dark',
        },
        {
          token: 'palette.score.high.contrastText',
          colorValue: theme.palette.score.high.contrastText,
          figmaStyle: 'Score/High/Contrast Text',
          description:
            'Use for text or icons on containers with score background colors.',
        },
      ],
    },
  ]

  return (
    <Box gap={4} sx={{ p: 4 }}>
      {scoreColors.map(score => (
        <React.Fragment key={`score-${score.name}`}>
          <Typography variant="h2" gutterBottom>
            {score.name}
          </Typography>
          <ColorSwatchContainer>
            <ColorMap
              data={score.data}
              colorMode={colorMode}
              rawColorObj={rawColorMapping}
            />
          </ColorSwatchContainer>
        </React.Fragment>
      ))}
    </Box>
  )
}
