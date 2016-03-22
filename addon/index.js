import Ember from 'ember'
import {PropTypes} from 'ember-prop-types'
import ReactComponentMixin from './mixins/react-component'

export default {
  createClass (definition) {
    return Ember.Component.extend(ReactComponentMixin, definition)
  },

  PropTypes
}
