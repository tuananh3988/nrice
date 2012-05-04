(function ($) {
Drupal.behaviors.qtip = {
  attach: function(context) {

    // Set delay on click to immediate
    if (Drupal.settings.qtip.show_event_type == 'click') {
      show_delay = 1;
    }
    else {
      show_delay = 140; // This is the default qTip value, set for hover links
    }
    
    
    function get_tip_position(tooltip_position) {
      // Determine how to position the tooltip
      if (Drupal.settings.qtip.show_speech_bubble_tip) {
        // Set the proper qtip speech-bubble tip position
        if (Drupal.settings.qtip.show_speech_bubble_tip_side) {
          switch_position = tooltip_position.split('_');
          // We do not want to put tooltip on it's side if it is being displayed
          // in the center or side of an element
          if (switch_position[1] == 'center') {
            tip_position = Drupal.settings.qtip.tooltip_position;
          }
          else {
            tip_position = switch_position[1] + ' ' + switch_position[0];
          }
        }
        // Otherwise just set it to the same value as the tooltip
        else {
          tip_position = Drupal.settings.qtip.tooltip_position;
        }
      }
      else {
        tip_position = false;
      }
      //console.log(tip_position);
      return tip_position;
    }
    
    function get_style_classes(shadow_enabled, rounded_corners_enabled) {
      //shadowEnabled = (typeof shadowEnabled == "undefined") ? false : shadowEnabled;
      //roundedCornersEnabled = (typeof roundedCornersEnabled == "undefined") ? false : roundedCornersEnabled;
      
      var style_classes = ''; 
     
      // Do we want a shadow to show under the tooltip?
      if(shadow_enabled) {
        style_classes += 'ui-tooltip-shadow ';
      }

      // Do we want to show the tooltips with rounded corners?
      if(rounded_corners_enabled) {
        style_classes += 'ui-tooltip-rounded ';
      }
      
      // Is a custom style declared by the admin?
      if(Drupal.settings.qtip.color == 'custom-color') {
        style_classes += Drupal.settings.qtip.custom_color;
      }
      else {      
        style_classes += Drupal.settings.qtip.color;
      }
      
      return style_classes;
    }
    
    function get_solid_tip(solid_tip_enabled) {
      //solid_tip_enabled = (typeof solid_tip_enabled == "undefined") ? false : solid_tip_enabled;
      
      // Do we want a solid tip to display
      if (solid_tip_enabled) {
        solid_tip = false;
      }
      else {
        solid_tip = 5;
      }
      
      return solid_tip;
    }

/*** Standard Settings ***/
    $('.qtip-link').each(function() {
      if(Drupal.settings.qtip.show_event_type == 'click') {
        $(this).addClass('ui-tooltip-click');
      }
            
      // if there is a title associated with this qtip...
      if ($(this).children('.qtip-header').length) {
        tooltip_title = $(this).children('.qtip-header').html();
      }      
      else {
        // if there isn't we don't want a blank title area to show on the qtip...
        tooltip_title = false;
      }      
      
      build_qtip(this, 'node');
    });
      
    
/*** Additional Elements ***/
    if(Drupal.settings.qtip.additional_elements) {
      $(Drupal.settings.qtip.additional_elements).each(function() {
        $(this).addClass('qtip-additional-element');
        if(Drupal.settings.qtip.show_event_type == 'click') {
          $(this).addClass('ui-tooltip-click');
        }
        
        // if there is a title associated with this qtip...
        if ($(this).children('.qtip-header').length) {
          tooltip_title = $(this).children('.qtip-header').html();
        }
        // if there isn't we don't want a blank title area to show on the qtip...
        else {
          tooltip_title = false;
        }
        
        build_qtip(this, 'node');
      });
    }

/*** Webform Settings ***/
    // Does the admin even want the descriptions to show up in a tooltip?
    if (Drupal.settings.qtip.show_webform_descriptions) {
      /*
       form-text - works well
       form-textarea - works, but width can throw off the tooltip
       form-radios - works, but the radios element wrapper is 100% width, so throws off tooltip like form-textarea
       form-select - works well - should maybe have something like mouseenter or something for usability
      */
      // Elements where description is a sibling to the selected element
      $('form.webform-client-form .form-text,' +
        'form.webform-client-form .form-select').each(function() {
        description = $(this).siblings('.description');
        description.css('display', 'none');
        tooltip_title = false;
        show_delay = 1;
        build_qtip(this, 'form', description.html());
      });
  
      // Elements where description is a sibling to the PARENT of the selected element
      $('form.webform-client-form .form-radios,' +
        'form.webform-client-form .form-textarea').each(function() {
        description = $(this).parent().siblings('.description');
        description.css('display', 'none');
        tooltip_title = false;
        show_delay = 1;
        
        build_qtip(this, 'form', description.html());
      });
    }
    
        
    function build_qtip(el, type, desc) {      
      // Default Settings
      var tip_position = get_tip_position(Drupal.settings.qtip.tooltip_position);
      var rounded_corners_enabled = Drupal.settings.qtip.rounded_corner;
      var shadow_enabled = Drupal.settings.qtip.show_shadow;
      var style_classes = get_style_classes(shadow_enabled, rounded_corners_enabled);
      var solid_tip = get_solid_tip(Drupal.settings.qtip.show_speech_bubble_tip_solid);
      var show_modal = false;
      var position_target = false;
      var title_button = false;
      var content_ajax = false;
      
      if (type == 'form') {
        show_text = desc ? desc : '';
        // By default, the description text is wrapped inside <p>
        // Since we are putting this in a tooltip we want to remove this
        // and any other tags that might possibly get set
        show_text = show_text.replace(/(<.*?>)/ig,"");
        set_my = 'left_center';
        tip_position = 'left_center';
        set_at = 'right_center';
        show_event = 'focus';
        hide_event = 'blur';
      }
      else { // "Normal" tooltip
        show_text = $(el).children('.qtip-tooltip');
        set_my = Drupal.settings.qtip.tooltip_position;
        set_at = Drupal.settings.qtip.target_position;
        show_event = Drupal.settings.qtip.show_event_type;
        hide_event = Drupal.settings.qtip.hide_event_type;        
      }
      
      // Override tooltip settings with optional child HTML elements
      
      // Initialize the AJAX object, if it exists
      if ($(el).children('.qtip-ajax').length) {
        show_text = 'Loading...';
        content_ajax = { url: $(el).children('.qtip-ajax').html() }; 
      }

      // Override hide event type
      if ($(el).children('.qtip-tooltip-position').length) {        
        var qtip_position_map = {
          'top_left' : 'bottom_right',
          'top_center' : 'bottom_center',
          'top_right' : 'bottom_left',
          'right_center' : 'left_center',
          'bottom_right' : 'top_left',
          'bottom_center' : 'top_center',
          'bottom_left' : 'top_right',
          'left_center' : 'right_center',
        };
        
        set_at = $(el).children('.qtip-tooltip-position').html(); 
        set_my = qtip_position_map[set_at];
      }
      
      if ($(el).children('.qtip-speech-bubble').html() == 'false') {
        tip_position = false;
      }
      
      if ($(el).children('.qtip-speech-bubble').html() == 'true') {
        tip_position = set_my;
      }
      
      // Override default style classes
      if ($(el).children('.qtip-style-classes').length) {
        style_classes = $(el).children('.qtip-style-classes').html();
      }
      
      // Override show event type
      if ($(el).children('.qtip-show').length) {
        show_event = $(el).children('.qtip-show').html();
      }
      
      // Override hide event type
      if ($(el).children('.qtip-hide').length) {
        hide_event = $(el).children('.qtip-hide').html();
      }

      // 
      if ($(el).children('.qtip-modal').length) {  
        //show_text = $('div:hidden');
        set_my = 'center';
        set_at = 'center';
        //show_event = 'click';
        show_modal = true;
        position_target = $(window);
        tip_position = false;
      }
      
      if ($(el).children('.qtip-title-button').length) {  
        //show_text = $('div:hidden');
        title_button = $(el).children('.qtip-title-button').html();
      }
           
      
      $(el).qtip({
        content: {
          text: show_text,
          ajax: content_ajax,
          title: {
            text: tooltip_title,
            button: title_button
          }
        }, 
        position: {
          my: set_my, // my = speech bubble position on tooltip
          at: set_at, // at = where on link text tooltip will appear
          adjust: {
            screen: true // Keeps tooltip within visible window
          },
          target: position_target
        },
        style: {
          classes: style_classes,
          tip: {
            corner: tip_position, // Position of speech bubble tip...false will not display tip
            border: solid_tip, // parseInt(Drupal.settings.qtip.border_width)
            width: parseInt(Drupal.settings.qtip.speech_bubble_size),
            height: parseInt(Drupal.settings.qtip.speech_bubble_size)
          }
        },
        show: {
          event: show_event,
          solo: true, 
          delay: show_delay,
          modal: show_modal
        },
        hide: {
          event: hide_event,
          fixed: true //When set to true, the tooltip will not hide if moused over, allowing the contents to be clicked and interacted with.
        }
      });      
    }
  }
};
})(jQuery);
