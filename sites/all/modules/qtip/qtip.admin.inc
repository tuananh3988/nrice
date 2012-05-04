<?php

/**
 * @file
 * Administrative functions for the qTip module.
 */

/**
 * Callback function for admin/settings/qtip
 */
function qtip_settings_form() {
  $lib_version = variable_get('qtip_lib_version', '2.0.0pre');
  $lib_path = drupal_get_path('module', 'qtip') . '/library/';
  
  // If path doesn't contain the qTip library
  if (!file_exists($lib_path . '/jquery.qtip.js')) {
    $message = 'Download';
    // Provide a little more help if admin has specified custom path, but we cannot find the library file
    if ($lib_path != 'sites/all/libraries/qtip') {
      $message = 'You may need to change the path where the qTip library is pointed or download ';
    }
    drupal_set_message(t('qTip plugin not found in ' . $lib_path . '! ' . $message . ' the <a href="http://craigsworks.com/projects/qtip/download/">qTip jQuery plugin</a> and read this module\'s README.txt file for proper installation procedures.'), 'error');
  }

  $form = array();
  $form['qtip_running_version'] = array(
    '#type' => 'item',
    '#markup' => '<strong>' . t('qTip Library Version') . ':</strong> ' . $lib_version,
  );
  
  /* FIELDSETS */
  $form['style'] = array(
    '#type' => 'fieldset',
    '#title' => t('Styling options'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );
  $form['event'] = array(
    '#type' => 'fieldset',
    '#title' => t('Event options'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );
  $form['form'] = array(
    '#type' => 'fieldset',
    '#title' => t('Form settings'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );
  $form['advanced'] = array(
    '#type' => 'fieldset',
    '#title' => t('Advanced options'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );

  /* STYLE SECTION */
  $form['style']['qtip_target_position'] = array(
    '#type' => 'select',
    '#title' => t('Tooltip Position'),
    '#options' => array(
      'top_left' => 'Top Left Corner',
      'top_center' => 'Top Center',
      'top_right' => 'Top Right Corner',
      'right_center' => 'Right Side',
      'bottom_right' => 'Bottom Right Corner',
      'bottom_center' => 'Bottom Center',
      'bottom_left' => 'Bottom Left Corner',
      'left_center' => 'Left Side',
    ),
    '#description' => t('Set where the tooltips should display relative to the link text.'),
    '#default_value' => variable_get('qtip_target_position', 'top_right'),
  );
  $form['style']['qtip_show_speech_bubble_tip'] = array(
    '#type' => 'checkbox',
    '#title' => t('Show speech bubble tip'),
    '#description' => t('If checked, each tooltip will have a tip coming from the tooltip, making it appear like a speech bubble.'),
    '#default_value' => variable_get('qtip_show_speech_bubble_tip', TRUE),
  );
  $form['style']['qtip_show_speech_bubble_tip_side'] = array(
    '#type' => 'checkbox',
    '#title' => t('Show speech bubble tip on side of corner'),
    '#description' => t('If checked the speech bubble tip will be shown on the side of the chosen corner instead of above or below.'),
    '#default_value' => variable_get('qtip_show_speech_bubble_tip_side', FALSE),
    '#prefix' => '<div class="speech-bubble-options">', // This line needs to be on the FIRST sub-element of speech bubble tip
  );
  $form['style']['qtip_speech_bubble_tip_size'] = array(
    '#type' => 'select',
    '#title' => t('Speech bubble size'),
    '#options' => array(
      '12' => 'Normal',
      '15' => 'Medium',
      '18' => 'Large',
      '20' => 'Extra Large',
    ),
    '#description' => t('Set the size of the tooltips\' speech bubble.'),
    '#default_value' => variable_get('qtip_speech_bubble_tip_size', 12),
  );
  $form['style']['qtip_show_speech_bubble_tip_solid'] = array(
    '#type' => 'checkbox',
    '#title' => t('Show the speech bubble tip as a solid color'),
    '#description' => t('If checked the speech bubble tip will be a solid color (the color of the tooltip border). Otherwise it will have a border around it like the tooltip itself.'),
    '#default_value' => variable_get('qtip_show_speech_bubble_tip_solid', FALSE),
    '#suffix' => '</div>', // This line needs to be on the LAST sub-element of speech bubble tip
  );
  $form['style']['qtip_show_shadow'] = array(
    '#type' => 'checkbox',
    '#title' => t('Show shadow under tooltips'),
    '#description' => t('If checked a shadow will display under each tooltip.'),
    '#default_value' => variable_get('qtip_show_shadow', FALSE),
  );
  $form['style']['qtip_rounded_corners'] = array(
    '#type' => 'checkbox',
    '#title' => t('Show tooltips with rounded corners'),
    '#description' => t('If checked each tooltip will have rounded corners.<br>' .
                        '<strong>NOTE:</strong> This adds a class (ui-tooltip-rounded) to each tooltip, which uses the border-radius CSS property, which is currently not supported in all browsers.'),
    '#default_value' => variable_get('qtip_rounded_corners', FALSE),
  );
  $form['style']['qtip_color'] = array(
    '#type' => 'select',
    '#title' => t('Color Scheme'),
    '#options' => array(
      'Standard Colors' => array(
        'ui-tooltip-plain' => 'Plain',
        'ui-tooltip-dark' => 'Dark',
        'ui-tooltip-green' => 'Green',
        '' => 'Yellow', // Since the qTip library uses this as default, there is no class for it
        'ui-tooltip-light' => 'Light',
        'ui-tooltip-red' => 'Red',
        'ui-tooltip-blue' => 'Blue',
      ),
      'Advanced Colors' => array(
        'ui-tooltip-youtube' => 'YouTube',
        'ui-tooltip-jtools' => 'jTools',
        'ui-tooltip-cluetip' => 'ClueTip',
        'ui-tooltip-tipsy' => 'Tipsy',
      ),
      'custom-color' => 'Custom Color Scheme',
    ),
    '#description' => t('The color scheme for all qtips.'),
    '#default_value' => variable_get('qtip_color', ''),
  );
  $form['style']['qtip_custom_color'] = array(
    '#type' => 'textfield',
    '#title' => t('Custom CSS Class'),
    '#description' => t('The name of the custom css class that will be used for all qTips.'),
    '#default_value' => variable_get('qtip_custom_color', ''),
    '#field_suffix' => '<small></small>',
  );
  /* EVENT SECTION */
  $form['event']['qtip_show_event_type'] = array(
    '#type' => 'radios',
    '#title' => t('Show Event Type'),
    '#options' => array(
      'mouseenter' => 'Hover',
      'click' => 'Click',
    ),
    '#description' => t('The action the user must take to <strong>activate</strong> the qtip.
                        <br /><strong>Hover:</strong> User moves mouse over link text.
                        <br /><strong>Click:</strong> User must click on the link text to activate qtip'),
    '#default_value' => variable_get('qtip_show_event_type', 'mouseenter'),
  );
  $form['event']['qtip_hide_event_type'] = array(
    '#type' => 'radios',
    '#title' => t('Hide Event Type'),
    '#options' => array(
      'mouseleave' => 'Leave',
      'unfocus' => 'Click',
    ),
    '#description' => t('The action the user must take to <strong>hide</strong> the qtip.
                        <br /><strong>Leave:</strong> User moves the mouse away from the link text.
                        <br /><strong>Click:</strong> User clicks anywhere on the document.'),
    '#default_value' => variable_get('qtip_hide_event_type', 'mouseleave'),
  );
/*
  $form['event']['qtip_show_solo'] = array(
    '#type' => 'checkbox',
    '#title' => t('Only allow one qtip to show at a time'),
    '#description' => t('If checked, only one tooltip will be visible to the user at a time.'),
    '#default_value' => variable_get('qtip_show_solo', TRUE),
  );
*/  /* FORM SETTINGS */
  $form['form']['webform']['qtip_show_webform_descriptions'] = array(
    '#type' => 'checkbox',
    '#title' => t('Use tooltips on webform descriptions'),
    '#description' => t('If checked, descriptions set for webform components will be removed from their traditional location and placed inside a tooltip.<br>' .
                        '<strong>NOTE:</strong> These tooltips will always display on the right side of the form element regardless of what position you have chosen above. ' .
                        'All other attributes, like color and speech bubble tip, will use the values chosen above.'),
    '#default_value' => variable_get('qtip_show_webform_descriptions', FALSE),
  );
  if (!module_exists('webform')) {
    $form['form']['#collapsed'] = TRUE;
    $form['form']['webform']['no_webform'] = array(
      '#type' => 'item',
      '#markup' => '<span class="qtip-warning-highlight">' . t('Webform module is not installed or enabled!') . '</span>',
      '#weight' => -100,
    );
    $form['form']['webform']['qtip_show_webform_descriptions']['#attributes'] = array('disabled' => 'disabled');
  }
  /* ADVANCED SECTION */
  $form['advanced']['qtip_additional_elements'] = array(
    '#type' => 'textfield',
    '#title' => t('Define additional elements to show with tooltips'),
    '#description' => t('Additional elements (classes and/or ids) can be set to show with tooltips, separated by a comma.<br>' .
                        '<strong>NOTE:</strong> This feature currently will only work with elements that have a title attribute set.'),
    '#default_value' => variable_get('qtip_additional_elements', ''),
  );
  $form['advanced']['qtip_use_uncompressed_js'] = array(
    '#type' => 'checkbox',
    '#title' => t('Use uncompressed qTip library file'),
    '#description' => t('<strong>NOT YET IMPLEMENTED!!</strong><br />This option allows the administrator to use the non-compressed version of the qTip library for custom implementations.<br /><strong>This should not be enabled unless it is necessary.</strong>'),
    '#default_value' => variable_get('qtip_use_uncompressed_js', 0),
    '#attributes' => array('disabled' => 'disabled'),
  );
  $form['advanced']['qtip_path_to_library'] = array(
    '#type' => 'textfield',
    '#title' => t('Path to qTip library'),
    '#description' => t('<strong>NOT YET IMPLEMENTED!!</strong><br />Set a custom relative path to the qTip library. <strong>DO NOT</strong> include a leading or trailing slash.<br /><strong>Leave the default unless you have a specific reason for changing it.</strong>'),
    '#default_value' => variable_get('qtip_path_to_library', 'sites/all/libraries/qtip'),
  );  
  $form['advanced']['qtip_load_lib_on_every_page'] = array(
        '#type' => 'checkbox',
        '#title' => t('Load the qTip library on every page'),
        '#description' => t('If unchecked the qTip library will need to be loaded programmtically with <em>drupal_add_library(\'qtip\', \'qtip\')</em> in your theme or module.<br /><strong>Leave the default unless you have a specific reason for changing it.</strong>'),
        '#default_value' => variable_get('qtip_load_lib_on_every_page', TRUE),
  );

  return system_settings_form($form);
}