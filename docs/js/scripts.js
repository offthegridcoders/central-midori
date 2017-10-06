// Slider Init
jQuery(function($) {$('.slider').sss({
  slideShow : true
});});

function tradeShowNotify(){
  notif({
    type: "info",
    msg: "<p>We are attending a trade show Oct 15th, 2017<br/>Click <a href='#'>here</a> for more information.</a></p>",
    width: 500,
    height: 100,
    position: "bottom",
    autohide: false
  });
}
