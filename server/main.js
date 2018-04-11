import _ from 'lodash'
import faker from 'faker'

Meteor.startup(() => {
  !Test.findOne()
  const data = _.times(2000, n => ({
    text: faker.lorem.sentences(),
    type: _.sample(['a', 'b', 'c'])
  }))
  Test.batchInsert(data)
})

Meteor.methods({
  test1() {
    // throw new Meteor.Error(500, 'error', 'detail')
    return _.times(1000, n => faker.lorem.sentences())
  },

  test2() {
    // throw new Meteor.Error(500, 'error', 'detail')
    return _.times(100, n => faker.lorem.sentences())
  }
})

Meteor.publish('test1', function() {
  return Test.find()
})

Meteor.publish('test2', function() {
  return Test.find({ type: 'a' })
})
