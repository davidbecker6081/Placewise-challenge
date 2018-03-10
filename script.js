$(document).ready(() => {
  const introVideo = document.querySelector('.intro-video');
  const audio = document.querySelector('audio');
  audio.volume = 0.5;
  introVideo.currentTime = 9;
  $('.intro-video').trigger('play');

  setTimeout(() => {
    $('.intro-video').addClass('intro-video-fade-out');
    $('.intro-video').trigger('pause');
    // $('audio').trigger('play');
    // $('.intro-video').hide();
  }, 500)
})

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

$('.placeholder').mouseenter(() => {
  $('video.placeholder').trigger('play');
  const video = document.querySelector('.placeholder');
  video.currentTime = 10;
  video.ontimeupdate = () => {
    if (video.currentTime > 13) {
      video.currentTime = 10;
    }
  }
})

$('.placeholder').mouseleave((e) => {
  $('video').trigger('pause');
})

function videoControls(video) {
  this.video = video;
  this.play = () => this.video.play();
  this.pause = () => this.video.pause();
  this.currentTime = this.video.currentTime;
  this.length = this.video.duration;
}

$('.placeholder').on('click', (e) => {
  const video = document.querySelector('.placeholder');
  $(e.target).addClass('max-video')
  const accText = $(e.target).parent().find('.acc-text')
  accText.hide();
  const parentContainer = $(e.target).parent();
  parentContainer.css('justify-content', 'center');
  $('.placeholder').unbind('mouseleave')
  $('.placeholder').unbind('mouseenter')
  video.currentTime = 0;
  const currentVideo = new videoControls(video)
  $(e.target).trigger('play');
  video.ontimeupdate = () => {
    if (video.currentTime >= currentVideo.length) {
      video.currentTime = 0
      currentVideo.pause()
    }
  }
})
