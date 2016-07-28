import Ember from 'ember';

export default Ember.Controller.extend({
  emailAddress: '',

  isValid: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
  isDisabled: Ember.computed.not('isValid'),

  actions:{
    saveInvitation(){
      var _that = this;
      var email = this.get('emailAddress');

      var newInvitation = this.store.createRecord('invitation', {
        email: email
      });

      newInvitation.save().then((response) => {
        _that.set('responseMessage', `Thank you! We saved your email address with the following id: ${response.get('id')}`);
        _that.set('emailAddress', '');
      });
    }
  }
});
