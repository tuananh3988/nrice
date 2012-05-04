<?php 
/**
 * This template demonstrates how to use qTip in Drupal.
 */
  
?>


<!-- Simple Tooltip -->
<?php
$simple_example = '<span class="qtip-link">
	<span class="qtip-header">Tooltip Title</span>
    <span class="qtip-tooltip">Tooltip Body</span>
    <span>simple tooltip</span>
  </span>';
?>

<h1>Simple Tooltip</h1>
<div>
  <p>Simple tooltips use whatever settings are specified in <em>admin/config/content/qtip</em></p>
  <h3>Example:</h3>
  <?php print $simple_example; ?>  
  <h3>Code:</h3>
  <pre>
    <?php print htmlspecialchars($simple_example); ?>
  </pre>
</div>

<!-- Advanced Tooltip -->
<?php
$ajax_target_url = base_path() . drupal_get_path("module", "qtip") . '/examples/ajax_callback.php';
$ajax_example = sprintf('<span class="qtip-link">
	<span class="qtip-header">Tooltip Title</span>
	<span class="qtip-tooltip">default text when ajax doesn\'t load</span>
    <span class="qtip-ajax">%s</span>
    <span class="qtip-title-button">true</span>
    <span class="qtip-speech-bubble">false</span>
    <span class="qtip-tooltip-position">right_center</span>
    <span class="qtip-style-classes">ui-tooltip-red ui-tooltip-rounded ui-tooltip-shadow</span>
    <span class="qtip-show">click</span>
    <span class="qtip-hide">click</span>
    <span>click to see an advanced tooltip</span>
  </span>', $ajax_target_url);
?>

<h1>Advanced Tooltip</h1>
<div>
  <p>This tooltip overrides the default settings in the following way...
  	<ul>
  		<li>Gets its content via ajax: see "qtip-ajax"</li>
  		<li>Explicity turns on the title "x" button: see "qtip-title-button"</li>
  		<li>Explicity turns off the speech bubble effect: see "qtip-speech-bubble"</li>
  		<li>Sets the position to right_center: see "qtip-tooltip-position"</li>
  		<li>Changes the style to "red," adds rounded-corners, and adds shadows: see "qtip-style-classes"</li>
  		<li>Sets the hide and show events to click: see "qtip-show" and "qtip-hide"</li>
  	</ul>
  </p>
  <h3>Example:</h3>
  <?php print $ajax_example; ?>  
  <h3>Code:</h3>
  <pre>
    <?php print htmlspecialchars($ajax_example); ?>
  </pre>
</div>

<!-- Modal Tooltip -->
<?php
$modal_example = '<span class="qtip-link">
	<span class="qtip-header">Tooltip Title</span>
	<span class="qtip-tooltip">Modal Tooltip!</span>
    <span class="qtip-modal">true</span>
    <span class="qtip-title-button">true</span>
    <span class="qtip-show">click</span>
    <span>click to see a modal tooltip</span>
  </span>';
?>

<h1>Modal Tooltip</h1>
<div>
  <h3>Example:</h3>
  <?php print $modal_example; ?>  
  <h3>Code:</h3>
  <pre>
    <?php print htmlspecialchars($modal_example); ?>
  </pre>
</div>
