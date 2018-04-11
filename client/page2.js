const track2 = (props, onData, env) => {
  TestRerun2.get()
  Meteor.call('test2', (err, list) => err
    ? onData(err)
    : onData(null, { list })
  )

  console.log('track2')
  return () => console.log(2)
}

const test2 = rk.composeWithTracker(track2)(({ list }) => {
  return <div>
    {list.map((item, itemIdx) => <div key={itemIdx}>{item}</div>)}
  </div>
})

export default test2
