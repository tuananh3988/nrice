Drupal.locale = { 'strings': {"":{"An AJAX HTTP error occurred.":"Có lỗi AJAX HTTP.", "HTTP Result Code: !status":"Kết quả mã HTTP: !status", "An AJAX HTTP request terminated abnormally.":"Yêu cầu AJAX HTTP kết thúc bất thường.", "Debugging information follows.":"Rà lỗi theo thông tin sau.", "Path: !uri":"Đường dẫn: !uri", "StatusText: !statusText":"StatusText: !statusText", "ResponseText: !responseText":"ResponseTextt: !responseText", "ReadyState: !readyState":"ReadyState: !readyState", "Edit":"Sửa", "Configure":"Cấu hình", "Done":"Xong", "Anonymous users":"Người dùng nặc danh", "@title dialog":"Hộp thoại @title", "(active tab)":"(tab hoạt động)", "Loading":"Đang nạp", "Re-order rows by numerical weight instead of dragging.":"Sắp xếp lại danh mục theo độ nặng thay vì kéo chúng.", "Show row weights":"Hiện trọng số hàng", "Hide row weights":"Ẩn trọng số hàng", "Drag to re-order":"Kéo để sắp xếp lại", "Changes made in this table will not be saved until the form is submitted.":"Các thay đổi được thực hiện trong bảng này sẽ không được lưu cho đến khi biểu mẫu được đệ trình.", "Customize dashboard":"Sửa cấu hình khối", "Not restricted":"Không hạn chế", "Restricted to certain pages":"Hạn chế đối với một số trang", "Not customizable":"Người dùng không được phép tùy chỉnh", "The changes to these blocks will not be saved until the \u003Cem\u003ESave blocks\u003C\u002Fem\u003E button is clicked.":"Các thay đổi đối với các khối nội dung này sẽ chưa được lưu cho đến khi nút \u003Cem\u003ELưu các khối nội dung\u003C\u002Fem\u003E được nhấp.", "The block cannot be placed in this region.":"Không thể đưa khối này vào vùng này.", "Hide":"Ẩn", "Show":"Hiện", "Not published":"Chưa công bố", "Hide summary":"Ẩn tóm tắt", "Edit summary":"Sửa nội dung", "Please wait...":"Vui lòng đợi...", "The selected file %filename cannot be uploaded. Only files with the following extensions are allowed: %extensions.":"Tên tệp %filename không được phép tải lên. Chỉ có các tệp với phần mở rộng sau là được phép: %extensions.", "Not in menu":"Không có trong trình đơn", "No revision":"Không có phiên bản nào", "By @name on @date":"Bởi @name vào lúc @date", "@number comments per page":"@number lời bình mỗi trang", "Alias: @alias":"Đường dẫn ảo: @alias", "No alias":"Chưa có URL", "Requires a title":"Phần tiêu đề là bắt buộc", "Don\u0027t display post information":"Hiển thị thoại thông tin chữ", "Select all rows in this table":"Chọn tất cả các dòng trong bảng này", "Deselect all rows in this table":"Bỏ chọn tất cả các dòng trong bảng này"}} };;

(function ($) {
  Drupal.Panels = {};

  Drupal.Panels.autoAttach = function() {
    if ($.browser.msie) {
      // If IE, attach a hover event so we can see our admin links.
      $("div.panel-pane").hover(
        function() {
          $('div.panel-hide', this).addClass("panel-hide-hover"); return true;
        },
        function() {
          $('div.panel-hide', this).removeClass("panel-hide-hover"); return true;
        }
      );
      $("div.admin-links").hover(
        function() {
          $(this).addClass("admin-links-hover"); return true;
        },
        function(){
          $(this).removeClass("admin-links-hover"); return true;
        }
      );
    }
  };

  $(Drupal.Panels.autoAttach);
})(jQuery);
;
/* $Id: admin_menu.js,v 1.32 2010/02/20 23:44:00 sun Exp $ */
(function($) {

Drupal.admin = Drupal.admin || {};
Drupal.admin.behaviors = Drupal.admin.behaviors || {};
Drupal.admin.hashes = Drupal.admin.hashes || {};

/**
 * Core behavior for Administration menu.
 *
 * Test whether there is an administration menu is in the output and execute all
 * registered behaviors.
 */
Drupal.behaviors.adminMenu = {
  attach: function (context, settings) {
    // Initialize settings.
    settings.admin_menu = $.extend({
      suppress: false,
      margin_top: false,
      position_fixed: false,
      tweak_modules: false,
      tweak_permissions: false,
      tweak_tabs: false,
      destination: '',
      basePath: settings.basePath,
      hash: 0,
      replacements: {}
    }, settings.admin_menu || {});
    // Check whether administration menu should be suppressed.
    if (settings.admin_menu.suppress) {
      return;
    }
    var $adminMenu = $('#admin-menu:not(.admin-menu-processed)', context);
    // Client-side caching; if administration menu is not in the output, it is
    // fetched from the server and cached in the browser.
    if (!$adminMenu.length && settings.admin_menu.hash) {
      Drupal.admin.getCache(settings.admin_menu.hash, function (response) {
          if (typeof response == 'string' && response.length > 0) {
            $('body', context).prepend(response);
          }
          var $adminMenu = $('#admin-menu:not(.admin-menu-processed)', context);
          // Apply our behaviors.
          Drupal.admin.attachBehaviors(context, settings, $adminMenu);
      });
    }
    // If the menu is in the output already, this means there is a new version.
    else {
      // Apply our behaviors.
      Drupal.admin.attachBehaviors(context, settings, $adminMenu);
    }
  }
};

/**
 * Collapse fieldsets on Modules page.
 */
Drupal.behaviors.adminMenuCollapseModules = {
  attach: function (context, settings) {
    if (settings.admin_menu.tweak_modules) {
      $('#system-modules fieldset:not(.collapsed)', context).addClass('collapsed');
    }
  }
};

/**
 * Collapse modules on Permissions page.
 */
Drupal.behaviors.adminMenuCollapsePermissions = {
  attach: function (context, settings) {
    if (settings.admin_menu.tweak_permissions) {
      // Freeze width of first column to prevent jumping.
      $('#permissions th:first', context).css({ width: $('#permissions th:first', context).width() });
      // Attach click handler.
      $('#permissions tr:has(td.module)', context).once('admin-menu-tweak-permissions', function () {
        var $module = $(this);
        $module.bind('click.admin-menu', function () {
          // @todo Replace with .nextUntil() in jQuery 1.4.
          $module.nextAll().each(function () {
            var $row = $(this);
            if ($row.is(':has(td.module)')) {
              return false;
            }
            $row.toggleClass('element-hidden');
          });
        });
      }).trigger('click.admin-menu');
    }
  }
};

/**
 * Apply margin to page.
 *
 * Note that directly applying marginTop does not work in IE. To prevent
 * flickering/jumping page content with client-side caching, this is a regular
 * Drupal behavior.
 */
Drupal.behaviors.adminMenuMarginTop = {
  attach: function (context, settings) {
    if (!settings.admin_menu.suppress && settings.admin_menu.margin_top) {
      $('body:not(.admin-menu)', context).addClass('admin-menu');
    }
  }
};

/**
 * Retrieve content from client-side cache.
 *
 * @param hash
 *   The md5 hash of the content to retrieve.
 * @param onSuccess
 *   A callback function invoked when the cache request was successful.
 */
Drupal.admin.getCache = function (hash, onSuccess) {
  if (Drupal.admin.hashes.hash !== undefined) {
    return Drupal.admin.hashes.hash;
  }
  $.ajax({
    cache: true,
    type: 'GET',
    dataType: 'text', // Prevent auto-evaluation of response.
    global: false, // Do not trigger global AJAX events.
    url: Drupal.settings.admin_menu.basePath.replace(/admin_menu/, 'js/admin_menu/cache/' + hash),
    success: onSuccess,
    complete: function (XMLHttpRequest, status) {
      Drupal.admin.hashes.hash = status;
    }
  });
}

/**
 * @defgroup admin_behaviors Administration behaviors.
 * @{
 */

/**
 * Attach administrative behaviors.
 */
Drupal.admin.attachBehaviors = function (context, settings, $adminMenu) {
  if ($adminMenu.length) {
    $adminMenu.addClass('admin-menu-processed');
    $.each(Drupal.admin.behaviors, function() {
      this(context, settings, $adminMenu);
    });
  }
};

/**
 * Apply 'position: fixed'.
 */
Drupal.admin.behaviors.positionFixed = function (context, settings, $adminMenu) {
  if (settings.admin_menu.position_fixed) {
    $adminMenu.addClass('admin-menu-position-fixed');
    $adminMenu.css('position', 'fixed');
  }
};

/**
 * Move page tabs into administration menu.
 */
Drupal.admin.behaviors.pageTabs = function (context, settings, $adminMenu) {
  if (settings.admin_menu.tweak_tabs) {
    $('ul.tabs.primary li', context).addClass('admin-menu-tab').appendTo('#admin-menu-wrapper > ul');
    $('ul.tabs.secondary', context).appendTo('#admin-menu-wrapper > ul > li.admin-menu-tab.active').removeClass('secondary');
    $('ul.tabs.primary', context).remove();
  }
};

/**
 * Perform dynamic replacements in cached menu.
 */
Drupal.admin.behaviors.replacements = function (context, settings, $adminMenu) {
  for (var item in settings.admin_menu.replacements) {
    $(item, $adminMenu).html(settings.admin_menu.replacements[item]);
  }
}

/**
 * Inject destination query strings for current page.
 */
Drupal.admin.behaviors.destination = function (context, settings, $adminMenu) {
  if (settings.admin_menu.destination) {
    $('a.admin-menu-destination', $adminMenu).each(function() {
      this.search += (!this.search.length ? '?' : '&') + Drupal.settings.admin_menu.destination;
    });
  }
}

/**
 * Apply JavaScript-based hovering behaviors.
 *
 * @todo This has to run last.  If another script registers additional behaviors
 *   it will not run last.
 */
Drupal.admin.behaviors.hover = function (context, settings, $adminMenu) {
  // Hover emulation for IE 6.
  if ($.browser.msie && parseInt(jQuery.browser.version) == 6) {
    $('li', $adminMenu).hover(
      function () {
        $(this).addClass('iehover');
      },
      function () {
        $(this).removeClass('iehover');
      }
    );
  }

  // Delayed mouseout.
  $('li.expandable', $adminMenu).hover(
    function () {
      // Stop the timer.
      clearTimeout(this.sfTimer);
      // Display child lists.
      $('> ul', this)
        .css({left: 'auto', display: 'block'})
        // Immediately hide nephew lists.
        .parent().siblings('li').children('ul').css({left: '-999em', display: 'none'});
    },
    function () {
      // Start the timer.
      var uls = $('> ul', this);
      this.sfTimer = setTimeout(function () {
        uls.css({left: '-999em', display: 'none'});
      }, 400);
    }
  );
};

/**
 * @} End of "defgroup admin_behaviors".
 */

})(jQuery);
;
/* $Id: admin_menu_toolbar.js,v 1.3 2010/02/19 23:19:00 sun Exp $ */
(function($) {

Drupal.admin = Drupal.admin || {};
Drupal.admin.behaviors = Drupal.admin.behaviors || {};

/**
 * @ingroup admin_behaviors
 * @{
 */

/**
 * Apply active trail highlighting based on current path.
 *
 * @todo Not limited to toolbar; move into core?
 */
Drupal.admin.behaviors.toolbarActiveTrail = function (context, settings, $adminMenu) {
  if (settings.admin_menu.toolbar && settings.admin_menu.toolbar.activeTrail) {
    $adminMenu.find('> div > ul > li > a[href=' + settings.admin_menu.toolbar.activeTrail + ']').addClass('active-trail');
  }
};

/**
 * @} End of "defgroup admin_behaviors".
 */

})(jQuery);
;

(function ($) {
  function teaser_handler(event) {
    if ($("input[name=faq_display]:checked").val() != "new_page") {
      if ($("input[name=faq_use_teaser]:checked").val() == 1) {
        $("input[name=faq_more_link]").removeAttr("disabled");
      }
      else {
        $("input[name=faq_more_link]").attr("disabled", "disabled");
      }
    }
  }

  function faq_display_handler(event) {
    // Enable / disable "questions_inline" and "questions_top" only settings.
    if ($("input[name=faq_display]:checked").val() == "questions_inline" || $("input[name=faq_display]:checked").val() == "questions_top") {
      $("input[name=faq_back_to_top]").removeAttr("disabled");
      $("input[name=faq_qa_mark]").removeAttr("disabled");
      // Enable / disable label settings according to "qa_mark" setting.
      if ($("input[name=faq_qa_mark]:checked").val() == 1) {
        $("input[name=faq_question_label]").removeAttr("disabled");
        $("input[name=faq_answer_label]").removeAttr("disabled");
      }
      else {
        $("input[name=faq_question_label]").attr("disabled", "disabled");
        $("input[name=faq_answer_label]").attr("disabled", "disabled");
      }
    }
    else {
      $("input[name=faq_back_to_top]").attr("disabled", "disabled");
      $("input[name=faq_qa_mark]").attr("disabled", "disabled");
      $("input[name=faq_question_label]").attr("disabled", "disabled");
      $("input[name=faq_answer_label]").attr("disabled", "disabled");
    }

    // Enable / disable "hide_answer" only settings.
    if ($("input[name=faq_display]:checked").val() != "hide_answer") {
      $("input[name=faq_hide_qa_accordion]").attr("disabled", "disabled");
    }
    else {
      $("input[name=faq_hide_qa_accordion]").removeAttr("disabled");
    }

    // Enable / disable "new_page" only settings.
    if ($("input[name=faq_display]:checked").val() != "new_page") {
      $("input[name=faq_use_teaser]").removeAttr("disabled");
      $("input[name=faq_more_link]").removeAttr("disabled");
      $("input[name=faq_disable_node_links]").removeAttr("disabled");
    }
    else {
      $("input[name=faq_use_teaser]").attr("disabled", "disabled");
      $("input[name=faq_more_link]").attr("disabled", "disabled");
      $("input[name=faq_disable_node_links]").attr("disabled", "disabled");
    }
    teaser_handler(event);

    // Enable / disable "new_page" and "questions_top" only settings.
    if ($("input[name=faq_display]:checked").val() == "new_page" ||
      $("input[name=faq_display]:checked").val() == "questions_top") {
      $("select[name=faq_question_listing]").removeAttr("disabled");
    }
    else {
      $("select[name=faq_question_listing]").attr("disabled", "disabled");
    }

  }

  function qa_mark_handler(event) {
    if ($("input[name=faq_display]:checked").val() == "questions_inline") {
      // Enable / disable label settings according to "qa_mark" setting.
      if ($("input[name=faq_qa_mark]:checked").val() == 1) {
        $("input[name=faq_question_label]").removeAttr("disabled");
        $("input[name=faq_answer_label]").removeAttr("disabled");
      }
      else {
        $("input[name=faq_question_label]").attr("disabled", "disabled");
        $("input[name=faq_answer_label]").attr("disabled", "disabled");
      }
    }
  }

  function questions_top_handler(event) {
    $("input[name=faq_display]").val() == "questions_top" ?
      $("input[name=faq_group_questions_top]").removeAttr("disabled"):
      $("input[name=faq_group_questions_top]").attr("disabled", "disabled");

    $("input[name=faq_display]").val() == "questions_top" ?
      $("input[name=faq_answer_category_name]").removeAttr("disabled"):
      $("input[name=faq_answer_category_name]").attr("disabled", "disabled");
  }


  function child_term_handler(event) {
    if ($("input[name=faq_hide_child_terms]:checked").val() == 1) {
      $("input[name=faq_show_term_page_children]").attr("disabled", "disabled");
    }
    else if ($("input[name=faq_category_display]:checked").val() != "categories_inline") {
      $("input[name=faq_show_term_page_children]").removeAttr("disabled");
    }
  }


  function categories_handler(event) {
    if ($("input[name=faq_display]").val() == "questions_top") {
      $("input[name=faq_category_display]:checked").val() == "categories_inline" ?
        $("input[name=faq_group_questions_top]").removeAttr("disabled"):
        $("input[name=faq_group_questions_top]").attr("disabled", "disabled");
      $("input[name=faq_category_display]:checked").val() == "new_page" ?
        $("input[name=faq_answer_category_name]").attr("disabled", "disabled"):
        $("input[name=faq_answer_category_name]").removeAttr("disabled");
    }
    else {
      $("input[name=faq_group_questions_top]").attr("disabled", "disabled");
    }

    // Enable / disable "hide_qa" only settings.
    if ($("input[name=faq_category_display]:checked").val() != "hide_qa") {
      $("input[name=faq_category_hide_qa_accordion]").attr("disabled", "disabled");
    }
    else {
      $("input[name=faq_category_hide_qa_accordion]").removeAttr("disabled");
    }

    $("input[name=faq_category_display]:checked").val() == "categories_inline" ?
      $("input[name=faq_hide_child_terms]").attr("disabled", "disabled"):
      $("input[name=faq_hide_child_terms]").removeAttr("disabled");
    $("input[name=faq_category_display]:checked").val() == "categories_inline" ?
      $("input[name=faq_show_term_page_children]").attr("disabled", "disabled"):
      $("input[name=faq_show_term_page_children]").removeAttr("disabled");
    $("input[name=faq_category_display]:checked").val() == "new_page" ?
      $("select[name=faq_category_listing]").removeAttr("disabled"):
      $("select[name=faq_category_listing]").attr("disabled", "disabled");

    child_term_handler();
  }

  Drupal.behaviors.initFaqModule = {
    attach: function (context) {
      // Hide/show answer for a question.
      var faq_hide_qa_accordion = Drupal.settings.faq.faq_hide_qa_accordion;
      $('div.faq-dd-hide-answer', context).addClass("collapsible collapsed");

      if (!faq_hide_qa_accordion) {
        $('div.faq-dd-hide-answer:not(.faq-processed)', context).addClass('faq-processed').hide();
      }
      $('div.faq-dt-hide-answer:not(.faq-processed)', context).addClass('faq-processed').click(function() {
        if (faq_hide_qa_accordion) {
          $('div.faq-dt-hide-answer').not($(this)).removeClass('faq-qa-visible');
        }
        $(this).toggleClass('faq-qa-visible');
        $(this).parent().addClass('faq-viewed');
        $('div.faq-dd-hide-answer').not($(this).next('div.faq-dd-hide-answer')).addClass("collapsed");
        if (!faq_hide_qa_accordion) {
          $(this).next('div.faq-dd-hide-answer').slideToggle('fast', function() {
            $(this).parent().toggleClass('expanded');
          });
        }
        $(this).next('div.faq-dd-hide-answer').toggleClass("collapsed");

        // Change the fragment, too, for permalink/bookmark.
        // To keep the current page from scrolling, refs
        // http://stackoverflow.com/questions/1489624/modifying-document-location-hash-without-page-scrolling/1489802#1489802
        var hash = $(this).find('a').attr('id');
        var fx, node = $('#' + hash);
        if (node.length) {
          fx = $('<div></div>')
            .css({position: 'absolute', visibility: 'hidden', top: $(window).scrollTop() + 'px'})
            .attr('id', hash)
            .appendTo(document.body);
          node.attr('id', '');
        }
        document.location.hash = hash;
        if (node.length) {
          fx.remove();
          node.attr('id', hash);
        }

        // Scroll the page if the collapsed FAQ is not visible.
        // If we have the toolbar so the title may be hidden by the bar.
        var mainScrollTop = Math.max($('html', context).scrollTop(), $('body', context).scrollTop());
        // We compute mainScrollTop because the behaviour is different on FF, IE and CR
        if (mainScrollTop > $(this).offset().top) {
          $('html, body', context).animate({
            scrollTop: $(this).offset().top
          }, 1);
        }
        
        return false;
      });

      // Show any question identified by a fragment
      if (/^#\w+$/.test(document.location.hash)) {
        $('div.faq-dt-hide-answer ' + document.location.hash).parents('.faq-dt-hide-answer').triggerHandler('click');
      }

      // Hide/show q/a for a category.
      var faq_category_hide_qa_accordion = Drupal.settings.faq.faq_category_hide_qa_accordion;
      $('div.faq-qa-hide', context).addClass("collapsible collapsed");
      if (!faq_category_hide_qa_accordion) {
        $('div.faq-qa-hide', context).hide();
      }
      $('div.faq-qa-header .faq-header:not(.faq-processed)', context).addClass('faq-processed').click(function() {
        if (faq_category_hide_qa_accordion) {
          $('div.faq-qa-header .faq-header').not($(this)).removeClass('faq-category-qa-visible');
        }
        $(this).toggleClass('faq-category-qa-visible');
        $('div.faq-qa-hide').not($(this).parent().next('div.faq-qa-hide')).addClass("collapsed");
        if (!faq_category_hide_qa_accordion) {
          $(this).parent().next('div.faq-qa-hide').slideToggle('fast', function() {
            $(this).parent().toggleClass('expanded');
          });
        }
        $(this).parent().next('div.faq-qa-hide').toggleClass("collapsed");

        // Scroll the page if the collapsed FAQ is not visible.
        // If we have the toolbar so the title may be hidden by the bar.
        var mainScrollTop = Math.max($('html', context).scrollTop(), $('body', context).scrollTop());
        // We compute mainScrollTop because the behaviour is different on FF, IE and CR
        if (mainScrollTop > $(this).offset().top) {
          $('html, body', context).animate({
            scrollTop: $(this).offset().top
          }, 1);
        }
        
        return false;
      });


      // Show expand all link.
      if (!faq_hide_qa_accordion && !faq_category_hide_qa_accordion) {
        $('#faq-expand-all', context).show();
        $('#faq-expand-all a.faq-expand-all-link', context).show();

        // Add collapse link click event.
        $('#faq-expand-all a.faq-collapse-all-link:not(.faq-processed)', context).addClass('faq-processed').click(function () {
          $(this).hide();
          $('#faq-expand-all a.faq-expand-all-link').show();
          $('div.faq-qa-hide').slideUp('slow', function() {
            $(this).removeClass('expanded');
          });
          $('div.faq-dd-hide-answer').slideUp('slow', function() {
            $(this).removeClass('expanded');
          });
        });

        // Add expand link click event.
        $('#faq-expand-all a.faq-expand-all-link:not(.faq-processed)', context).addClass('faq-processed').click(function () {
          $(this).hide();
          $('#faq-expand-all a.faq-collapse-all-link').show();
          $('div.faq-qa-hide').slideDown('slow', function() {
            $(this).addClass('expanded');
          });
          $('div.faq-dd-hide-answer').slideDown('slow', function() {
            $(this).addClass('expanded');
          });
        });
      }



      // Handle faq_category_settings_form.
      faq_display_handler();
      questions_top_handler();
      categories_handler();
      teaser_handler();
      $("input[name=faq_display]:not(.faq-processed)", context).addClass('faq-processed').bind("click", faq_display_handler);
      $("input[name=faq_qa_mark]:not(.faq-processed)", context).addClass('faq-processed').bind("click", qa_mark_handler);
      $("input[name=faq_use_teaser]:not(.faq-processed)", context).addClass('faq-processed').bind("click", teaser_handler);
      $("input[name=faq_category_display]:not(.faq-processed)", context).addClass('faq-processed').bind("click", categories_handler);
      $("input[name=faq_hide_child_terms]:not(.faq-processed)", context).addClass('faq-processed').bind("click", child_term_handler);
    }
  }
})(jQuery);
;
(function ($) {

/**
 * Toggle the visibility of a fieldset using smooth animations.
 */
Drupal.toggleFieldset = function (fieldset) {
  var $fieldset = $(fieldset);
  if ($fieldset.is('.collapsed')) {
    var $content = $('> .fieldset-wrapper', fieldset).hide();
    $fieldset
      .removeClass('collapsed')
      .trigger({ type: 'collapsed', value: false })
      .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Hide'));
    $content.slideDown({
      duration: 'fast',
      easing: 'linear',
      complete: function () {
        Drupal.collapseScrollIntoView(fieldset);
        fieldset.animating = false;
      },
      step: function () {
        // Scroll the fieldset into view.
        Drupal.collapseScrollIntoView(fieldset);
      }
    });
  }
  else {
    $fieldset.trigger({ type: 'collapsed', value: true });
    $('> .fieldset-wrapper', fieldset).slideUp('fast', function () {
      $fieldset
        .addClass('collapsed')
        .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Show'));
      fieldset.animating = false;
    });
  }
};

/**
 * Scroll a given fieldset into view as much as possible.
 */
Drupal.collapseScrollIntoView = function (node) {
  var h = document.documentElement.clientHeight || document.body.clientHeight || 0;
  var offset = document.documentElement.scrollTop || document.body.scrollTop || 0;
  var posY = $(node).offset().top;
  var fudge = 55;
  if (posY + node.offsetHeight + fudge > h + offset) {
    if (node.offsetHeight > h) {
      window.scrollTo(0, posY);
    }
    else {
      window.scrollTo(0, posY + node.offsetHeight - h + fudge);
    }
  }
};

Drupal.behaviors.collapse = {
  attach: function (context, settings) {
    $('fieldset.collapsible', context).once('collapse', function () {
      var $fieldset = $(this);
      // Expand fieldset if there are errors inside, or if it contains an
      // element that is targeted by the uri fragment identifier. 
      var anchor = location.hash && location.hash != '#' ? ', ' + location.hash : '';
      if ($('.error' + anchor, $fieldset).length) {
        $fieldset.removeClass('collapsed');
      }

      var summary = $('<span class="summary"></span>');
      $fieldset.
        bind('summaryUpdated', function () {
          var text = $.trim($fieldset.drupalGetSummary());
          summary.html(text ? ' (' + text + ')' : '');
        })
        .trigger('summaryUpdated');

      // Turn the legend into a clickable link, but retain span.fieldset-legend
      // for CSS positioning.
      var $legend = $('> legend .fieldset-legend', this);

      $('<span class="fieldset-legend-prefix element-invisible"></span>')
        .append($fieldset.hasClass('collapsed') ? Drupal.t('Show') : Drupal.t('Hide'))
        .prependTo($legend)
        .after(' ');

      // .wrapInner() does not retain bound events.
      var $link = $('<a class="fieldset-title" href="#"></a>')
        .prepend($legend.contents())
        .appendTo($legend)
        .click(function () {
          var fieldset = $fieldset.get(0);
          // Don't animate multiple times.
          if (!fieldset.animating) {
            fieldset.animating = true;
            Drupal.toggleFieldset(fieldset);
          }
          return false;
        });

      $legend.append(summary);
    });
  }
};

})(jQuery);
;
