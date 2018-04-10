import _ from 'lodash'
import faker from 'faker'

Meteor.methods({
  test() {
    // throw new Meteor.Error(500, 'error', 'detail')
    return _.times(100, n => faker.lorem.sentences())
  }
})
