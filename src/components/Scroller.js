import React from 'react'
import {debounce} from 'lodash'
import styles from './Scroller.css'
import Spinner from 'part:@sanity/components/loading/spinner'

// ref: https://github.com/sanity-io/sanity-plugin-asset-source-unsplash/blob/master/src/components/Scroller.tsx
export default class Scroller extends React.Component {
  scroll = null
  rootElm = React.createRef()
  scrollElm = React.createRef()
  state = {
    lastScrollHeight: 0,
  }

  componentDidMount() {
    if (this.rootElm.current && this.scrollElm.current) {
      const rootElm = this.rootElm.current
      const scrollElm = this.scrollElm.current
      this.scroll = this.rootElm.current.addEventListener(
        'scroll',
        debounce(() => {
          if (
            rootElm.scrollTop + rootElm.offsetHeight >= scrollElm.scrollHeight - 1200 &&
            scrollElm.scrollHeight !== this.state.lastScrollHeight
          ) {
            this.props.onLoad()
            this.setState({lastScrollHeight: scrollElm.scrollHeight})
          }
        }, 500)
      )
    }
  }

  componentDidUpdate(prevProps) {
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
      <div className={styles.root} ref={this.rootElm}>
        <div className={styles.content} ref={this.scrollElm}>
          {this.props.children}
          {isLoading && <Spinner center />}
        </div>
      </div>
    )
  }
}
