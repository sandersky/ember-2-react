import _ from 'lodash'
import Ember from 'ember'
import PropTypeMixin from 'ember-prop-types'

// FIXME: implement shouldComponentUpdate
export default Ember.Mixin.create(PropTypeMixin, {
  // Ember life-cycle hooks

  init () {
    this._super()

    let initialState

    if (_.isFunction(this.getInitialState)) {
      initialState = Ember.Object.create(
        this.getInitialState()
      )
    }

    this.set('state', initialState)

    if (_.isFunction(this.componentWillMount)) {
      this.componentWillMount()
    }
  },

  didInsertElement () {
    this._super(arguments)

    if (_.isFunction(this.componentDidMount)) {
      this.componentDidMount()
    }
  },

  didUpdateAttrs () {
    this._super(arguments)

    if (_.isFunction(this.componentWillReceiveProps)) {
      this.componentWillReceiveProps() // FIXME: passi n nextProps
    }
  },

  willUpdate () {
    this._super(arguments)

    if (_.isFunction(this.componentWillUpdate)) {
      this.componentWillUpdate() // FIXME: pass in nextProps and nextState
    }
  },

  didUpdate () {
    this._super(arguments)

    if (_.isFunction(this.componentDidUpdate)) {
      this.componentDidUpdate() // FIXME: pass in prevProps and prevState
    }
  },

  willDestroyElement () {
    this._super(arguments)

    if (_.isFunction(this.componentWillUnmount)) {
      this.componentWillUnmount()
    }
  },

 // Our methods

  setState (state, callback) {
    let didChange = false
    const newState = Ember.Object.create(
      _.cloneDeep(this.get('state'))
    )

    Object.keys(state).forEach((key) => {
      const newValue = state[key]
      const oldValue = this.get(`state.${key}`)

      if (!_.isEqual(oldValue, newValue)) {
        newState.set(key, newValue)
        didChange = true
      }
    })

    if (didChange) {
      this.set('state', newState)
    }
  }
})
