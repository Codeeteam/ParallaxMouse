import { MouseParalax } from './MouseParalax'

const mouseParalax = new MouseParalax({
  selector: '.js-paralax',
  speed: 2, //  in seconds
  elements: [
    {
      selector: '.js-paralax-el-1',
      xSpeed: 0.1,
      ySpeed: 0.1
    }
  ]
})

mouseParalax.init()