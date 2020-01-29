import React from 'react'
import { Element, Stack } from 'react-ui'
import { ExampleHeading } from './typography'

import { highlight, languages } from 'prismjs/components/prism-core'
import dedent from 'dedent'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-tomorrow.css'

export const Example = props => (
  <section>
    {props.title && <ExampleHeading>{props.title}</ExampleHeading>}
    <Element
      css={{
        border: '1px solid',
        borderColor: 'grays.200',
        borderRadius: 2,
        overflow: 'hidden'
      }}
      marginBottom={10}
      {...props}
    >
      {props.children}
    </Element>
  </section>
)

Example.Preview = ({ css = {}, ...props }) => (
  <Element as={Stack} css={{ paddingY: 10, paddingX: 6, ...css }} {...props} />
)

Example.Code = ({ children, lang = 'jsx' }) => (
  <Element
    as="pre"
    css={{
      margin: 0,
      backgroundColor: 'grays.900',
      color: 'grays.100',
      padding: 4,
      fontSize: 3,
      overflow: 'scroll'
    }}
    dangerouslySetInnerHTML={{
      __html: highlight(dedent(children), languages[lang])
    }}
  ></Element>
)
