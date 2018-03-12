$(document).ready(() => {
  document.querySelector('#the-dude').currentTime = 10;
  // $('.background-audio').trigger('play');
})

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

const videoStartTimes = {
  'the-dude': 10,
  'walter': 8,
  'donny': 1,
  'jesus': 37,
  'maude': 6
}

const videoPaths = {
  'the-dude': 'url1',
  'walter': 'url1',
  'donny': 'url1',
  'jesus': 'url1',
  'maude': 'url1'
}

const videoOnMouseEnter = (e) => {
  const videoId = $(e.target).attr('id');
  $(`#${videoId}`).trigger('play');
  const video = document.querySelector(`#${videoId}`);
  video.currentTime = videoStartTimes[videoId]
  video.ontimeupdate = () => {
    if (video.currentTime > videoStartTimes[videoId] + 3) {
      video.currentTime = videoStartTimes[videoId]
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
  this.play = () => this.video.play();
  this.pause = () => this.video.pause();
  this.currentTime = this.video.currentTime;
  this.length = this.video.duration;
}

$('.placeholder').on('click', (e) => {
  $('.placeholder').unbind('mouseleave')
  $('.placeholder').unbind('mouseenter')
  $('.close-btn').show();
  $(e.target).trigger('pause');
  $('main').hide();
  $('.video-player-container').show();
  document.querySelector('.background-audio').volume = 0.1;
  const videoId = $(e.target).attr('id');
  $(`#${videoId}-max`).trigger('play');
  const video = document.querySelector(`#${videoId}`);
  $('main').hide();
  video.currentTime = 0;
  const currentVideo = new videoControls(video)
  $('.tv-on-sound').trigger('play');
  video.ontimeupdate = () => {
    if (video.currentTime >= currentVideo.length) {
      video.currentTime = 0
      currentVideo.pause()
    }
  }
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
  $('.video-player-container').hide();
  $('main').css('animation', 'none');
  $('main').show();
})
