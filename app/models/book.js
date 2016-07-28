import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
// import { hasMany } from 'ember-data/relationships';
import Ember from 'ember';
import Faker from 'faker';

export default Model.extend({
  title: attr('string'),
  releaseYear: attr('date'),
  library: belongsTo('library', {inverse: 'books', async: true}),
  author: belongsTo('author', {inverse: 'books', async: true}),
  isNotValid: Ember.computed.empty('title'),

  randomize(author,library){
    this.set('title', this._bookTitle());
    this.set('author', author);
    this.set('releaseYear', this._randomYear());
    this.set('library', library);
    return this;
  },

  _bookTitle() {
    return `${Faker.commerce.productName()} Cookbook`;
  },

  _randomYear() {
    return new Date(this._getRandomArbitrary(1900, 2016));
  },

  _getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
});
