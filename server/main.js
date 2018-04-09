import _ from 'lodash'
import faker from 'faker'

Meteor.methods({
  test() {
    return _.times(100, n => faker.lorem.sentences())
  }
})
