import _ from 'lodash'
import faker from 'faker'
import React, { Component } from 'react'
import { render } from 'react-dom'
import recompact from './rekomposer'

const {
  compose,
  lifecycle,
  withProps,
  withTracker,
  composeWithTracker,
} = recompact

window.TestRerun = new ReactiveVar(Date.now())

const aaa = withProps({
  haha: true
})

const track = (props, onData, env) => {
  console.log(env)
  TestRerun.get()
  Meteor.call('test', (err, list) => err
    ? onData(err)
    : onData(null, { list })
  )

  return () => console.log(1)
}

const test1 = compose(
  aaa,
  withTracker(track),
)(({ loading, list }) => {
  return <div>
    {list.map((item, itemIdx) => <div key={itemIdx}>{item}</div>)}
  </div>
})

const test2 = composeWithTracker(track)(({ loading, list }) => {
  return <div>
    {list.map((item, itemIdx) => <div key={itemIdx}>{item}</div>)}
  </div>
})

const App1 = test1
const App2 = test2

Meteor.startup(function () {
  const app = document.createElement('div')
  document.body.appendChild(app)
  render(<App2 />, app)
})
