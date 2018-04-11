const track4 = (props, onData, env) => {
  TestRerun1.get()
  const sub = Meteor.subscribe('test2')
  const subPosts = Meteor.subscribe('posts')
  if (sub.ready() && subPosts.ready()) {
    const list = Test.find().fetch()
    const posts = Posts.find().fetch()
    console.log(list, posts)
    onData(null, { list, posts })
  }

  console.log('rerun', sub.ready(), subPosts.ready())

  // return () => {
  //   sub.stop()
  //   subPosts.stop()
  //   console.log('stop page4 tracker')
  // }
}

const test4 = rk.composeWithTracker(track4)(({ list, posts }) => {
  return <>
    <h1>posts</h1>
    <div>
      {posts.map((item, itemIdx) => <div key={itemIdx}>{item.title}</div>)}
    </div>

    <h1>lists</h1>
    <div>
      {list.map((item, itemIdx) => <div key={itemIdx}>{item.text}</div>)}
    </div>
  </>
})

export default test4
