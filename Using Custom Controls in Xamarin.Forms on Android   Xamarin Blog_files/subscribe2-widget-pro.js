/**
 * Frontend Scripts for Subscribe2 Widget Pro
 * @since: v1.0
 */

jQuery(function($){

    jQuery('.s2w-subscribe').on('click',function(e){
        e.preventDefault();
        var email = jQuery(this).parent().children('.s2w-email').val();
        var ip = jQuery(this).parent().children('.s2w-user-up').val();
        //validate email
        if( !validateEmail(email)) {
            //not a valid email address
            s2wInvalidMessage(jQuery(this).parent().parent());
            return false;
        } else {
            //AJAX Data
            var data = new Object();
            data.email = email;
            data.action = 'subscribe';
            data.ip = ip;
            //AJAX Unsubscribe
            var formObject = $(this).parent().parent();
            s2wAjaxSubmit(data, formObject, 'subscribe');
        }

    });

    jQuery('.s2w-unsubscribe').on('click',function(e){
        e.preventDefault();
        var email = jQuery(this).parent().children('.s2w-email').val();
        var ip = jQuery(this).parent().children('.s2w-user-up').val();
        if( !validateEmail(email)) {
            //not a valid email address
            s2wInvalidMessage(jQuery(this).parent().parent());
            return false;
        } else {
            //AJAX Data
            var data = new Object();
            data.email = email;
            data.action = 'unsubscribe';
            data.ip = ip;
            //AJAX Unsubscribe
            s2wAjaxSubmit(data, jQuery(this).parent().parent(), 'unsubscribe');

        }

    });

});

function s2wAjaxSubmit(data, formObject, action){
    var postURL = s2wParams.s2wPOST;
//    jQuery.post(
//        postURL,
//       {
//          action:'s2w-ajax',
//          email: data.email,
//          subscribe: 'subscribe',
//          ip: '000.000.000'
//       },
//       function(data, textStatus, XMLHttpRequest){
//          console.log(data);
//          console.log(textStatus);
//       }
//    );

    jQuery.ajax({
      type: 'post',
      url: postURL,
      data: {
          action:'s2w-ajax',
          email: data.email,
          subscribe: action,
          ip: data.ip
      },

      success: function(data, textStatus, XMLHttpRequest) {
          console.log(textStatus);
          console.log(data);
          if(action == 'subscribe') {
              s2wSuccessMessage(formObject);
          } else {
              s2wUnsubscribeMessage(formObject);
          }

      }
    });

}

function validateEmail($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  if( !emailReg.test( $email ) ) {
    return false;
  } else {
    return true;
  }
}

function s2wInvalidMessage(form){
    var validation = jQuery(form).attr('data-validation-error');
    jQuery('.s2w-alert').fadeOut('fast').remove(); //remove any alerts already present
    jQuery(form).prepend('<div class="s2w-alert s2w-validation">'+ validation + '</div>');
    jQuery('.s2w-alert').slideDown('fast');
    jQuery(form).find('.s2w-email').addClass('s2w-input-invalid'); //add invalid class to input
}

function s2wSuccessMessage(form){
    //successful submission
    var message = jQuery(form).attr('data-validation-success');
    jQuery('.s2w-alert').fadeOut('fast').remove(); //remove any alerts already present
    jQuery(form).prepend('<div class="s2w-alert s2w-success">'+ message + '</div>');
    jQuery(form).children('form').hide(); //slide up form
    jQuery('.s2w-alert').slideDown('fast');
}
function s2wUnsubscribeMessage(form){
    //successful submission
    var message = jQuery(form).attr('data-unsubscribe-message');
    jQuery('.s2w-alert').fadeOut('fast').remove(); //remove any alerts already present
    jQuery(form).prepend('<div class="s2w-alert s2w-success">'+ message + '</div>');
    jQuery(form).children('form').hide(); //slide up form
    jQuery('.s2w-alert').slideDown('fast');
}