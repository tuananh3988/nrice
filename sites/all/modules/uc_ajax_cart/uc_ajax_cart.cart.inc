<?php

function uc_attribute_uc_add_to_cart($nid, $qty, $data) {
  if (module_exists('uc_cart_links')) {
    $atts = uc_product_get_attributes($nid);
    if (!is_array($atts) || count($atts) == 0) {
      return;
    }
    if (!is_array($data) || !is_array($data['attributes'])) {
      $data['attributes'] = array();
    }
    $attsSubmitted = $data['attributes'];
    foreach ($atts as $key => $att) {
      if (!$att->required) {
        continue;
      }
      if (!isset($data['attributes'][$att->aid]) || empty($data['attributes'][$att->aid])) {
        return array(array(
            'success' => FALSE,
            'message' => t('You must specify an option for !attribute', array('!attribute' => $att->name)),
          ));
      }
    }
  }
}

/**
 * override hook_add_to_cart
 *
 * @param string $nid
 * @param integer $qty
 * @param array $data
 * @return array
 */
function uc_stock_uc_add_to_cart($nid, $qty, $data) {
  $product = node_load($nid);

  if (isset($data['attributes'])) {
    foreach ($data['attributes'] as $aid => $value) {
      if (is_numeric($value)) {
        $combination[$aid] = $value;
      }
    }

    if (is_array($combination)) {
      ksort($combination);
      $result = db_query("SELECT model FROM {uc_product_adjustments} WHERE nid = :nid AND combination LIKE :combination", array(':nid' => $nid, ':combination' => serialize($combination)));
      $model = $result->fetchField();
    }
  }
  else {
    $model = $product->model;
  }

  $result = db_query("SELECT nid FROM {uc_product_stock} WHERE sku = :sku AND nid = :nid AND active = :active AND stock <= :stock",
                     array(':sku' => $model, ':nid' => $nid, ':active' => 1, ':stock' => 0));

  if ($result->fetchField() > 0) {
    return array(array('success' => FALSE, 'message' => t('@product out of stock', array('@product' => $product->title))));
  }
}

