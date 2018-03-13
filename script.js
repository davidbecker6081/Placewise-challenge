$(document).ready(() => {
  document.querySelector('#the-dude').currentTime = 10;
  $('.background-audio').trigger('play');
  checkWindowWidth($(window).width())
})

$(window).on('resize', () => {checkWindowWidth($(window).width())})

const checkWindowWidth = (windowWidth) => {
  if (windowWidth <= 700) {
    $('.placeholder').unbind('mouseleave');
    $('.placeholder').unbind('mouseenter');
    $('.play-btn-mobile').show();
  } else {
    $('.placeholder').bind('mouseenter', videoOnMouseEnter);
    $('.placeholder').bind('mouseleave', videoOnMouseLeave);
    $('.play-btn-mobile').hide();
  }
}

const videoClasses = {
  'placeholder the-dude': 'the-dude',
  'placeholder walter': 'walter',
  'placeholder donny': 'donny',
  'placeholder jesus': 'jesus',
  'placeholder maude': 'maude',
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

const videoPaths = {
  'the-dude': 'assets/The-Dude-Clip-with-frame.mp4',
  'walter': 'url1',
  'donny': 'url1',
  'jesus': 'url1',
  'maude': 'url1'
}

const videoOnMouseEnter = (e) => {
  const videoId = $(e.target).attr('id');
  $(`#${videoId}`).trigger('play');
  const video = document.querySelector(`#${videoId}`);
  video.ontimeupdate = () => {
    if (video.currentTime >= video.duration) {
      video.currentTime = 0
      $(e.target).trigger('play')
    }
  }
}

const videoOnMouseLeave = () => {
  $('video').trigger('pause');
}

$('.placeholder').mouseenter((e) => videoOnMouseEnter(e))
$('.placeholder').mouseleave(videoOnMouseLeave)

function videoControls(video) {
  this.video = video;
  this.state = 'pause';
  this.play = () => this.video.play();
  this.pause = () => this.video.pause();
  this.currentTime = this.video.currentTime;
  this.length = this.video.duration;
}

$('.placeholder').on('click', (e) => {
  $('.placeholder').unbind('mouseleave')
  $('.placeholder').unbind('mouseenter')
  $(e.target).trigger('pause');
  const videoId = $(e.target).attr('id');
  const quality = 'high';
  const url = VIDEO_URLS[videoId][quality];

  $('.video-player-container').prepend(`
    <video class="video-player-video" id="${videoId}-max">
      <source class="video-window" src=${url} type="video/mp4">
      Your browser does not support the video tag.
    </video>`)
  $('.close-btn').show();
  $('main').hide();
  $('.play-btn').hide();
  $('.video-player-container').removeClass('hidden');
  document.querySelector('.background-audio').volume = 0.1;
  $(`#${videoId}-max`).trigger('play');
  const video = document.querySelector(`#${videoId}`);
  video.currentTime = 0;
  const currentVideo = new videoControls(video)
  $('.tv-on-sound').trigger('play');
  $('.video-player-video').on('timeupdate', () => {
    const maxVideo = document.querySelector('.video-player-video')
    if (maxVideo.currentTime >= maxVideo.duration) {
      maxVideo.currentTime = 0
      $('.play-btn').show();
    }
  })
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
