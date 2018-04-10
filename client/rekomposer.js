import React from 'react'
import recompact from 'recompact'

const {
  compose,
  withState,
  lifecycle,
  branch,
} = recompact

const LoadingComponent = () => <div>loading</div>
const ErrorComponent = () => <div>error</div>

const initialState = withState('_withTrackerState', '_setWithTrackerState', { state: false })

const trackReactiveSource = (tracker, options) => lifecycle({
  componentDidMount() {
    this.trackerHandler = Tracker.nonreactive(() => Tracker.autorun(() => {
      tracker(this.props, (err, nextProps) => err
        ? this.props._setWithTrackerState({ state: err })
        : this.setState(nextProps, () => this.props._setWithTrackerState({ state: true }))
      )
    }))
  },

  componentWillUnmount() {
    this.trackerHandler && trackerHandler.stop()
  },
})

const checkState = ({ _withTrackerState: { state } }) => typeof state === 'boolean' ? !state : true

const branchTrackerState = options => branch(checkState, () => ({ _withTrackerState: { state }, ...props }) => {
  if (typeof state === 'boolean')
    return options.loadingHandler && options.loadingHandler(props) || LoadingComponent()

  return options.errorHandler ? options.errorHandler(state, props) : ErrorComponent()
})

const withTracker = (tracker, options = {}) => compose(
  initialState,
  trackReactiveSource(tracker, options),
  branchTrackerState(options),
)

recompact.composeWithTracker = recompact.withTracker = withTracker

export default recompact
