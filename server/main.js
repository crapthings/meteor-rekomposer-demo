import _ from 'lodash'
import faker from 'faker'

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
