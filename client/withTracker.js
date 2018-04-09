import recompose from 'recompose'

const {
  compose,
  withState,
  lifecycle,
} = recompose

recompose.withTracker = track => compose(
  withState('loading', 'setLoading', true),
  lifecycle({
    componentDidMount() {
      this.trackerHandler = Tracker.nonreactive(() => Tracker.autorun(() => {
        track(this.props, (err, nextProps) => {
          if (err) {
            this.props.setLoading(err)
          } else {
            this.setState(nextProps, () => {
              this.props.setLoading(false)
            })
          }
        })
      }))
    },
    componentWillUnmount() {
      this.trackerHandler && trackerHandler.stop()
    }
  })
)

export default recompose
