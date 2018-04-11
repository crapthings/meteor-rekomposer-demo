const aaa = rk.withProps({
  haha: true
})

const track1 = (props, onData, env) => {
  TestRerun1.get()
  Meteor.call('test1', (err, list1) => err
    ? onData(err)
    : onData(null, { list1 })
  )

  console.log('track1')
  return () => console.log(1)
}

const track2 = (props, onData, env) => {
  TestRerun2.get()
  Meteor.call('test2', (err, list) => err
    ? onData(err)
    : onData(null, { list })
  )

  console.log('track2')
  return () => console.log(2)
}

const test1 = rk.compose(
  rk.withTracker(track1),
  aaa,
  rk.withTracker(track2),
)(({ list, list1 }) => {
  return <>
    <h1>list 1</h1>
    <div ref='okay'>
      {list.map((item, itemIdx) => <div key={itemIdx}>{item}</div>)}
    </div>
    <h1>list 2</h1>
    <div>
      {list1.map((item, itemIdx) => <div key={itemIdx}>{item}</div>)}
    </div>
  </>
})

export default  test1
