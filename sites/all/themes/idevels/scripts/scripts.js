$(function () {

  function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
  }

  function readCookie(name) {
      var nameEQ = escape(name) + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) === ' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) === 0) return unescape(c.substring(nameEQ.length, c.length));
      }
      return null;
  }

  function eraseCookie(name) {
      createCookie(name, "", -1);
  }

  hideNonLine($('.user-front .view-Users-front-profiles .views-row'));


  // For right question block
  /*$('.view-question .views-row').each(function () {
    $('> .views-field-title, > .views-field-created-1', this).wrapAll('<div class="question-lastposts-content"></div>');
  });
  $('.view-question .question-lastposts-content').prepend("<div class='buckle-up'></div>");
  $('.view-question .question-lastposts-content').prepend("<div class='buckle-down'></div>");*/
//$('.view-question .view-content > .views-row').wrap('<div class="question-lastposts-content"></div>');
  $('#block-menu-secondary-links .menu li a').each(function () {
    $(this).wrapInner('<span class="tile-title"></span>');
  });

  // Delete background from user link in primary menu.
  $('.button').each(function (e) {
    $(this).mousedown(function () {
      $(this).addClass('active');
    });
    $(this).mouseup(function () {
      $(this).removeClass('active');
    });
    $(this).hover(function () {
    }, function () {
      $(this).removeClass('active');
    });
  });
  $('.steps .step1 br').remove();
  var text = Drupal.t('Menu');
  $('#block-menu-primary-links ul.menu').after('<a href="#" id="pull">' + text + '</a>');

  // For expand primary menu on mobile.
  var pull = $('#pull');
  var menu = $('#block-menu-primary-links ul.menu');
  $('#pull').click(function (e) {
//    e.preventDefault();
    menu.toggle();
  });

  // Move logo to top on mobile devices.
  if ($(window).width() < 801 && $(window).width() > 480) {
    $('#header_banner').prepend($('#wrap_branding'));
  }
  if ($(window).width() < 480) {
    $('#wrap_branding').after($('#header_banner'));
  }


  // On resize.
  $(window).resize(function () {
    $('.user-front .view-users-front .views-row').each(function () {
      $(this).show();
    });
    hideNonLine($('.user-front .view-Users-front-profiles .views-row'));

    // Display menu after resize.
    var w = $(window).width();
    if (w > 479 && menu.is(':hidden')) {
      menu.removeAttr('style');
    }
    if ($(window).width() < 480) {
      $('#wrap_branding').after($('#header_banner'));
    }
    if ($(window).width() < 800 && $(window).width() > 480) {
      $('#header_banner').prepend($('#wrap_branding'));
    }
    if ($(window).width() > 800) {
      $('#header_banner').after($('#wrap_branding'));
    }
  });

  // Random sort elements in Tags views (front page), and hide other 20 elements.
  var tags = $('.view-tegs-front .view-content'),
    tagsrow = tags.children('.views-row').get();

  tagsrow.sort(function(){
    return Math.random()*10 > 5 ? 1 : -1;
  });

  $.each(tagsrow, function(idx, itm) { tags.append(itm); });
  var count = $('.view-tegs-front .view-content .views-row').length;
  count = count -19;
  $('.view-tegs-front .view-content .views-row').slice(-count).hide();

  // Change orientation on mobile device.
  $(window).bind("orientationchange", orientationChange);
  function orientationChange() {
    //whatever needs to happen when it changes.
    $('.user-front .view-users-front .views-row').each(function () {
      $(this).show();
    });

    hideNonLine($('.user-front .view-Users-front-profiles .views-row'));
  }

// Function for remove non line elements in "$('.user-front .view-users-front .views-row')".
  function hideNonLine(obj) {

    var listRow = 0;
    var firstRow = 0;
    var row = 1;
    obj.each(function (i) {
      if ($(this).prev().length > 0) {
        if ($(this).position().top != $(this).prev().position().top) {
          if (row == 1) {
            firstRow = listRow;
          }
          row++;
          listRow = 1;
        } else {
          listRow++;
        }
      }
      else {
        listRow++;
      }
    });
    var count = firstRow*3;
    count = obj.length - count;

    if (row > 3) {
      obj.slice(-count).hide();
    }
  }

  // Function for hide file donwnload field in add resources page if it not book

  $( "#edit-taxonomy-12" ).change(function(){
    if (window.location.pathname != '/node/add/resource')
      return;
    $this = $(this);
    if ($this.val() == 2491) {
      $( ".link-field-subrow" ).hide();
      $( ".filefield-element" ).show();
      $( "#edit-field-book-autor-0-value-wrapper" ).show();
    }
    else {
      $( ".link-field-subrow" ).show();
      $( "#edit-field-book-0-upload-wrapper" ).hide();
      $( "#edit-field-book-autor-0-value-wrapper" ).hide();
    }
  });

  // Decorate popup on click

  $( ".ctools-use-modal" ).click(function() {
    setTimeout(function(){
      modalFormDecorator();
    },1000);
  });
// Right block user avatar.
  $('#image-link').click(function (e) {
    e.preventDefault();
    $('#avatar-profile-form #edit-file').trigger('click');
  });
  $('#avatar-profile-form #edit-file').change(function () {
    $('#edit-submit').attr('disabled', 'disabled');
    $('#avatar-profile-form .form-submit').trigger('click');
  });
  // Page change password.
  $('#drua-profile-change-password input.required').attr('required', 'true');
  // Page profile sites remove button.
  var i = 0;
  $('.group-contacts #field_personal_website_values tbody tr .row-remove div').click(function (e) {
    $(this).parent().parent().remove();
    $('.group-contacts #field_personal_website_values tbody tr').each(function () {
      $(this).find('div.form-item').attr('id', 'edit-field-personal-website-' + i + '-value-wrapper');
      $(this).find('div.form-item input').attr('name', 'field_personal_website[' + i + '][value]')
        .attr('id', 'edit-field-personal-website-' + i + '-value');
      i++;
    });
    i = 0;
  });
  $(document).ajaxStop(function () {
    $('.group-contacts #field_personal_website_values tbody tr .row-remove div').click(function (e) {
      $(this).parent().parent().remove();
      $('.group-contacts #field_personal_website_values tbody tr').each(function () {
        $(this).find('div.form-item').attr('id', 'edit-field-personal-website-' + i + '-value-wrapper');
        $(this).find('div.form-item input').attr('name', 'field_personal_website[' + i + '][value]')
          .attr('id', 'edit-field-personal-website-' + i + '-value');
        i++;
      });
      i = 0;
    });
  });
  $('#edit-field-location-0-city-wrapper input').attr('maxlength', 100);
  $('#edit-field-profile-company-0-value-wrapper input').attr('maxlength', 100);
  $('#edit-field-job-title-0-value-wrapper input').attr('maxlength', 100);

  if ($('#edit-pass-pass1').length) {
    $('#edit-pass-pass1').attr('placeholder', Drupal.t('Password'));
    $('#edit-pass-pass2').attr('placeholder', Drupal.t('Confirm password'));
  }

  // Rewrite autocoplit submit function for event page

  if ($("body").hasClass("page-events")) {
    Drupal.ACDB.prototype.search = function (searchString) {
      var db = this;
      this.searchString = searchString;

      // See if this key has been searched for before
      if (this.cache[searchString]) {
        return this.owner.found(this.cache[searchString]);
      }

      // Initiate delayed search
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(function() {
        db.owner.setStatus('begin');

        // Ajax GET request for autocompletion
        $.ajax({
          type: "GET",
          // There I add "event" to GET qecuest
          url: db.uri +'/'+ Drupal.encodeURIComponent(searchString) + '/event',
          dataType: 'json',
          success: function (matches) {
            if (typeof matches['status'] == 'undefined' || matches['status'] != 0) {
              db.cache[searchString] = matches;
              // Verify if these are still the matches the user wants to see
              if (db.searchString == searchString) {
                db.owner.found(matches);
              }
              db.owner.setStatus('found');
            }
          },
          error: function (xmlhttp) {
            alert(Drupal.ahahError(xmlhttp, db.uri));
          }
        });
      }, this.delay);
    };
  };

  $(".vud-widget-upanddown").each(function(){
    $(this).parent().parent().find('.meta-links > .meta').after($(this));
  });

  if ($('#events-node-form.future-event').length || $('#events-node-form.present-event').length) {
    // decorate teaser
    var $teaser = $("#edit-field-new-teaser-0-value");
    /*var $body = $("#cke_edit-body body");*/
    var $body = $("#edit-body");
    var $end_date = $("#edit-field-event-date-0-value2-datepicker-popup-0");
    var $start_date = $("#edit-field-event-date-0-value-datepicker-popup-0");

    $("#edit-body-wrapper > label").html(Drupal.t("Event description")+': '+'<span class="form-required">*</span>'+' ');

    $teaser_errors = $('<span class="textarea-errors"></span>');
    $teaser.before($teaser_errors);

    // check teaser text length
    function check_teaser() {
      if ($teaser.val().length < 100) {
        $teaser_errors.text(Drupal.t("Teaser can't be less than 100 characters"));
        $("html, body").animate({scrollTop: $teaser.offset().top-20 }, 500);
        return false;
      }
      else {
        $teaser_errors.text('');
        return true;
      }
    }

    $teaser.change(check_teaser);

    $body_errors = $('<span class="textarea-errors"></span>');
    $("#edit-body").before($body_errors);

    // check body text length
    function check_body() {
/*      if ($body.val().length < 300) {*/
/*      if (CKEDITOR.instances['edit-body'].getData().length < 300) {
        $body_errors.text(Drupal.t("Event discripton can't be less than 300 characters"));
        $("html, body").animate({scrollTop: $body.offset().top-20 }, 500);
        return false;
      }*/
      if ($body.val().length < 300) {
        $body_errors.text(Drupal.t("Event discripton can't be less than 300 characters"));
        $("html, body").animate({scrollTop: $body.offset().top-20 }, 500);
        return false;
      }
      else {
        $body_errors.text('');
        return true;
      }
    }

    $body.change(check_body);

    var i_check_date = 0;

    // check if date are correct
    function check_date() {
      if ($start_date.val() === '') {
        alert(Drupal.t("Start date can't be empty"));
        $("html, body").animate({scrollTop: $start_date.offset().top-20 }, 500);
        i_check_date = 1;
        return false;
      }
      else if ($end_date.val() === '' && i_check_date > 0) {
        alert(Drupal.t("End date can't be empty"));
        $("html, body").animate({scrollTop: $end_date.offset().top-20 }, 500);
        return false;
      }
      else {
        var arr_start_date = $start_date.val().split("/");
        var arr_end_date = $end_date.val().split("/");
        if (parseInt(arr_start_date[0]*31,10)+parseInt(arr_start_date[1],10)+parseInt(arr_start_date[2]*366,10) > parseInt(arr_end_date[0]*31,10)+parseInt(arr_end_date[1],10)+parseInt(arr_end_date[2]*366,10)) {
          alert(Drupal.t("Start date can't be after end date"));
          return false;
        }
      }
      return true;
    }

    $start_date.change(check_date);
    $end_date.change(check_date);

    // check date, teaser, body date before submit
    $("#main-content form").submit(function(e){
      if (check_date() && check_teaser() && check_body()) {
        return true;
      }
      return false;
    });

    $("#main-content form .admin+input+input").after('<a href="/events" id="all-events">'+Drupal.t('Back to all events')+' -></a>');

    // var section
    var $city_input = $('#edit-field-city-value');
    var $address_input = $('#edit-field-address-0-value');
    var $mapdiv = $('<div id="map"></div>');
    var $show_on_map = $('<input type="checkbox" id="show_on_map"><span>'+Drupal.t('Event on map')+'</span></input>');
    var $lan = $('#edit-field-latitude-0-value');
    var $lng = $('#edit-field-longitude-0-value');
    var $zoom = $('#edit-field-zoom-0-value');
    $("#edit-field-address-0-value-wrapper").after($mapdiv);
    $mapdiv.hide();
    $("#edit-field-address-0-value-wrapper").after($show_on_map);
    $show_on_map.wrapAll("<div/>");

    var geocoder = new google.maps.Geocoder();

    // onmapchange
    $show_on_map.change(function() {
      if(this.checked) {
        var address = $city_input.val() + ' ' + $address_input.val();
        $mapdiv.width(300).height(300);
        $mapdiv.show();
        initialize();
        geocoder.geocode( { 'address': address}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location); // set the map region to center
            marker.setPosition(results[0].geometry.location); // change the marker position
            $lan.val(results[0].geometry.location['k']);
            $lng.val(results[0].geometry.location['D']);
          } else {
            alert(Drupal.t('Geocode was not successful for the following reason')+': ' + status);
          }
        });
      }
      else {
        $mapdiv.hide();
      }
    });

    // initialize googlemap
    var map;
    function initialize() {
      var lan = 50.71441902633967;
      var lng = 25.317786984069812;
      $zoom.val(12);
      var myLatlng = new google.maps.LatLng(lan,lng);
      var mapOptions = {
        zoom: 12,
        center: myLatlng
      };
      map = new google.maps.Map(document.getElementById('map'), mapOptions);
      marker = new google.maps.Marker({
        map: map, // refer to the map you've just initialise
        position: myLatlng, // set the marker position (is based on latitude & longitude)
        draggable: true // allow user to drag the marker
      });

      google.maps.event.addListener(marker, 'dragend', function() {
          // it will run this only if user DROP the marker down (drag end)
          var position = marker.getPosition();
          // set the position value to text boxes
          $lan.val(position.lat());
          $lng.val(position.lng());
      });

      google.maps.event.addListener(map, 'zoom_changed', function() {
        $zoom.val(map.getZoom());
      });
    }

    // decorate price
    var $price = $('#edit-field-event-price-0-value');
    $price.val(Drupal.t('Free'));
    $price.hide();

    var arr = [
      {val : 0, text: Drupal.t('Free')},
      {val : 1, text: Drupal.t('Not Free')}
    ];

    var $sel = $('<select>');
    $(arr).each(function() {
      $sel.append($("<option>").attr('value',this.val).text(this.text));
    });
    $price.before($sel);

    $sel.change(function() {
      if (this.value===0) {
        $price.val(Drupal.t('Free'));
        $price.hide();
      }
      else {
        $price.val('');
        $price.show();
      }
    });

    // decorate logo
    var $img_prev = $('<img id="blah" class="img-prev" src="#" alt="your image" />');
    var $clear_img_prev = $('<input class="img-prev" type="button" value="" />');
    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          $img_prev.attr('src', e.target.result);
          $("#edit-field-events-logo-0-upload").before($img_prev);
          $("#edit-field-events-logo-0-upload").before($clear_img_prev);
          $(".img-prev").wrapAll('<div id="img-prev"></div>');
        };

        reader.readAsDataURL(input.files[0]);

        $clear_img_prev.click(function(event) {
          $img_prev.remove();
        });
      }
    }

    document.querySelector('body').addEventListener('change', function(event) {
      if (event.target.id == 'edit-field-events-logo-0-upload') {
        readURL(event.target);
      }
    });
  }

  // Page Add event report
  if ($('#events-node-form.past-event').length) {

    $('input[id^=edit-field-photos][id$=upload]').attr('title', Drupal.t('Allowed file extensions: png, gif, jpg, jpeg'));

    // fix double empty image fields bug
    if ($('#field_photos_values tr:first-clild .form-file').val() === '' && !$('#field_photos_values tr:first-clild .widget-preview').length) {
      $('#field-photos-items').addClass('double-empty-fields-bug');
    };

    // Fix for hide plus. Add div over remove button.
    $('#right-block .filefield-element').live('mouseover', function(event){
      if (!$(this).find('.div-for-remove-plus').length) {
        $(this).find('input[id^="edit-field-photos"][id$="remove"]').before('<div class="div-for-remove-plus" style="position: absolute; right:0; top: 0; z-index: 77; height:15px; width:15px; cursor: pointer;"></div>');
      };
    });

    // Fix for hide plus. Add style to head.
    $('head').append('<style id="fix-for-remove-plus"></style>');

    // Fix for hide plus. Hide tr.
    $('.div-for-remove-plus').live('click', function(event) {
      $('style#fix-for-remove-plus').text($('style#fix-for-remove-plus').text()+'table#field_photos_values tbody tr:nth-child('+($(this).closest('tr').prevAll().length+1)+'){display: none !important;}');
      $(this).next().trigger('mousedown');
    });

    var $photos_block = $('#field-photos-items');
    var $videos_block_old = $('#field-videos-items');
    var $videos_block = $('<div id="videos-block"><label>'+Drupal.t('Videos')+'</label><div id="video-prew"><button id="add-video"></button></div></div>');
    var $overlay = $('<div id="overlay"><div id="add-video-pop-up"><label for="youtube-video">'+Drupal.t("Video link from YouTube or Vimeo")+'</label><div id="youtube-video"><input id="youtube-video-input" type="text"/><button id="video-added">'+Drupal.t("Add video")+'</button></div></div></div>');
    var $right_block = $('<div id="right-block"></div>');
    $("form#events-node-form.past-event div > div > div.standard").before($right_block);

    $('#edit-field-events-logo-0-ahah-wrapper').appendTo($right_block);
    $photos_block.appendTo($right_block);
    $videos_block.appendTo($right_block);

    // Add new photo (need jQuery 1.3)
    $('#field-photos-items .form-file').live('change', function(event){
      $( "#edit-field-photos-field-photos-add-more" ).trigger( "mousedown" );
    });

    function add_video_thumb(src, id) {
      $new_video_thumb = $('<div class="video-thumb"><img src="'+src+'" width=50 height=50 /><button class="delete-video-thumb" data-id="'+id+'"></button><div>');
      $('#video-prew > button').before($new_video_thumb);
    }

    function parseVideoURL(url, id) {
      var regstring = url.match(/(?:www\.)?(vimeo|youtube)\.com\/(?:watch\?v=)?(.*?)(?:\s|$|&)/);
      var provider = RegExp.$1;
      var vid = RegExp.$2;
      if (provider == 'youtube') {
        var src = "http://img.youtube.com/vi/"+vid+"/2.jpg";
        add_video_thumb(src, id);
      }
      else if (provider == 'vimeo') {
        $.getJSON('http://www.vimeo.com/api/v2/video/' + vid + '.json?callback=?', {format: "json"}, function(data) {
          add_video_thumb(data[0].thumbnail_small, id);
        });
      }
      else {
        console.log(url);
      }
    }

    // Fix bug with empty logo
    $('#edit-field-events-logo-0-upload').click(function(event) {
      return false;
    });

    // Add new video
    $('#add-video').click(function(event) {
      $overlay.appendTo($('body'));
      $('#add-video-pop-up input').attr('placeholder', Drupal.t('paste youtube or vimeo link there'));
      $('#video-added').click(function(event) {
        $('#field-videos-items tr:last-child input').val($('#youtube-video-input').val());
        $('#edit-field-videos-field-videos-add-more').trigger( "mousedown" );
        parseVideoURL($('#youtube-video-input').val(), $('#field-videos-items tr:last-child input').attr("id"));
        $('#youtube-video-input').val('');
        $overlay.remove();
      });
      $("body").keydown(function(event) {
        if (event.keyCode == 27) {
          $overlay.remove();
        }
      });
      return false;
    });

    // Inicial video parser
    $('#field-videos-items .form-item .form-text').each(function () {
      if ($(this).val() != '') {
        parseVideoURL($(this).val(), $(this).attr("id"));
      };
    });

    // delete video (need jQuery 1.3)
    $('.delete-video-thumb').live('mousedown', function(event){
      $( "#"+$(this).attr("data-id") ).parent().parent().find('input[type=checkbox]').attr('checked','checked');
      $(this).parent().remove();
    });

  }

  // hide event report
  $(".node-type-events .pane-field-report").hide();
  $(".node-type-events .pane-field-photos").hide();
  $(".node-type-events .pane-field-videos").hide();

  // if event not past disable link for view report
if ($(".node-type-events time.not-pastevent").length > 0) {
    $("#link-event-overview").hide();
    $("#add_event_report").hide();
  }
  // if event past hide I'll go button and change label for avatars
  else if ($(".node-type-events time.pastevent").length > 0) {
    $(".node-type-events .views-field-ops").hide();
    $(".view-id-Events.view-display-id-panel_pane_3 p").text(Drupal.t('Event ended'));
    if ($(".node-type-events .pane-field-report").text() &&  $(".node-type-events .pane-field-report").text().indexOf(Drupal.t('No information available yet')) < 0) {
      $("#add_event_report").text(Drupal.t('Edit report'));
    }
    if ($("#page-title+.tabs-wrapper a[href$='edit']").length > 0) {
      $("#add_event_report").attr("href", $("#page-title+.tabs-wrapper a[href$='edit']").attr('href'));
      $("#add_event_report").show();
    }
  }

  var destination_link = '/user/login?destination='+window.location.pathname;
  $(".not-logged-in.node-type-events .pane-events-panel-pane-2 .views-field-ops .field-content").html("<a href="+destination_link+">"+Drupal.t("I'll go there")+"<a/>");

  // on click hide event text and show event report
  $("#link-event-overview:not(.expanded)").click(function (e) {
    $(".node-type-events .pane-field-report").toggle();
    $(".node-type-events .pane-node-body").toggle();
    $(".node-type-events .pane-field-photos").toggle();
    $(".node-type-events .pane-field-videos").toggle();
    return false;
  });

  // IE hack for add image button
  if (navigator.userAgent.match(/msie/i) || navigator.userAgent.match(/trident/i) ){
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if ($.browser.msie  && parseInt($.browser.version, 10) < 11) {
      $('form#events-node-form.past-event #right-block input.form-file').before('<img class="form-file" style="position: absolute; background-color: #fff;" src="/sites/all/themes/idevels/images/answers/b_add.png">');
      $('form#events-node-form.past-event #right-block img.form-file').click(function(event) {
        $(this).parent().find('input.form-file').trigger('click');
      });
    }
  }

  // Remove spaces from block "drua_profile_count_users_who_will_go_to_event".
  $('.field-count-users .pane-content').text($.trim($('.field-count-users .pane-content').text()));

  if ($('.not-pastevent').length == 0) {
    // if this is not future event
    $('#div-register-for-event').remove();
  }
  else if ((Drupal.settings.are_user_register_for_event && Drupal.settings.are_user_register_for_event != 0) || readCookie('event_'+Drupal.settings.nid)) {
    // If user are alredy registred
    $('#register-for-event').text(Drupal.t('Thanks for registering'));
    $('#register-for-event').css('color','#FFF');
  };

  // Select neutral language and hide selectbox
  if (window.location.pathname == '/node/add/post' || window.location.pathname == '/groups/add/post') {
    $('select#edit-language').val($("select#edit-language option:first").val());
    $('#edit-language-wrapper').hide();
  };

  $('#register-for-event').click(function(event) {

    if ((Drupal.settings.are_user_register_for_event && Drupal.settings.are_user_register_for_event != 0) || readCookie('event_'+Drupal.settings.nid)) {
      return false;
    }

    function get_object_value_by_key(obj, value) {
      for(var key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === value) {
          return key;
        }
      }
      return false;
    };

    var occupation_option = '';
    var where_did_you_hear_about_event_option = '';

    for(var tid in Drupal.settings.taxonomy_occupation) {
      if (Drupal.settings.taxonomy_occupation.hasOwnProperty(tid)) {
        occupation_option += '<option value="' + tid + '">' + Drupal.settings.taxonomy_occupation[tid] + '</option>';
      }
    }

    for(var tid in Drupal.settings.taxonomy_where_did_you_hear_about_event) {
      if (Drupal.settings.taxonomy_where_did_you_hear_about_event.hasOwnProperty(tid)) {
        where_did_you_hear_about_event_option += '<option value="' + tid + '">' + Drupal.settings.taxonomy_where_did_you_hear_about_event[tid] + '</option>';
      }
    }

    var html = ' \
      <form id="ajax-event-register" accept-charset="UTF-8" method="post" enctype="multipart/form-data"> \
        <h3>'+Drupal.t("Register for event")+':</h3> \
        <div id="js-error-box" class="messages error hide"><ul></ul></div> \
        <input type="text" maxlength="80" name="field_nid_event[0][nid]" id="edit-field-nid-event-0-nid" size="80" value="" class="form-text required text hide"> \
        <label for="edit-field-name-0-value">'+Drupal.t("Name")+':<span class="red">*</span></label> \
        <input type="text" maxlength="80" name="field_name[0][value]" id="edit-field-name-0-value" size="80" value="" class="form-text required text"> \
        <label for="edit-field-lastname-0-value">'+Drupal.t("Last name")+':<span class="red">*</span></label> \
        <input type="text" maxlength="80" name="field_lastname[0][value]" id="edit-field-lastname-0-value" size="80" value="" class="form-text required text"> \
        <label for="edit-field-email-0-value">'+Drupal.t("Email")+':<span class="red">*</span></label> \
        <input type="text" maxlength="80" name="field_email[0][value]" id="edit-field-email-0-value" size="80" value="" class="form-text required text"> \
        <label for="edit-field-occupation-value">'+Drupal.t("Occupation")+':<span class="red">*</span></label> \
        <select name="field_occupation[value]" class="form-select required" id="edit-field-occupation-value"> \
          <option value="" selected="selected">'+Drupal.t("- Choose -")+'</option>'+occupation_option+'</select> \
        <label for="edit-field-occupation-info-0-value" class="hide">'+Drupal.t("Occupation info")+':<span class="red">*</span></label> \
        <input type="text" maxlength="80" name="field_occupation_info[0][value]" id="edit-field-occupation-info-0-value" size="80" value="" class="form-text text hide"> \
        <label for="edit-field-where-you-hear-value">'+Drupal.t("How did you know about this event?")+':<span class="red">*</span></label> \
        <select name="field_where_you_hear[value]" class="form-select required" id="edit-field-where-you-hear-value"> \
          <option value="" selected="selected">'+Drupal.t("- Choose -")+'</option>'+where_did_you_hear_about_event_option+'</select> \
        <label for="edit-field-where-you-hear-info-0-value" class="hide">'+Drupal.t("How did you know about this event? Details")+':<span class="red">*</span></label> \
        <input type="text" maxlength="80" name="field_where_you_hear_info[0][value]" id="edit-field-where-you-hear-info-0-value" size="80" value="" class="form-text text hide"> \
        <label for="edit-field-additional-info-0-value">'+Drupal.t("Additional info")+':</label> \
        <textarea cols="60" rows="5" name="field_additional_info[0][value]" id="edit-field-additional-info-0-value" class="form-textarea resizable textarea-processed" maxlength="254"></textarea> \
        <input type="submit" name="op" id="edit-submit" value="Зареєструватися" class="form-submit"> \
        <button id="ajax-event-register-cancel"></button> \
      </form>';
    html = $.trim(html);
    $overlay = $('<div id="overlay"></div>');
    $overlay.html(html);
    $overlay.appendTo($('body'));

    $('#edit-field-nid-event-0-nid').val(Drupal.settings.nid);
    $('#edit-field-name-0-value').val(Drupal.settings.user_first_name);
    $('#edit-field-lastname-0-value').val(Drupal.settings.user_last_name);
    $('#edit-field-email-0-value').val(Drupal.settings.user_email);

    $('#ajax-event-register-cancel').live('click', function(event) {
      $overlay.remove();
      return false;
    });

    $('#edit-field-occupation-value').change(function(event) {
      if ($(this).val() == get_object_value_by_key(Drupal.settings.taxonomy_occupation, 'інше')) {
        $('#edit-field-occupation-info-0-value').show();
        $('#edit-field-occupation-info-0-value').addClass('required');
        $('#edit-field-occupation-info-0-value').prev().show();
      }
      else {
        $('#edit-field-occupation-info-0-value').hide();
        $('#edit-field-occupation-info-0-value').removeClass('required');
        $('#edit-field-occupation-info-0-value').prev().hide();
      }
    });
    $('#edit-field-where-you-hear-value').change(function(event) {
      if ($(this).val() == get_object_value_by_key(Drupal.settings.taxonomy_where_did_you_hear_about_event, 'інше')) {
        $('#edit-field-where-you-hear-info-0-value').show();
        $('#edit-field-where-you-hear-info-0-value').addClass('required');
        $('#edit-field-where-you-hear-info-0-value').prev().show();
      }
      else {
        $('#edit-field-where-you-hear-info-0-value').hide();
        $('#edit-field-where-you-hear-info-0-value').removeClass('required');
        $('#edit-field-where-you-hear-info-0-value').prev().hide();
      }
    });

    $('#ajax-event-register').submit(function(event) {
      event.preventDefault();
      var errors = false;
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      $('#js-error-box ul').empty();
      $.each($('#ajax-event-register .required'), function(index, val) {
        $(this).removeClass('error');
        if ($(this).val().length == 0) {
          $(this).addClass('error');
          $('#js-error-box ul').append('<li>' + $(this).prev().text() + ' ' + Drupal.t("Is required") + '</li>');
          errors = true;
        };
      });
      if ($('#edit-field-email-0-value').val() != '' && (!re.test($('#edit-field-email-0-value').val()) || /^[a-zA-Z0-9-.+_@]*$/.test($('#edit-field-email-0-value').val()) == false)) {
        $('#edit-field-email-0-value').addClass('error');
        $('#js-error-box ul').append('<li>' + $('#edit-field-email-0-value').prev().text() + ' ' + Drupal.t("Not valid email") + '</li>');
        errors = true;
      };
      if (errors) {
        $('#js-error-box').removeClass('hide');
        event.preventDefault();
        return false;
      };

      $('#edit-title').text('test');
      $.ajax({
        type: "POST",
        url: "/register-to-event",
        data: $(this).serialize(),
        success: function(data) {
          $('#ajax-event-register').remove();
          if (Drupal.settings.user_email) {
            $overlay.html('<div id="ajax-event-register"><h3>'+Drupal.t("Register for event")+':</h3><div id="js-error-box" class="messages status"><ul><li>'+Drupal.t("Thanks for registering")+'!</li></ul></div><button id="ajax-event-register-cancel"></button></div>');
          }
          else {
            $overlay.html('<div id="ajax-event-register"><h3>'+Drupal.t("Register for event")+':</h3><div id="js-error-box" class="messages status"><ul><li>'+Drupal.t("Thanks for registering")+'!</li><li>'+Drupal.t("You can also register on this site")+' <a href="/user/register" class="user-register user active">'+Drupal.t("Registration")+'</a></li></ul></div><button id="ajax-event-register-cancel"></button></div>');
          }
          $overlay.click(function(event) {
            $(this).remove();
          });
          // Refresh number of users who will go to event
          $.getJSON('/node/count-flags/' + Drupal.settings.nid, {format: "json"}, function(data) {
            var new_num = (data['count_flag'] == undefined) ? 0 : data['count_flag'];
            $('.field-count-users .pane-content').text(new_num);
          });
          $('#register-for-event').text(Drupal.t('Thanks for registering'));
          $('#register-for-event').css('color','#FFF');
          createCookie('event_'+Drupal.settings.nid, true, 2*365);
        }
      });
      return false;
    });
  });
  if (Drupal.settings.open_register_popup == 1) {
    $('#register-for-event').trigger('click');
  }

});
