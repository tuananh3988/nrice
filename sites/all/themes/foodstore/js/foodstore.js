(function ($) {
  $(document).ready(function() {
    $('#block-system-main-menu ul').superfish({
      // Apply a generic hover class.
      hoverClass: 'over',
      // Disable generation of arrow mark-up.
      autoArrows: false,
      // Disable drop shadows.
      dropShadows: false,
      // Mouse delay.
      delay: 500,
      // Animation speed.
      speed: 300
    // Add in Brandon Aaron�s bgIframe plugin for IE select issues.
    // http://plugins.jquery.com/node/46/release
    }).find('ul').bgIframe({opacity:false});    
    
    var current_time = new Date();
	var today = current_time.getDay();
	var day_id_array = new Array();
	day_id_array[0] = 'page-thuc-don-30';
	day_id_array[1] = 'page-thuc-don-24';
	day_id_array[2] = 'page-thuc-don-25';
	day_id_array[3] = 'page-thuc-don-26';
	day_id_array[4] = 'page-thuc-don-27';
	day_id_array[5] = 'page-thuc-don-28';
	day_id_array[6] = 'page-thuc-don-29';
	
	// Hide the "buy" button if user view category at not today
	if (!$('body').hasClass(day_id_array[today])) {
		for (i in day_id_array) {
			if ($('body').hasClass(day_id_array[i])) {
				$('body.' + day_id_array[i] + ' .views-field-buyitnowbutton').css('display', 'none');
				break;
			}
		}
	}
	
	// Hide the "buy" button if user view product at not today
	if ($('body').hasClass('node-type-product')) {
		var week = new Array();
		week[0] = 'Chủ Nhật';
		week[1] = 'Thứ Hai';
		week[2] = 'Thứ Ba';
		week[3] = 'Thứ Tư';
		week[4] = 'Thứ Năm';
		week[5] = 'Thứ Sáu';
		week[6] = 'Thứ Bảy';
		$('.field-name-field-week-menu div.field-item').each(function(){
			if ($(this).html() == week[today]) {
				$('body.node-type-product .add-to-cart').css('display', 'block');
				return false;
			}
			else {
				$('body.node-type-product .add-to-cart').css('display', 'none');
			}
		});
	}
	
    //var current_date = current_time.getFullYear() + '' + pad(current_time.getMonth()+1, 2) + '' + pad(current_time.getDate(), 2);
	//$('a[href*="/thuc-don/"]').each(function() {
	//  $(this).attr('href', $(this).attr('href') + '/' + current_date);
	//});
  });
})(jQuery);

function pad(number, length) {   
  var str = '' + number;
  while (str.length < length) {
    str = '0' + str;
  }   
  return str;
}