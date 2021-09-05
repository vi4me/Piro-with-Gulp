// @@include('_burger.js', {})

$(document).ready(function(){

  $('.slider').slick({
    infinite: true,
    autoplay: true,
    mobileFirst: true,
    arrows: false

  });

  $('.menu-buttons').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: false,
    nextArrow:"<img class='a-right control-c next slick-next' src='images/Arrow.svg'>",
    responsive: [
                {
                  breakpoint: 570,
                  settings: {
                    infinite: true,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: true,
                    prevArrow: false,
                    nextArrow:"<img class='a-right control-c next slick-next' src='images/Arrow.svg'>"
                  }
                }
              ]
  });

  $(function () {
    $('#reviews').tab('show')
  })

  $('.prod-reviews-cards').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: false,
    nextArrow:"<img class='a-right control-c next slick-next' src='images/review_arrow.svg'>",
    responsive: [
                {
                  breakpoint: 570,
                  settings: {
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                    prevArrow: false,
                    nextArrow:"<img class='a-right control-c next slick-next' src='images/review_arrow.svg'>",
                  }
                }
              ]
  });

});

class Slider {
  constructor (rangeElement, valueElement, options) {
    this.rangeElement = rangeElement
    this.valueElement = valueElement
    this.options = options

    // Attach a listener to "change" event
    this.rangeElement.addEventListener('input', this.updateSlider.bind(this))
  }

  // Initialize the slider
  init() {
    this.rangeElement.setAttribute('min', options.min)
    this.rangeElement.setAttribute('max', options.max)
    this.rangeElement.value = options.cur

    this.updateSlider()
  }

  // Format the money
  asMoney(value) {
    return parseFloat(value) + ' UAH'
      .toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  generateBackground(rangeElement) {
    if (this.rangeElement.value === this.options.min) {
      return
    }

    let percentage =  (this.rangeElement.value - this.options.min) / (this.options.max - this.options.min) * 100
    return 'background: linear-gradient(to right, #fff, #28a745 ' + percentage + '%, #d3edff ' + percentage + '%, #dee1e2 100%)'
  }

  updateSlider (newValue) {
    this.valueElement.innerHTML = this.asMoney(this.rangeElement.value)
    this.rangeElement.style = this.generateBackground(this.rangeElement.value)
  }
}

let rangeElement = document.querySelector('.range [type="range"]')
let valueElement = document.querySelector('.range .range__value span')

let options = {
  min: 0,
  max: 3000,
  cur: 1000
}

if (rangeElement) {
  let slider = new Slider(rangeElement, valueElement, options)

  slider.init()
}
