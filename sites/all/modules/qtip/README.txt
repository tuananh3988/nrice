-- SUMMARY --
qTip is a tooltip module for Drupal. By using a simple input filter in your code you can have a stylish tooltip in just seconds.

-- REQUIREMENTS --
* Version 2 of the qTip jQuery plugin, which is included with the module. 

-- INSTALLATION --
* Install as usual, see http://drupal.org/documentation/install/modules-themes/modules-7 for further information.

-- CONFIGURATION --
* Once installed, go to admin/config/content/qtip
    * Select how you would like your qTips to display. Save.
* See http://YOURSITE/qtip-examples for examples of how to use features added in version 7.x-2.x.
* If you want to use simple tooltips via a filter:
    * Go to admin/settings/filters
        * Click 'configure' on the input filter that you would like to add qTip to
          NOTE: For input filters that have 'HTML filter' enabled (like Filtered HTML), qTip MUST be weighted heavier than HTML filter
            This should be default, but it would be a good idea to check.
    * Save and repeat for as many input filters as you would like.
    * On a node page enter the filter with the following format:
      [qtip:Name of link (target) text|Text to appear in tooltip]
        The filter MUST start with '[qtip:' (no quotes)
        The visible text that will always show on the node page and will be used as a link to
        the tooltip comes next, followed by | (pipe)
        Finally, the text you would like to appear in the tooltip is last, followed by ']' (no quotes)
* To use more advanced (including HTML markup) tooltips:
  NOTE: For input filters that have 'HTML filter' enabled (like Filtered HTML), this option will not work!
    * Use the following structure on a node page
        * <span class="qtip-link">
            <div class="qtip-header">Tooltip Heading (optional)</div>
            <div class="qtip-tooltip">Tooltip content</div>
            Link text to tooltip
          </span>
        * You do not have to specify a heading.
        * The tooltip content area can contain any HTML markup.
* Below is a template of each tooltip HTML structure. Use this for custom CSS styling
    FROM: http://craigsworks.com/projects/qtip/docs/#structure
    <div class="qtip qtip-stylename">
       <div class="qtip-tip" rel="cornerValue"></div>
       <div class="qtip-wrapper">
          <div class="qtip-borderTop"></div> // Only present when using rounded corners
          <div class="qtip-contentWrapper">
             <div class="qtip-title"> // All CSS styles...
                <div class="qtip-button"></div> // ...are usually applied...
             </div>
             <div class="qtip-content"></div> // ...to these three elements!
          </div>
          <div class="qtip-borderBottom"></div> // Only present when using rounded corners
       </div>
    </div>
    NOTE: You may have to use !important with your CSS rules as some of the rules
    are set inline by the qTip library.
    qtip-button is not yet implemented in this module


-- MAINTAINERS --
Current maintainers:
* Ethan Hann (hashmap) - http://drupal.org/user/990340
* Jacob Neher (bocaj) - http://drupal.org/user/582042


-- SPECIAL THANKS --
To Craig Thompson, creator of the qTip jQuery plugin!
http://craigsworks.com