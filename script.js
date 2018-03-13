$(document).ready(() => {
  // $('.background-audio').trigger('play');
  checkWindowWidth($(window).width())
})

$(window).on('resize', () => { checkWindowWidth($(window).width()) })

const checkWindowWidth = (windowWidth) => {
  if (windowWidth <= 700) {
    unbindPlaceholderEvents();
    togglePlayButton('show')
  } else {
    bindPlaceholderEvents();
    togglePlayButton('hide')
  }
}

const togglePlayButton = (state) => {
  return state === 'show' ? $('.play-btn-mobile').show() : $('.play-btn-mobile').hide()
}

const unbindPlaceholderEvents = () => {
  $('.placeholder').unbind('mouseleave');
  $('.placeholder').unbind('mouseenter');
}

const bindPlaceholderEvents = () => {
  $('.placeholder').bind('mouseenter', videoOnMouseEnter);
  $('.placeholder').bind('mouseleave', videoOnMouseLeave);
}

const addContentActive = (position) => {
  $('.acc-content').each((i, elem) => {
    if (position === i) {
      $(elem).addClass('acc-content-active');
    }
  })
}

const resetClasses = (tab) => {
  $('.tab').each((i, tab) => {
    $(tab).removeClass('tab-active');
    $(tab).children('.fa').removeClass('fa-minus');
    $(tab).children('.fa').addClass('fa-plus');
    $(tab).parent().children('.acc-content').removeClass('acc-content-active');
  })
}

$('.tab').on('click', e => {
  const tab = $(e.target).hasClass('tab') ? $(e.target) : $(e.target).parent();
  const tabIsActive = tab.hasClass('tab-active');
  const tabText = tab.children('p').text().toLowerCase().replace(/\s/g, '');
  const isTab = tab.hasClass('tab');

  if (isTab) {
    resetClasses()
  }

  if (!tabIsActive && isTab) {
    tab.addClass('tab-active');
    tab.children('.fa').addClass('fa-minus');
    $('.tab').each((i, tab) => {
      if ($(tab).text().toLowerCase().replace(/\s/g, '') === tabText) {
        addContentActive(i);
      }
    })
  }
})

const VIDEO_URLS = {
  'the-dude': {
    low: 'assets/The-Dude-preview.m4v',
    high: 'assets/The-Dude-Clip-with-frame.mp4'
  },
  'walter': {
    low: 'assets/Walter-clip-preview.m4v',
    high: 'assets/Walter-Clip-With-Frame.mp4'
  },
  'donny': {
    low: 'assets/Donny-clip-preview.m4v',
    high: 'assets/Donny-Clip-With-Frame.mp4'
  },
  'jesus': {
    low: 'assets/jesus-clip-preview.mp4',
    high: 'assets/Jesus-Clip-With-Frame.mp4'
  },
  'maude': {
    low: 'assets/Maude-preview.mp4',
    high: 'assets/Maude-Clip-with-frame.mp4'
  }
}

const videoOnMouseEnter = (e) => {
  const videoId = $(e.target).attr('id');
  const selectedVideo = document.querySelector(`#${videoId}`);
  $(`#${videoId}`).trigger('play');
  checkVideoTime(selectedVideo, $(e.target))
}



const checkVideoTime = (video, target) => {
  if (!target) {
    video.on('timeupdate', () => {
      const maxVideo = document.querySelector('.video-player-video')
      if (maxVideo.currentTime >= maxVideo.duration) {
        maxVideo.currentTime = 0
        $('.play-btn').show();
      }
    })
  } else {
    video.ontimeupdate = () => {
      if (video.currentTime >= video.duration) {
        video.currentTime = 0
        togglePlayPause(target, 'play')
      }
    }
  }
}

const togglePlayPause = (video, action) => video.trigger(action);

const resetVideo = (video) => video.currentTime = 0;

const videoOnMouseLeave = (e) => {
  const videoId = $(e.target).attr('id');
  const video = document.querySelector(`#${videoId}`);
  togglePlayPause($(e.target), 'pause');
  resetVideo(video);
}

$('.placeholder').mouseenter(videoOnMouseEnter)
$('.placeholder').mouseleave(videoOnMouseLeave)

function videoControls(video) {
  this.video = video;
  this.state = 'pause';
  this.play = () => this.video.play();
  this.pause = () => this.video.pause();
  this.currentTime = this.video.currentTime;
  this.length = this.video.duration;
}

const prependVideoToPlayer = (videoId, url) => {
  return $('.video-player-container').prepend(`
    <video class="video-player-video" id="${videoId}-max">
      <source class="video-window" src=${url} type="video/mp4">
      Your browser does not support the video tag.
    </video>`)
}

const toggleVideoPlayerOn = (videoId) => {
  $('.close-btn').show();
  $('main').hide();
  $('.play-btn').hide();
  $('.video-player-container').removeClass('hidden');
  document.querySelector('.background-audio').volume = 0.1;
  $('.tv-on-sound').trigger('play');
  togglePlayPause($(`#${videoId}-max`), 'play')
}

const toggleVideoPlayerOff = (videoId) => {

}

$('.placeholder').on('click', (e) => {
  const videoId = $(e.target).attr('id');
  const quality = 'high';
  const url = VIDEO_URLS[videoId][quality];

  unbindPlaceholderEvents();
  togglePlayPause($(e.target), 'pause');
  prependVideoToPlayer(videoId, url);
  toggleVideoPlayerOn(videoId);

  const video = document.querySelector(`#${videoId}`);
  resetVideo(video);
  checkVideoTime($('.video-player-video'), null)

})

$('.close-btn').on('click', (e) => {
  document.querySelector('.background-audio').volume = 1;
  document.querySelector('.close-sound').currentTime = 1;
  document.querySelector('.close-sound').volume = 0.3;
  $('.close-sound').trigger('play');
  $('.close-btn').hide();
  $('.crash-effect').show();
  $('.video-player-video').trigger('pause');
  $('.placeholder').bind('mouseenter', videoOnMouseEnter)
  $('.placeholder').bind('mouseleave', videoOnMouseLeave)
  $('.video-player-container').addClass('hidden');
  $('main').css('animation', 'none');
  $('main').show();
  $('.video-player-video').remove();
})

$('.video-player-container').on('click', (e) => {
  const video = document.querySelector('.video-player-video')
  if (video && video.paused) {
    $('.video-player-video').trigger('play')
    $('.play-btn').hide();
  } else {
    $('.video-player-video').trigger('pause')
    $('.play-btn').show();
  }
})
