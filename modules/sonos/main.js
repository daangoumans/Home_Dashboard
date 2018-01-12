console.log("Hello from sonos-module")

$(document).ready(function(){

  //hide select
  document.getElementById("sonos-select").style.display = 'none';
  document.getElementById("sonos-favorite-select").style.display = 'none';

  var buttons = document.getElementsByClassName("button");
  for (var i = 0; i < buttons.length; i++) {
      buttons[i].style.display = 'none';
  }


  //first find sonos and get favorites
  $(document.getElementById("button-find")).click(function(){
      console.log("Searching sonos");
      var clickBtnValue = "sonos_find";
      data =  {'action': clickBtnValue};
      $.post(ajaxurl, data, function (response) {
          // check if sonos is found
          var response = response.replace(/\n|\r/g, "");
          if(response !== 'False'){
              // (multiple) sonos found
              // split to array
              if (typeof response == 'string'){
                devices = response.split(",");
                console.log("found the following device(s): " + devices)
              }

              //generate list for sonos devices
              for (var device_counter = 0; device_counter < devices.length; device_counter++) {
                var temp_options = document.createElement("OPTION");
                temp_options.setAttribute("value", ("speaker-" + [device_counter]));
                temp_options.setAttribute("class", "xxsmall reversed_button");
                var temp_name = document.createTextNode(devices[device_counter]);
                temp_options.appendChild(temp_name);
                document.getElementById("sonos-select").appendChild(temp_options);
              }

              // hide find button and show select, favorite and sonos control buttons
              document.getElementById("button-find").style.display = 'none';
              document.getElementById("sonos-select").style.display = 'block';
              for (var i = 0; i < buttons.length; i++) {
                  buttons[i].style.display = 'block';
              }


            // sonos was found so we get the favorites.
            // We trigger this when te sonos-select list changes
            function refresh_favorites(){
                console.log('refreshing favorites');
                var selector = document.getElementById("sonos-select");
                var sonosSpeaker = selector.options[selector.selectedIndex].text;
                data =  {'action': 'sonos_get_favorites','speaker':sonosSpeaker};
                $.post(ajaxurl, data, function (response) {
                    // check if sonos is found
                    var response = response.replace(/\n|\r/g, "");
                    if(response !== 'False'){
                      if (typeof response == 'string'){
                        favorites = response.split(",");
                        console.log("found the following device(s): " + favorites)
                      }

                      //generate list for sonos devices
                      for (var favorite_counter = 0; favorite_counter < favorites.length; favorite_counter++) {
                        var temp_options = document.createElement("OPTION");
                        temp_options.setAttribute("value", ("favorite-" + [favorite_counter]));
                        temp_options.setAttribute("class", "xxsmall reversed_button");
                        var temp_name = document.createTextNode(favorites[favorite_counter]);
                        temp_options.appendChild(temp_name);
                        document.getElementById("sonos-favorite-select").appendChild(temp_options);
                      }
                      document.getElementById("sonos-favorite-select").style.display = 'block';
                }else{
                  console.log(selector);
                  console.log('no favorites found');
                  document.getElementById("sonos-favorite-select").style.display = 'none';
                }

              });
            };
            document.getElementById("sonos-select").addEventListener("change", refresh_favorites());

          }else{
            alert('no sonos found');
          }
       });
    });


    $(document.getElementById("button-sonos-play-favorite")).click(function(){
        var clickBtnValue = "sonos_play";
        var selector = document.getElementById("sonos-select");
        var sonosSpeaker = selector.options[selector.selectedIndex].text;
        var selector = document.getElementById("sonos-favorite-select");
        var sonosFavorite = selector.options[selector.selectedIndex].text;
        data =  {'action': clickBtnValue,
        'speaker':sonosSpeaker, 'music':sonosFavorite
        };
        $.post(ajaxurl, data, function (response) {
          if(response !== 'False'){
            // check if sonos is selected
            var response = response.replace(/\n|\r/g, "");
            console.log(response);

          }else{
            alert('no sonos found');
          }
        });
      });


    $(document.getElementById("button-sonos-play")).click(function(){
        var clickBtnValue = "sonos_playback";
        var selector = document.getElementById("sonos-select");
        var sonosSpeaker = selector.options[selector.selectedIndex].text;
        data =  {'action': clickBtnValue,
        'speaker':sonosSpeaker, 'command':'play'
        };
        $.post(ajaxurl, data, function (response) {
          if(response !== 'False'){
            // check if sonos is selected
            var response = response.replace(/\n|\r/g, "");
            console.log(response);

          }else{
            alert('no sonos found');
          }
        });
      });


    $(document.getElementById("button-sonos-pause")).click(function(){
        var clickBtnValue = "sonos_playback";
        var selector = document.getElementById("sonos-select");
        var sonosSpeaker = selector.options[selector.selectedIndex].text;
        data =  {'action': clickBtnValue,
        'speaker':sonosSpeaker, 'command':'pause'
        };
        $.post(ajaxurl, data, function (response) {
          if(response !== 'False'){
            // check if sonos is selected
            var response = response.replace(/\n|\r/g, "");
            console.log(response);

          }else{
            alert('no sonos found');
          }
        });
      });


      $(document.getElementById("button-sonos-stop")).click(function(){
          var clickBtnValue = "sonos_playback";
          var selector = document.getElementById("sonos-select");
          var sonosSpeaker = selector.options[selector.selectedIndex].text;
          data =  {'action': clickBtnValue,
          'speaker':sonosSpeaker, 'command':'stop'
          };
          $.post(ajaxurl, data, function (response) {
            if(response !== 'False'){
              // check if sonos is selected
              var response = response.replace(/\n|\r/g, "");
              console.log(response);

            }else{
              alert('no sonos found');
            }
          });
        });


  //volume up sonos
  // 'direction':'up' and amount need to be customized (maybe define in cookies through a popup)
  $(document.getElementById("button-volume-up")).click(function(){
      var clickBtnValue = "sonos_volume";
      var selector = document.getElementById("sonos-select");
      var sonosSpeaker = selector.options[selector.selectedIndex].text;
      data =  {'action': clickBtnValue,
      'speaker':sonosSpeaker, 'direction':'up', 'amount':'10'
      };
      $.post(ajaxurl, data, function (response) {
        if(response !== 'False'){
          // check if sonos is selected
          var response = response.replace(/\n|\r/g, "");
          console.log(response);

        }else{
          alert('no sonos found');
        }
      });
    });


    //volume up sonos
    $(document.getElementById("button-volume-down")).click(function(){
        var clickBtnValue = "sonos_volume";
        var selector = document.getElementById("sonos-select");
        var sonosSpeaker = selector.options[selector.selectedIndex].text;
        data =  {'action': clickBtnValue,
        'speaker':sonosSpeaker, 'direction':'down', 'amount':'10'
        };
        $.post(ajaxurl, data, function (response) {
          if(response !== 'False'){
            // check if sonos is selected
            var response = response.replace(/\n|\r/g, "");
            console.log(response);

          }else{
            alert('no sonos found');
          }
        });
    });

});
