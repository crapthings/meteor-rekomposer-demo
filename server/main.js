import _ from 'lodash'
import faker from 'faker'

Meteor.startup(() => {
  Test.remove({})

  const data = _.times(2000, n => ({
    text: faker.lorem.sentences(),
    type: _.sample(['a', 'b', 'c'])
  }))
  Test.batchInsert(data)

  Posts.remove({})
  const posts = _.times(1000, n => ({
    title: faker.lorem.sentences(),
  }))
  Posts.batchInsert(posts)
})

Meteor.methods({
  test1() {
    // throw new Meteor.Error(500, 'error', 'detail')
    this.unblock()
    return _.times(1000, n => faker.lorem.sentences())
  },

  test2() {
    // throw new Meteor.Error(500, 'error', 'detail')
    this.unblock()
    return _.times(100, n => faker.lorem.sentences())
  },

  addTest() {
    const data = _.times(10, n => ({
      text: faker.lorem.sentences(),
      type: _.sample(['a', 'b', 'c'])
    }))
    Test.batchInsert(data)
  }
})

Meteor.publish('test1', function() {
  this.unblock()
  Meteor._sleepForMs(5000)
  return Test.find()
})

Meteor.publish('test2', function() {
  this.unblock()
  return Test.find({ type: 'a' })
})

Meteor.publish('posts', function() {
  this.unblock()
  return Posts.find()
})
