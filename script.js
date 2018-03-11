$(document).ready(() => {
  $('.tv-on-sound').trigger('play');
  // $('.background-audio').trigger('play');
  document.querySelector('video').currentTime = 10;
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
  document.querySelector('.background-audio').volume = 0.1;
  const video = document.querySelector('.placeholder');
  $(e.target).trigger('pause');
  $(e.target).addClass('max-video')
  const accText = $(e.target).parent().find('.acc-text')
  accText.hide();
  video.currentTime = 0;
  const currentVideo = new videoControls(video)
  $('.tv-border').show()
  $('.tv-on-sound').trigger('play');
  $(e.target).trigger('play');
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
  $('.close-sound').trigger('play');
  $('.close-btn').hide();
  $('.crash-effect').show();
  $('.placeholder').each((i, video) => {
    if ($(video).hasClass('max-video')) {
      document.querySelector('.max-video').currentTime = 10
      $(video).trigger('pause')
      $(video).removeClass('max-video')
    }
  })
  $('.placeholder').bind('mouseenter', videoOnMouseEnter)
  $('.placeholder').bind('mouseleave', videoOnMouseLeave)
  $('.tv-border').hide();
  const accText = $('.acc-content-active').find('.acc-text');
  accText.show();
})
