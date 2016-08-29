/**
Template Controllers

@module Templates
*/

/**
The request account popup window template

@class [template] popupWindows_requestAccount
@constructor
*/

Template['popupWindows_requestAccount'].onRendered(function(){
    this.$('input.password').focus();
    TemplateVar.set('showPassword', false);
});

Template['popupWindows_requestAccount'].helpers({
    'passwordInputType': function() {
        return TemplateVar.get('showPassword')? 'text' : 'password';
    }
});

Template['popupWindows_requestAccount'].events({
   'click .cancel': function(){
        ipc.send('backendAction_closePopupWindow');
   },
   'click .show-password': function(e){
        TemplateVar.set('showPassword', e.currentTarget.checked)
    },
   'submit form': function(e, template){
        e.preventDefault();
        var pw = template.find('input.password').value;
        var pwRepeat =  template.find('input.password-repeat').value;

        // ask for password repeat
        if(!pwRepeat) {
            TemplateVar.set('password-repeat', true);
            template.$('input.password-repeat').focus();

            // stop here so we dont set the password repeat to false
            return;

        // check passwords
        } else if(pwRepeat === pw) {

            TemplateVar.set('creating', true);
            web3.personal.newAccount(pwRepeat, function(e, res){
                if(!e)
                    ipc.send('backendAction_sendToOwner', null, res);
                else
                    ipc.send('backendAction_sendToOwner', e);

                TemplateVar.set(template, 'creating', false);
                ipc.send('backendAction_closePopupWindow');
            });
        
        } else {
            template.$('.password').focus();

            GlobalNotification.warning({
                content: TAPi18n.__('mist.popupWindows.requestAccount.errors.passwordMismatch'),
                duration: 3
            });
        }

        TemplateVar.set('password-repeat', false);
        template.find('input.password-repeat').value = '';
        template.find('input.password').value = '';
        pw = pwRepeat = null;
   } 
});
