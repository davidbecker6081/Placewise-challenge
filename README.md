- Lebowski Theme:
 - Music playing in background for each tab
 - voice animation when change of rating
 - Rater could be a lebowski saying ('abide as middle', etc...)
 - Pictures could be videos from movie (when maximized, they play)
 - Add video for intro (opening credits)
 - Elastic animation for enlarging video
 - Add classic tv border around max video
 - Add bowling icons instead of plus/minus
 - Add crash sound for when exiting out of max video
 - Add bowling icon for close-btn
 - Change color scheme (maybe red, blue, light brown) - Focus on western scheme - Add to README
 - possibly deploy on Heroku
 - Each character has own color for .active
 - make videos so that on page load, only 10 sec video, and on click, full video
 - Fix mobile view video hover
 - Have main drop down from top (like bowling pins), (with cage gate going up?)
 - Change name consts to ALL_CAPS style
 - README
  - Where ideas came from? (inspiration with photos)
    - Color scheme
    - fonts
    - video
    - video player
  - Different features of tabs and video
  - How each feature works / and code
  - Things I tried but couldn't figure out in time
    - Add play/pause button on hover
      - Create separate branch for code that doesn't work

      `const togglePausePlayBtn = (e, button = 'play') => {
        console.log(e)
        if (e === 'enter' && button === 'play') {
          console.log('enter if')
          $('.pause-btn-high').show()
        } else if (e === 'leave' && button === 'play') {
          $('.pause-btn-high').hide()
        } else  if (e === 'enter' && button === 'pause') {
          $('.play-btn-high').show()
        } else  if (e === 'leave' && button === 'pause') {
          $('.play-btn-high').hide()
        }
      }

      const bindEventsVideoPlayer = (videoState) => {
        if (videoState === 'play') {
          console.log('play')
          $('.video.player-container').bind('mouseenter', () => togglePausePlayBtn('enter', 'play'))
          $('.video.player-container').bind('mouseleave', () => togglePausePlayBtn('leave', 'play'))
        } else if (videoState === 'pause') {
          console.log('pause')
          $('.video.player-container').bind('mouseenter', () => togglePausePlayBtn('enter', 'pause'))
          $('.video.player-container').bind('mouseleave', () => togglePausePlayBtn('leave', 'pause'))
        }
      }

      $('.video-player-container').mouseenter(togglePausePlayBtn('enter'))
      $('.video-player-container').mouseleave(togglePausePlayBtn('leave'))

      $('.play-btn-low').on('click', (e) => {
        $(e.target).closest('video').trigger('play');
        $('.play-btn-low').hide();
        bindEventsVideoPlayer('pause')
      })

      $('.pause-btn-high').on('click', (e) => {
        $(e.target).parent().find('video').trigger('pause');
        $('.pause-btn-high').hide();
        bindEventsVideoPlayer('play')

      })

      $('.play-btn-high').on('click', (e) => {
        $(e.target).parent().find('video').trigger('play')
        $('.play-btn-high').hide();
        bindEventsVideoPlayer('pause')
      })`

      - `Uncaught (in promise) DOMException: The play() request was interrupted by a call to pause(). `https://goo.gl/LdLk22` - caused by play() returning a promise - need to wait until promise is resolved and then call pause() with a catch error - also need some loading animation - https://developers.google.com/web/updates/2017/06/play-request-was-interrupted`
      - Fix audio when max video opens, so that tv on sound is edited in movie edit
  - Next Steps:
    - Each character has own color for .active
    - Find art characters for tabs on hover
    -
