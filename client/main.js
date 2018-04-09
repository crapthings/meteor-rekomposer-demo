import _ from 'lodash'
import faker from 'faker'
import React, { Component } from 'react'
import { render } from 'react-dom'
import recompose from './withTracker'

const {
  compose,
  lifecycle,
  withProps,
  withTracker,
} = recompose

const aaa = withProps({
  haha: true
})

const track = (props, onData) => {
  Meteor.call('test', (err, list) => err
    ? onData(err)
    : onData(null, { list })
  )
}

const test1 = compose(
  aaa,
  withTracker(track),
)(({ loading, list }) => {
  console.log(loading)

  if (loading && typeof loading === 'boolean')
    return <div>loading</div>

  if (loading && typeof loading !== 'boolean')
    return <div>{JSON.stringify(loading)}</div>

  return <div>
    {list && list.map((item, itemIdx) => <div key={itemIdx}>{item}</div>)}
  </div>
})

const App = test1

Meteor.startup(function () {
  const app = document.createElement('div')
  document.body.appendChild(app)
  render(<App />, app)
})
