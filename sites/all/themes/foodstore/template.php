<?php
/**
 * Implement hook_form_alter()
 */
 function foodstore_form_alter(&$form, &$form_state, $form_id) {
  if ('user_login_block' == $form_id) {      
    $form['actions']['submit']['#value'] = 'enter';
    $form['name']['#attributes'] = array('placeholder' => $form['name']['#title']);
    $form['pass']['#attributes'] = array('placeholder' => $form['pass']['#title']);
  }

  if ('user_register_form' == $form_id) {
    drupal_goto('mua-hang');
  }
  
  // Enable quantity field in add to cart form
  //uc_catalog_buy_it_now_form
  if(stripos($form_id, 'uc_product_add_to_cart_form') !== FALSE) {
    $options = array();
    for ($i = 1; $i <= 10; $i++) {
      $options[$i] = $i;
    }
    $form['qty'] = array(
      '#type' => 'select',
      '#title' => '',//t('Quantity'),
      '#default_value' => '1',
      '#options' => $options,
    );
  }
}