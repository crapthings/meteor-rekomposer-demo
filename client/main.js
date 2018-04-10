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

window.TestRerun1 = new ReactiveVar(Date.now())
window.TestRerun2 = new ReactiveVar(Date.now())

const aaa = withProps({
  haha: true
})

const track1 = (props, onData, env) => {
  TestRerun1.get()
  Meteor.call('test1', (err, list1) => err
    ? onData(err)
    : onData(null, { list1 })
  )

  return () => console.log(1)
}

const track2 = (props, onData, env) => {
  TestRerun2.get()
  Meteor.call('test2', (err, list) => err
    ? onData(err)
    : onData(null, { list })
  )

  console.log('track2')
  return () => console.log(1)
}

const test1 = compose(
  withTracker(track1),
  aaa,
  withTracker(track2),
)(({ loading, list }) => {
  return <div>
    {list.map((item, itemIdx) => <div key={itemIdx}>{item}</div>)}
  </div>
})

const test2 = composeWithTracker(track1)(({ loading, list }) => {
  return <div>
    {list.map((item, itemIdx) => <div key={itemIdx}>{item}</div>)}
  </div>
})

const App1 = test1
const App2 = test2

Meteor.startup(function () {
  const app = document.createElement('div')
  document.body.appendChild(app)
  render(<App1 />, app)
})
