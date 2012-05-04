(function ($) {
$(document).ready(function() {
  /**
    Load the page initially with the correct settings
  */
  _qtip_handle_speech_bubble();
  
/*
  // If the selected option is Click ... qTip library needs the value of 'unfocus' so that is the key of the option
  if ($('input[name=qtip_hide_event_type]:checked').val() == 'unfocus') {
    $('.form-item-qtip-show-solo').show('fast');
  }
  else {
    $('.form-item-qtip-show-solo').hide('fast');      
  }
*/  

  /**
    Events on admin settings page...
  */
  $('select[name=qtip_target_position]').change(function(){
    _qtip_handle_speech_bubble();
  });

  
  $('input[name=qtip_show_speech_bubble_tip]').change(function(){
    _qtip_handle_speech_bubble();
  });
  
/*
  $('input[name=qtip_hide_event_type]').change(function(){
    // If the selected option is Click ... qTip library needs the value of 'unfocus' so that is the key of the option
    if ($('input[name=qtip_hide_event_type]:checked').val() == 'unfocus') {
      $('.form-item-qtip-show-solo').show('fast');
    }
    else {
      $('.form-item-qtip-show-solo').hide('fast');      
    }
  });
*/  
  $('#edit-qtip-color').change(function(){
    if ($(this).val() == 'custom-color') {
      $('.form-item-qtip-custom-color').slideDown('fast');
    }
    else {
      $('.form-item-qtip-custom-color').slideUp('fast');
    }
  });
  
  function _qtip_handle_speech_bubble() {
    // If the selected option doesn't have the word 'center' in it...thus we cannot change the tip position
    // and 'Show speech bubble tip' is checked'
    if ($('select[name=qtip_target_position]').val().indexOf('center') <= 0 && $('input[name=qtip_show_speech_bubble_tip]').is(':checked')) {
      $('.speech-bubble-options').slideDown('fast');
      $('.speech-bubble-options .form-item-qtip-show-speech-bubble-tip-side').slideDown('fast');
    }
    else if ($('select[name=qtip_target_position]').val().indexOf('center') > 0 && $('input[name=qtip_show_speech_bubble_tip]').is(':checked')) {
      $('.speech-bubble-options').slideDown('fast');
      $('.speech-bubble-options .form-item-qtip-show-speech-bubble-tip-side').slideUp('fast');
    }
    else {
      $('.speech-bubble-options').slideUp('fast');
    }
  }
});
})(jQuery);