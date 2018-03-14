const placeHolderEvents = {
  click: (e) => placeHolderClickEvent(e),
  mouseenter: () => videoOnMouseEnter,
  mouseleave: () => videoOnMouseLeave
};

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
};

const addContentActive = (position) => {
  $('.acc-content').each((i, elem) => {
    if (position === i) {
      $(elem).addClass('acc-content-active');
    }
  })
};

const bindPlaceholderEvents = () => {
  $('.placeholder').bind('mouseenter', videoOnMouseEnter);
  $('.placeholder').bind('mouseleave', videoOnMouseLeave);
};

const checkVideoTime = (video, target) => {
  if (!target) {
    video.on('timeupdate', () => {
      const maxVideo = document.querySelector('.video-player-video');
      if (maxVideo.currentTime >= maxVideo.duration) {
        maxVideo.currentTime = 0;
        toggleButton($('.play-btn'), 'show');
      }
    })
  } else {
    video.ontimeupdate = () => {
      if (video.currentTime >= video.duration) {
        video.currentTime = 0;
        togglePlayPause(target, 'play');
      }
    }
  }
};

const checkWindowWidth = (windowWidth) => {
  if (windowWidth <= 700) {
    unbindPlaceholderEvents();
    toggleButton($('.play-btn-mobile'), 'show');
  } else {
    bindPlaceholderEvents();
    toggleButton($('.play-btn-mobile'), 'hide');
  }
};

const closeVideoPlayer = () => {
  playCloseSounds();
  bindPlaceholderEvents();
  togglePlayPause($('.video-player-video'), 'pause');
  toggleMainView();
};

const placeHolderClickEvent = (e) => {
  const videoId = $(e.target).attr('id');
  const quality = 'high';
  const url = VIDEO_URLS[videoId][quality];
  const video = document.querySelector(`#${videoId}`);

  unbindPlaceholderEvents();
  togglePlayPause($(e.target), 'pause');
  prependVideoToPlayer(videoId, url);
  toggleVideoPlayerOn(videoId);
  resetVideo(video);
  checkVideoTime($('.video-player-video'), null);
};

const playCloseSounds = () => {
  document.querySelector('.background-audio').volume = 1;
  document.querySelector('.close-sound').currentTime = 1;
  document.querySelector('.close-sound').volume = 0.3;
  togglePlayPause($('.close-sound'), 'play');
};

const prependVideoToPlayer = (videoId, url) => {
  return $('.video-player-container').prepend(`
    <video class="video-player-video" id="${videoId}-max">
      <source class="video-window" src=${url} type="video/mp4">
      Your browser does not support the video tag.
    </video>`)
};

const resetClasses = (tab) => {
  $('.tab').each((i, tab) => {
    $(tab).removeClass('tab-active');
    $(tab).children('.fa').removeClass('fa-minus');
    $(tab).children('.fa').addClass('fa-plus');
    $(tab).parent().children('.acc-content').removeClass('acc-content-active');
  })
};

const resetVideo = (video) => video.currentTime = 0;

const tabClickEventHandler = (e) => {
  const tab = $(e.target).hasClass('tab') ? $(e.target) : $(e.target).parent();
  const tabIsActive = tab.hasClass('tab-active');
  const tabText = tab.children('p').text().toLowerCase().replace(/\s/g, '');
  const isTab = tab.hasClass('tab');

  if (isTab) {
    resetClasses();
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
};

const toggleButton = (button, state) => {
  return state === 'show' ? button.show() : button.hide()
};

const toggleMainView = () => {
  $('.video-player-container').addClass('hidden');
  $('.video-player-video').remove();
  toggleButton($('.close-btn'), 'hide');
  $('.crash-effect').show();
  $('main').css('animation', 'none');
  $('main').show();
};

const togglePlayPause = (video, action) => video.trigger(action);

const toggleVideoPlayerOn = (videoId) => {
  toggleButton($('.close-btn'), 'show');
  $('main').hide();
  toggleButton($('.play-btn'), 'hide');
  $('.video-player-container').removeClass('hidden');
  document.querySelector('.background-audio').volume = 0.1;
  togglePlayPause($('.tv-on-sound'), 'play');
  togglePlayPause($(`#${videoId}-max`), 'play');
};

const toggleVideoPlayerState = () => {
  const video = document.querySelector('.video-player-video');
  const playState = video && video.paused ? 'play' : 'pause';
  const displayState = video && video.paused? 'hide' : 'show';

  togglePlayPause($('.video-player-video'), playState);
  toggleButton($('.play-btn'), displayState);
};

const unbindPlaceholderEvents = () => {
  $('.placeholder').unbind('mouseleave');
  $('.placeholder').unbind('mouseenter');
};

const videoOnMouseEnter = (e) => {
  const videoId = $(e.target).attr('id');
  const selectedVideo = document.querySelector(`#${videoId}`);
  togglePlayPause($(`#${videoId}`), 'play');
  checkVideoTime(selectedVideo, $(e.target));
};

const videoOnMouseLeave = (e) => {
  const videoId = $(e.target).attr('id');
  const video = document.querySelector(`#${videoId}`);
  togglePlayPause($(e.target), 'pause');
  resetVideo(video);
};

$(document).ready(() => {
  $('.background-audio').trigger('play');
  checkWindowWidth($(window).width());
});

$(window).on('resize', () => { checkWindowWidth($(window).width()) });

$('.close-btn').on('click', closeVideoPlayer);
$('.placeholder').mouseenter(placeHolderEvents.mouseenter);
$('.placeholder').mouseleave(placeHolderEvents.mouseleave);
$('.placeholder').on('click', placeHolderEvents.click);
$('.tab').on('click', e => tabClickEventHandler(e));
$('.video-player-container').on('click', toggleVideoPlayerState);
