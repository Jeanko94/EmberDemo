import Ember from 'ember';

export default Ember.Controller.extend({
  emailAddress: '',
  message: '',

  isValid: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
  isMessage: Ember.computed.gte('message.length', 5),
  isDisabled : Ember.computed('isValid','isMessage', function(){
    if(this.get('isValid') && this.get('isMessage')){
      return false;
    }else{
      return true;
    }
  }),
  actions:{
    sendMessage(){
      var _that = this;
      var email = this.get('emailAddress');
      var message = this.get('message');
      var newContact = this.store.createRecord('contact', {
        email: email,
        message: message
      });

      newContact.save().then((response)=>{
        _that.set('responseMessage',`Thank you! We've just send your message with id: ${response.get('id')}`);
        _that.set('emailAddress', '');
        _that.set('message','');
      });
    }
  }


});
