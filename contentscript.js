// Code by niyazpk
// https://github.com/niyazpk/Collapsible-comments-for-Hacker-News

var current_level_width = 0;
var inner_level_width = 1000;

var span_html = '<span style="cursor:pointer;margin-left:10px;" class="expand-handle">[-]</span>';
if (window.location.href.indexOf('item?id=') != -1) {
  $('center > table > tbody > tr:eq(2) > td > table:eq(1) span.comhead').append(span_html);
} else if (window.location.href.indexOf('threads?id=') != -1) {
  $('center > table > tbody > tr > td > table span.comhead').append(span_html);
}

$('.expand-handle').live('click',
function() {
  current_level_width = $(this).parents('tr').eq(0).find('td > img').attr('width');
  $(this).parents('table').eq(0).parents('tr').eq(0).nextAll().each(function(index, el) {
    if ($('tbody > tr > td > img', this).attr('width') > current_level_width) {
      if ($('tbody > tr > td > img', this).attr('width') <= inner_level_width) {
        inner_level_width = 1000;
        $(this).hide();
      }
      if (inner_level_width == 1000 && $('.comment', this).css('display') == 'none') {
        inner_level_width = $('tbody > tr > td > img', this).attr('width');
      }
    } else {
      return false;
    }
  });
  inner_level_width = 1000;
  $(this).text('[+]').addClass('expand-handle-collapsed').removeClass('expand-handle');
  $(this).closest('div').nextAll().hide();
  $(this).closest('div').parent().prev().hide();
  $(this).closest('div').css({
    'margin-left': '18px',
    'margin-bottom': '5px'
  });
});
$('.expand-handle-collapsed').live('click',
function() {
  current_level_width = $(this).parents('tr').eq(0).find('td > img').attr('width');
  $(this).parents('table').eq(0).parents('tr').eq(0).nextAll().each(function(index, el) {
    if ($('tbody > tr > td > img', this).attr('width') > current_level_width) {
      if ($('tbody > tr > td > img', this).attr('width') <= inner_level_width) {
        inner_level_width = 1000;
        $(this).show();
      }
      if (inner_level_width == 1000 && $('.comment', this).css('display') == 'none') {
        inner_level_width = $('tbody > tr > td > img', this).attr('width');
      }
    } else {
      return false;
    }
  });
  inner_level_width = 1000;
  $(this).text('[-]').addClass('expand-handle').removeClass('expand-handle-collapsed');
  $(this).closest('div').nextAll().show();
  $(this).closest('div').parent().prev().show();
  $(this).closest('div').css({
    'margin-left': '0',
    'margin-bottom': '-10px'
  });
});
