<?php

/**
 * @file
 * SimpleAds API.
 */

/**
 * Describe SimpleAds block order types
 */
function hook_simpleads_order_info() {
  return array(
    'delta_1' => t('Random order example'),
  );
}

/**
 * Build SQL Query to order SimpleAds in blocks.
 *
 * @param string $delta
 * @param array $term_ids
 * @param int $limit
 * @return type
 */
function hook_simpleads_order($delta, $term_ids, $limit) {
  if ($delta == 'delta_1') {
    $query = db_select('node', 'n');
    $query->join('taxonomy_index', 'ti', 'n.nid = ti.nid');
    $query->fields('n', array('nid'));
    $query->condition('n.type', 'simpleads');
    $query->condition('n.status', 1);
    $query->condition('ti.tid', $term_ids, 'IN');
    $query->orderRandom();
    $query->range(0, $limit);
    return $query->execute();
  }
}

/**
 * Add additional infromation to Ads listing and Ad statistics page.
 *
 * @param object $node
 * @param string $op
 *  - list
 *  - detail
 *  - ad_group
 *  - ad_status
 *  - ad_status_detail
 */
function hook_simpleads_stats_info($node, $op) {
  if ($op == 'list') {
    return array('Item on the ads listing page');
  }
}