import React from 'react'
import {debounce} from 'lodash'
import {Spinner} from '@sanity/ui'
import {Root} from './Scroller.styled'

type ScrollerProps = {
  onLoad: () => void
  isLoading: boolean
  name: string
  children: React.ReactNode
}

type ScrollerState = {
  lastScrollHeight: number
}

// ref: https://github.com/sanity-io/sanity-plugin-asset-source-unsplash/blob/master/src/components/Scroller.tsx
export default class Scroller extends React.Component<ScrollerProps, ScrollerState> {
  scroll: ((event: Event) => void) | null = null
  rootElm = React.createRef<HTMLDivElement>()
  scrollElm = React.createRef<HTMLDivElement>()
  state = {
    lastScrollHeight: 0,
  }

  componentDidMount() {
    if (this.rootElm.current && this.scrollElm.current) {
      const rootElm = this.rootElm.current
      const scrollElm = this.scrollElm.current
      this.scroll = debounce((event: Event) => {
        if (
          rootElm.scrollTop + rootElm.offsetHeight >= scrollElm.scrollHeight - 1200 &&
          scrollElm.scrollHeight !== this.state.lastScrollHeight
        ) {
          this.props.onLoad()
          this.setState({lastScrollHeight: scrollElm.scrollHeight})
        }
      }, 500)
      rootElm.addEventListener('scroll', this.scroll)
    }
  }

  componentDidUpdate(prevProps: ScrollerProps) {
    if (prevProps.name !== this.props.name && this.rootElm.current) {
      this.rootElm.current.scrollTo(0, 0)
    }
  }

  componentWillUnmount() {
    if (this.scroll && this.rootElm.current) {
      this.rootElm.current.removeEventListener('scroll', this.scroll)
    }
  }

  render() {
    const {isLoading} = this.props
    return (
      <Root ref={this.rootElm}>
        <div ref={this.scrollElm}>
          {this.props.children}
          {isLoading && <Spinner />}
        </div>
      </Root>
    )
  }
}
