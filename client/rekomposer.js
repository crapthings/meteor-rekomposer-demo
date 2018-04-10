import React from 'react'
import recompact from 'recompact'

const {
  compose,
  withState,
  lifecycle,
  branch,
  renderComponent,
} = recompact

const loadingHandler = () => <div>loading</div>
const errorHandler = () => <div>error</div>

let _defaults = {
  loadingHandler,
  errorHandler,
  env: {},
}

export const setDefaults = defaults => Object.assign({}, _defaults, defaults)

const initialState = withState('_withTrackerState', '_setWithTrackerState', { state: false })

const trackReactiveSource = (tracker, options) => lifecycle({
  componentDidMount() {
    const _onData = (err, nextProps) => err
      ? this.props._setWithTrackerState({ state: err })
      : this.setState(nextProps, () => this.props._setWithTrackerState({ state: true }))

    this.handler = Tracker.nonreactive(() => Tracker.autorun(() => {
      this.trackerHandler = tracker(this.props, _onData, { ..._defaults.env })
    }))
  },

  componentWillUnmount() {
    const { trackerHandler, handler } = this
    if (typeof trackerHandler === 'function' && trackerHandler.name !== '_onData')
      trackerHandler()

    handler && handler.stop()
  },
})

const checkState = ({ _withTrackerState: { state } }) => typeof state === 'boolean' ? !state : true

const StateComponent = options => ({ _withTrackerState: { state }, ...props }) => {
  if (typeof state === 'boolean')
    return options.loadingHandler && options.loadingHandler(props) || _defaults.loadingHandler()

  return options.errorHandler ? options.errorHandler(state, props) : _defaults.errorHandler()
}

const branchTrackerState = options => branch(checkState, renderComponent(StateComponent(options)))

const withTracker = (tracker, options = {}) => compose(
  initialState,
  trackReactiveSource(tracker, options),
  branchTrackerState(options),
)

recompact.composeWithTracker = recompact.withTracker = withTracker

export default recompact
