<?php

/**
 * @file
 * SimpleAds Integration with other contributed modules.
 */

/**
 * Implements hook_views_api().
 */
function simpleads_views_api() {
  return array(
    'api' => 3,
    'path' => drupal_get_path('module', 'simpleads') . '/includes',
    'template path' => drupal_get_path('module', 'simpleads') . '/templates',
  );
}

/**
 * Implements hook_views_plugins().
 */
function simpleads_views_plugins() {
  return array(
    'style' => array( //declare the views_json style plugin
      'simpleads' => array(
        'title' => t('SimpleAds'),
        'help' => t('Displays ads in block'),
        'handler' => 'views_simpleads_plugin',
        'theme' => 'views_simpleads',
        'theme path' => drupal_get_path('module', 'simpleads') . '/templates',
        'theme file' => 'views-simpleads.tpl.php',
        'uses row plugin' => FALSE,
        'uses fields' => TRUE,
        'uses options' => TRUE,
        'type' => 'normal',
      ),
    ),
  );
}

/**
 * Preprocess for SimpleAds Views template.
 * views-simpleads.tpl.php
 */
function template_preprocess_views_simpleads(&$vars) {
  $ads = array();
  $ad_settings = array();
  $block_settings = array();
  $view = $vars['view'];
  $rows = $vars['rows'];
  $options = $vars['options'];
  $limit = check_plain($view->query->limit);

  if (count($rows) > 0) {
    foreach ($rows as $i => $data) {
      if (isset($data->field_field_ad_category[0])) {
        $tid = $data->field_field_ad_category[0]['raw']['tid'];
        $node = $data->_field_data['nid']['entity'];
        $ads[] = _simpleads_ads_data($node);
      }
    }
  };

  $prefix = 'views-' . $view->name . '-' . $tid . '-' . rand(1, 1000);

  $ad_settings['ads_height'] = $options['ads_height'];
  $ad_settings['ads_width'] = $options['ads_width'];

  $block_settings['ads_rotation_type'] = $options['ads_rotation_type'];
  $block_settings['ads_rotation_delay'] = $options['ads_rotation_delay'];
  $block_settings['block_delta'] = $prefix;

  $vars['tid'] = $tid;
  $vars['prefix'] = $prefix;
  $vars['ads_list'] = _simpleads_render_ajax_template($ads, $tid, $limit, $ad_settings, $block_settings);
}

/**
 * Implements hook_views_default_views().
 */
function simpleads_views_default_views() {
  $view = new view;
  $view->name = 'simpleads_block_example';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'SimpleAds Block Example';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = TRUE;

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'SimpleAds Block Example';
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['query_comment'] = FALSE;
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '5';
  $handler->display->display_options['style_plugin'] = 'simpleads';
  $handler->display->display_options['style_options']['ads_rotation_type'] = '1';
  $handler->display->display_options['style_options']['ads_rotation_delay'] = '5';
  /* Field: Content: Ad Group */
  $handler->display->display_options['fields']['field_ad_category']['id'] = 'field_ad_category';
  $handler->display->display_options['fields']['field_ad_category']['table'] = 'field_data_field_ad_category';
  $handler->display->display_options['fields']['field_ad_category']['field'] = 'field_ad_category';
  $handler->display->display_options['fields']['field_ad_category']['label'] = '';
  $handler->display->display_options['fields']['field_ad_category']['alter']['alter_text'] = 0;
  $handler->display->display_options['fields']['field_ad_category']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['field_ad_category']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['field_ad_category']['alter']['external'] = 0;
  $handler->display->display_options['fields']['field_ad_category']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['field_ad_category']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['field_ad_category']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['field_ad_category']['alter']['word_boundary'] = 1;
  $handler->display->display_options['fields']['field_ad_category']['alter']['ellipsis'] = 1;
  $handler->display->display_options['fields']['field_ad_category']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['field_ad_category']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['field_ad_category']['alter']['html'] = 0;
  $handler->display->display_options['fields']['field_ad_category']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_ad_category']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['field_ad_category']['hide_empty'] = 0;
  $handler->display->display_options['fields']['field_ad_category']['empty_zero'] = 0;
  $handler->display->display_options['fields']['field_ad_category']['hide_alter_empty'] = 1;
  $handler->display->display_options['fields']['field_ad_category']['field_api_classes'] = 0;
  /* Sort criterion: Global: Random */
  $handler->display->display_options['sorts']['random']['id'] = 'random';
  $handler->display->display_options['sorts']['random']['table'] = 'views';
  $handler->display->display_options['sorts']['random']['field'] = 'random';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 0;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'simpleads' => 'simpleads',
  );

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block');
  $handler->display->display_options['block_description'] = 'Views: SimpleAds Block Example';

  $views[$view->name] = $view;
  return $views;
}

/**
 * Implements hook_simpleads_order_info().
 */
function simpleads_simpleads_order_info() {
  $delta = array();

  $delta['random'] = t('Random');
  $delta['order_created_desc'] = t('Order by created date DESC');
  $delta['order_modified_desc'] = t('Order by modifed date DESC');
  $delta['order_title_asc'] = t('Order by node title ASC');

  // Nodequeue module integration
  if (module_exists('nodequeue')) {
    $qids = nodequeue_get_qids('simpleads');
    foreach ($qids as $row) {
      $nq = db_select('nodequeue_queue', 'nq')->fields('nq', array('name', 'title'))->condition('nq.qid', $row->qid)->execute()->fetchObject();
      $delta[$nq->name] = t('Nodequeue: @name', array('@name' => $nq->title));
    }
  }
  return $delta;
}

/**
 * Implements hook_simpleads_order().
 */
function simpleads_simpleads_order($delta, $term_ids, $limit) {
  if ($delta == 'random') {
    $query = db_select('node', 'n');
    $query->join('taxonomy_index', 'ti', 'n.nid = ti.nid');
    $query->fields('n', array('nid'));
    $query->condition('n.type', 'simpleads');
    $query->condition('ti.tid', $term_ids, 'IN');
    $query->condition('n.status', 1);
    $query->orderRandom();
    $query->range(0, $limit);
    return $query->execute();
  }
  if ($delta == 'order_created_desc' || $delta == 1) {
    $query = db_select('node', 'n');
    $query->join('taxonomy_index', 'ti', 'n.nid = ti.nid');
    $query->fields('n', array('nid'));
    $query->condition('n.type', 'simpleads');
    $query->condition('ti.tid', $term_ids, 'IN');
    $query->condition('n.status', 1);
    $query->orderRandom();
    $query->orderBy('n.created', 'DESC');
    $query->range(0, $limit);
    return $query->execute();
  }
  if ($delta == 'order_modified_desc' || $delta == 2) {
    $query = db_select('node', 'n');
    $query->join('taxonomy_index', 'ti', 'n.nid = ti.nid');
    $query->fields('n', array('nid'));
    $query->condition('n.type', 'simpleads');
    $query->condition('ti.tid', $term_ids, 'IN');
    $query->condition('n.status', 1);
    $query->orderRandom();
    $query->orderBy('n.changed', 'DESC');
    $query->range(0, $limit);
    return $query->execute();
  }
  if ($delta == 'order_title_asc' || $delta == 3) {
    $query = db_select('node', 'n');
    $query->join('taxonomy_index', 'ti', 'n.nid = ti.nid');
    $query->fields('n', array('nid'));
    $query->condition('n.type', 'simpleads');
    $query->condition('ti.tid', $term_ids, 'IN');
    $query->condition('n.status', 1);
    $query->orderRandom();
    $query->orderBy('n.title', 'ASC');
    $query->range(0, $limit);
    return $query->execute();
  }
  // Nodequeue module integration
  if (module_exists('nodequeue')) {
    $qids = nodequeue_get_qids('simpleads');
    foreach ($qids as $row) {
      if ($delta == 'queue_' . $row->qid) {
        $query = db_select('nodequeue_nodes', 'nn');
        $query->fields('nn', array('nid'));
        $query->condition('nn.qid', $row->qid);
        $query->orderBy('nn.position', 'DESC');
        return $query->execute();
      }
    }
  }
}

/**
 * Implements hook_node_load().
 */
function simpleads_node_load($nodes, $types) {
  foreach ($nodes as $i => $node) {
    // Integartion with Domain Access module.
    if (module_exists('domain')) {
      if ($node->type == 'simpleads') {
        $_domain = domain_get_domain();
        $did = ($_domain['domain_id'] == '') ? 0 : $_domain['domain_id'];
        $show = 0;
        foreach ($node->domains as $gid) {
          ($gid == -1) ? $key = 0 : $key = $gid;
          $domain = domain_lookup($key);
          if ($domain['domain_id'] == $did && in_array(-1, $node->domains)) $show = 1;
          elseif ($domain['domain_id'] == $did) $show = 1;
        }
        $node->simpleads_show = $show;
      }
    }
    else {
      $node->simpleads_show = 1;
    }
  }
}