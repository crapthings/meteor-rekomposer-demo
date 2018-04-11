const track4 = (props, onData, env) => {
  const sub = Meteor.subscribe('test2')
  if (sub.ready()) {
    const list = Test.find().fetch()
    console.log(list)
    onData(null, { list })
  }

  return () => {
    sub.stop()
    console.log('stop page4 tracker')
  }
}

const test4 = rk.composeWithTracker(track4)(({ list }) => {
  return <div>
    {list.map((item, itemIdx) => <div key={itemIdx}>{item.text}</div>)}
  </div>
})

export default test4
