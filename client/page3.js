const track3 = (props, onData, env) => {
  TestRerun1.get()
  const sub = Meteor.subscribe('test1')
  if (sub.ready()) {
    const list = Test.find().fetch()
    console.log(list)
    onData(null, { list })
  }

  // return () => {
  //   sub.stop()
  //   console.log('stop page3 tracker')
  // }
}

const test3 = rk.composeWithTracker(track3)(({ list }) => {
  return <div>
    {list.map((item, itemIdx) => <div key={itemIdx}>{item.text}</div>)}
  </div>
})

export default test3
