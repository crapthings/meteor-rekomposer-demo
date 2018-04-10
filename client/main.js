import _ from 'lodash'
import faker from 'faker'
import React, { Component } from 'react'
import { render } from 'react-dom'
import recompact from './withTracker'

const {
  compose,
  lifecycle,
  withProps,
  withTracker,
} = recompact

window.TestRerun = new ReactiveVar(Date.now())

const aaa = withProps({
  haha: true
})

const track = (props, onData) => {
  TestRerun.get()
  Meteor.call('test', (err, list) => err
    ? onData(err)
    : onData(null, { list })
  )
}

const test1 = compose(
  aaa,
  withTracker(track),
)(({ loading, list }) => {
  return <div>
    {list.map((item, itemIdx) => <div key={itemIdx}>{item}</div>)}
  </div>
})

const App = test1

Meteor.startup(function () {
  const app = document.createElement('div')
  document.body.appendChild(app)
  render(<App />, app)
})
