import React from 'ember-2-react'

export default React.createClass({
  propTypes: {
    foo: React.PropTypes.string.isRequired,
    bar: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      bar: 1
    }
  },

  getInitialState () {
    return {
      baz: false
    }
  },

  componentWillMount () {
    this.setState({
      baz: true
    })
  },

  componentDidMount () {
    this._intervalId = setInterval(() => {
      this.setState({
        date: new Date()
      })
    }, 1000)
  },

  componentWillUnmount () {
    clearInterval(this._intervalId)
  }
})
