_ = require('lodash')
faker = require('faker')

React = require('react')
Component = React.Component
mount = require('@lvfang/react-mounter').mount

rekomposer = rk = require('../index.js').default
rekomposer = rk = require('@crapthings/meteor-rekomposer').default

if (Meteor.isClient) {
  window.TestRerun1 = new ReactiveVar(Date.now())
  window.TestRerun2 = new ReactiveVar(Date.now())
}

Test = new Mongo.Collection('test')
Posts = new Mongo.Collection('posts')
