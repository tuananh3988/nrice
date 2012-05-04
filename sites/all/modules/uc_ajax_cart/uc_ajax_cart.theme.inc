<?php

/**
 * @file
 * All theming functions
 */

/**
 * @todo Please document this function.
 * @see http://drupal.org/node/1354
 */
function theme_uc_ajax_cart_cart_links() {
  $items[] = array(
    'data' => l(t('View cart'), 'cart', array('attributes' => array('rel' => 'nofollow'))),
    'class' => array('cart-block-view-cart'),
  );
  // Only add the checkout link if checkout is enabled.
  if (variable_get('uc_checkout_enabled', TRUE)) {
    $items[] = array(
      'data' => l(t('Checkout'), 'cart/checkout', array('attributes' => array('rel' => 'nofollow'))),
      'class' => array('cart-block-checkout'),
    );
  }
  return theme('item_list', array('items' => $items, 'title' => NULL, 'type' => 'ul', 'attributes' => array('class' => array('links'))));
}

/**
 * @todo Please document this function.
 * @see http://drupal.org/node/1354
 */
function theme_uc_ajax_cart_block_content_cached($variables) {
  // TODO Number of parameters in this theme funcion does not match number of parameters found in hook_theme.
  return '<a id="ajax-cart-view-handler" href="/cart">' . t('View cart') . '</a>';
}


function _theme_uc_ajax_cart_block_header($title) {
  if (variable_get('uc_ajax_cart_closed', 0) != 0) {
    $title = '<a href="#" id="ajaxCartToggleView">' . $title . '</a>';
  }
  return '<span class="title block-title" id="ajax-cart-headline">' . $title . '</span>';

}


/**
 * @todo Please document this function.
 * @see http://drupal.org/node/1354
 */
function theme_uc_ajax_cart_block_header($variables) {
  // TODO Number of parameters in this theme funcion does not match number of parameters found in hook_theme.
  return _theme_uc_ajax_cart_block_header(t('Shopping cart'));
}



