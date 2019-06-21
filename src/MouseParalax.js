import { TweenLite } from 'gsap'

export class MouseParalax {
  constructor (config) {
    //  paralax element containing elements to animate
    this.ctx = document.querySelector(config.selector)

    //  elements object containing properties for each element
    this.elements = config.elements

    // speed for animation in seconds
    this.speed = config.speed
  }

  /**
   * Function that creates and appends div that covers whole paralax area.
   * This overlay is then used for mouseover event,
   * because geting mouse x, y position from paralax area itself
   * gives not accurate position when we hover child elements
   */
  createOverlay () {
    this.overlay = document.createElement('DIV')
    this.overlay.style.position = 'absolute'
    this.overlay.style.top = '0'
    this.overlay.style.right = '0'
    this.overlay.style.bottom = '0'
    this.overlay.style.left = '0'
    this.overlay.style.zIndex = '99'
    this.ctx.appendChild(this.overlay)
  }

  /**
   * Function that returns mouse position from hovered layer
   * starting from top left corner. More cross browser supported aproach
   * than native layerX, layerY event methods
   * @param {document#event:mouseover} e mouseover event
   * @return {object} object containing x, y position
   */
  getOffset (e) {
    e = e || window.event

    const target = e.target || e.srcElement
    const rect = target.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top

    return {
      x: offsetX,
      y: offsetY
    }
  }

  /**
   * Function that retrive Mouse x, y position and update
   * elements coordinates in paralax container
   * @param {int} x
   * @param {int} y
   */
  animate (x, y) {
    this.elements.forEach(el => {
      const element = this.ctx.querySelector(el.selector)

      const halfWidth = this.ctx.offsetWidth / 2
      const halfHeight = this.ctx.offsetHeight / 2

      const xPos = -((x - halfWidth) * el.xSpeed)
      const yPos = -((y - halfHeight) * el.ySpeed)

      TweenLite.to(element, this.speed, {
        x: xPos,
        y: yPos
      })
    })
  }

  /**
   * Initalizing function that:
   * -creates overlay element,
   * -add event listener to overlay that on mousemove animate paralax elements by
   * updating their positions by mouseposition calculted by getOffset function
   */
  init () {
    this.createOverlay()

    this.overlay.addEventListener('mousemove', e => {
      this.animate(this.getOffset(e).x, this.getOffset(e).y)
    })
  }
}
