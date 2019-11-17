// init wow js
new WOW({
  offset: 100
}).init();

// main slider
var slider_for = $(".slider_for");
var slider_nav = $(".slider_nav");

if (slider_nav.length && slider_for.length) {
  $(slider_for).slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    asNavFor: slider_nav,
    fade: true,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
    touchThreshold: 100
  });
  $(slider_nav).slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: slider_for,
    vertical: true,
    speed: 1000,
    nextArrow: slider_nav.closest(".main_slider_section").find(".slick_next"),
    prevArrow: slider_nav.closest(".main_slider_section").find(".slick_prev")
  });
}
// end main slider

// products page sliders
var sliders = $(".products_block .slider");

if (sliders.length) {
  sliders.each(function() {
    var slider = $(this);
    slider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: slider.parent().find(".slick_next"),
      prevArrow: slider.parent().find(".slick_prev")
    });
  });
}
// end products page sliders

// client slider
var partnersSlider = $(".partners_slider");

if (partnersSlider.length) {
  $(partnersSlider).each(function() {
    var slider = $(this);

    slider.slick({
      slidesToShow: 1,
      autoplay: false,
      rows: 3,
      slidesPerRow: 3,
      nextArrow: slider.closest(".partners_section").find(".slick_next"),
      prevArrow: slider.closest(".partners_section").find(".slick_prev"),
      speed: 900,
      responsive: [
        {
          breakpoint: 576,
          settings: {
            slidesPerRow: 2
          }
        }
      ]
    });
  });
}

// menu
function fixedMenu() {
  var topBar = $(".topbar");
  var menuNavbar = $(".menu_navbar");

  if (topBar.length && window.innerWidth > 767) {
    var outHeight = topBar.outerHeight();
    menuNavbar.css("top", outHeight);

    if (window.scrollY >= 50) {
      menuNavbar.addClass("fixed_top");
    } else {
      menuNavbar.removeClass("fixed_top");
    }
  } else {
    if (window.scrollY >= 0) {
      menuNavbar.addClass("fixed_top");
    } else {
      menuNavbar.removeClass("fixed_top");
    }
  }
}
$(document).ready(function() {
  fixedMenu();
});

$(window)
  .scroll(function() {
    fixedMenu();
  })
  .resize(function() {
    fixedMenu();
  });
// end menu

// menu humburger button amination handler
$("#nav-icon3").on("click", function(e) {
  var button = $(this);
  // button.toggleClass("open");
  var target = $(button.data("target"));

  if (!target.hasClass("show")) {
    button.addClass("open");
    button.closest(".menu_navbar").addClass("opened_menu");
  } else {
    button.removeClass("open");
    button.closest(".menu_navbar").removeClass("opened_menu");
  }
});
// end menu humburger button amination handler

// map
(function($) {
  var map;

  $(".google_map").each(function(index, element) {
    var main_lato = Number($(this).attr("data-lat"));
    var main_longo = Number($(this).attr("data-long"));
    var main_texto = $(this).attr("data-desc");
    var icon = {
      url: "./soprano-source/images/Group299.png",
      size: new google.maps.Size(28, 38),
      scaledSize: new google.maps.Size(28, 38),
      labelOrigin: new google.maps.Point(20, -20)
    };

    map = new GMaps({
      el: element,
      scrollwheel: false,
      lat: main_lato,
      lng: main_longo,
      zoom: 6
    });

    map.addMarker({
      lat: main_lato,
      lng: main_longo,
      infoWindow: {
        content: main_texto
      }
    });
    map.setCenter(main_lato, main_longo);
  });

  $(".footer_cont .column").each(function() {
    var loc = $(this);
    var header = loc.find(".first");
    var lato = Number(loc.attr("data-lat"));
    var longo = Number(loc.attr("data-long"));
    var content = this.innerHTML;

    var marker = map.addMarker({
      lat: lato,
      lng: longo,
      infoWindow: {
        content: content
      },
      mouseover: function() {
        this.infoWindow.open(map, this);
      },
      mouseout: function() {
        this.infoWindow.close();
      }
    });

    header.on("click", function() {
      map.markers.forEach(function(mk) {
        mk.infoWindow.close();
      });
      map.setCenter(lato, longo);
      marker.infoWindow.open(map, marker);

      // scroll to map
      var top = $(map.el).offset().top;
      $("body,html").animate({ scrollTop: top - 50 }, 500);
    });
  });
})(jQuery);
// end map

$(".modal").on("shown.bs.modal", function(e) {
  var blur = $(".blur");
  blur.addClass("active");
});

$(".modal").on("hidden.bs.modal", function(e) {
  var blur = $(".blur");
  blur.removeClass("active");
});
