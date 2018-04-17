

// import {TweenMax, TweenLite,TimelineMax, CSSPLugin } from "gsap";

// import { ThrowPropsPlugin} from "gsap";


import { remove, remove1, remove1RandomItem, shuffle, getNextShuffledItemGenerator } from './js/lib/shuffle'
import { flatten } from './js/lib/helpers'
import {selector, fSelector, selectMultiple} from './js/lib/selector'
import CustomEase  from './js/lib/CustomEase.js'
import CustomWiggle from './js/lib/CustomWiggle.js';
import { ThrowPropsPlugin } from './js/lib/ThrowPropsPlugin.js'


let boundsWidth = document.querySelector(".draggerBounds").getBoundingClientRect().width;

const main = (event) => {
// const flowers = document.querySelectorAll('.cls-187');
// const add = (a,b,c) => a + b +c 
// const curriedAdd = a => b => c => add(a,b,c)
// const curry = (fn,...args) => args.length >= fn.length 
//   ? fn(...args)
//   : curry.bind(null,fn,...args)




const selectMultiFromDocument = selectMultiple(document)
const flowers = selectMultiFromDocument( '.cls-186', '.cls-186' )
const peak = selectMultiFromDocument('.cls-182', '.cls-188');
const clouds = selector('g#clouds');

const cloud1 = document.querySelector('g#cloud1');
const cloud2Shadow = document.querySelector("g#cloud2-shadow");
const cloud1Shadow = document.querySelector("g#cloud1-shadow");

const closedEgg = document.querySelector('path.cls-198.closed-egg');
// console.log(closedEgg);
const flowersArray = selector('.cls-186');
const yellowFlowersArray = selector('.cls-187');
const eyes = selectMultiFromDocument('#eyes1', '#eyes2', '#eyes3','#eyes4', '#eyes5', '#eyes6', '#eyes7', '#eyes8', '#eyes9', '#eyes10', '#eyes11', '#eyes12', '#eyes13', '#eyes14');
// console.log(eyes);

const eggs = selectMultiFromDocument('#egg1', '#egg2', '#egg3','#egg4', '#egg5', '#egg6', '#egg7', '#egg8', '#egg9', '#egg10', "#redEggBasket");
// const eggs2 = document.querySelectorAll( '#egg1,  #egg2, #egg3, #egg4,  #egg5,  #egg6,  #egg7,  #egg8,  #egg9, #egg10');
// console.log(...eggs2);


function clearStage() {
  var clearTl = new TimelineMax();
  clearTl
  .set(flowersArray, {autoAlpha: 0})
  .set(yellowFlowersArray, {autoAlpha: 0})
  .set(cloud1Shadow, {x: "-=2000", autoAlpha:0})
  .set(cloud2Shadow, {x: -1200, autoAlpha:0})
  .set("#chickenHead2", {autoAlpha: 0})
  .set(closedEgg, { fill: "#F0D7BF" })
  .set("#topEggShell2", {y:45})
  .set(".no-show-egg-shell", {autoAlpha: 0})
  .set('#cloud1', {x: -1100})
  .set('#cloud2', {x: -3400})

  .set('#cloud3', {autoAlpha: 0})

  .set('#cloud4', {autoAlpha: 0})
  
  
  return clearTl;
  }


// const together = document.querySelectorAll("#cloud1", "#cloud1-shadow");
// const togetherArray = selectMultiFromDocument("#cloud1","#cloud1-shadow");
// console.log(togetherArray);

  //clouds moving 
  function cloudsMoving() {

            const cloudsMovingTl  = new TimelineMax({repeat: -1});
            cloudsMovingTl
            .to("#cloud1", 20, {x:2600, ease:Linear.easeNone}, 0 )
            .to("#cloud2", 40, {x:2600, ease:Linear.easeNone}, 0)
            
            // .fromTo("#cloud1", 30 , {x:-1400}, {x:2700, ease:Linear.easeNone, repeat:-1}, 0)
            // .fromTo("#cloud2", 38 , {x:-4000}, {x:2700, ease:Linear.easeNone, repeat:-1}, 0)
            // .fromTo("#cloud3", 50 , {x:-5000}, {x:2700, ease:Linear.easeNone, repeat:-1}, 0)
            // .fromTo("#cloud4", 45 , {x:-4500}, {x:2700, ease:Linear.easeNone, repeat:-1}, 0)
           return cloudsMovingTl;
     }
  
  // const cloudShadow = selectMultiFromDocument("g#cloud1-shadow", "g#cloud1");
  function enterFloorVegetation() {
    const enterFloorVegetationTl = new TimelineMax();
          enterFloorVegetationTl
          .fromTo(flowersArray, 1, {autoAlpha:0, scaleY:0.2, transformOrigin: 'center center'}, {autoAlpha:1, scaleY:1, transformOrigin: 'center center', ease: Back.easeInOut, onComplete: startBlinking})
          .fromTo(yellowFlowersArray, 1, {autoAlpha:0, scaleX:0.2, transformOrigin: 'center center'}, {autoAlpha:1, scaleX:1, transformOrigin: 'center center', ease: Back.easeInOut}, "-=0.9")
          return enterFloorVegetationTl;
  }


const flowerDance = () => {
  const removeFirstItems = (arr,count) => remove( count )( 0 )( shuffle(flatten(arr)) )
  const [removeItems1,leftOver1] = removeFirstItems( flowers, 10 )
  const [removeItems2,leftOver2] = removeFirstItems( leftOver1, 50 )
  return new TimelineMax({repeat:-1, repeatDelay: 1})
  .to(removeItems1, 1, {throwProps:{rotation:360}})
  .to(removeItems2, 1, {throwProps:{rotation:360}}, '-=0.5')
}


// not used, nor finished
// function birdsEating() {
//   var birdsEatingTl = new TimelineMax({repeat:-1, repeatDelay: 4});
//   birdsEatingTl
//   .to(peak, 1.4, {y:'+=3'}, '+=0.1')
//   .to(peak, 1.4, {y:'-=3'}, '+=0.1')
  
//   return birdsEatingTl;
// }


  function startBlinking() {
  
    var birdBlinksTl = new TimelineMax({repeat:-1, repeatDelay: 10});
  

    shuffle(eyes).forEach( eye =>birdBlinksTl
      .set(eye, {autoAlpha:0})
      .set(eye, {autoAlpha:1}, '+=0.2')
      .set(eye, {autoAlpha:0}, '+=0.2')
      .set(eye, {autoAlpha:1}, '+=0.2')
    )
    return birdBlinksTl;
  }






  function bunnyInTheBack() {
    const bunnyInTheBackTl = new TimelineMax({repeat:-1, repeatDelay: 10});
    bunnyInTheBackTl
    .to('#bunnyInTheBack', 1, {y:85})
    .to('#bunnyInTheBack', 1, {y:"-=85"})
    return bunnyInTheBackTl;
  }


  function eggsShaking() {
    const eggsShakingTl = new TimelineMax({repeat:-1, repeatDelay: 3});
    eggsShakingTl
    shuffle(eggs).forEach( egg =>eggsShakingTl
      .to(egg, 0.1, {x:"+=20", yoyo:true, repeat:5}, '+=5')
    )
    return eggsShakingTl;
  }


  function bunnyHand() {
    CustomWiggle.create("theWiggle", {wiggles:2});
    const bunnyHandTl = new TimelineMax();
    bunnyHandTl
      .to("#bunnyHand", 0.5, {x: -10})
      .to("#bunnyHand", 0.5, {x: 10})
      .to("#basket", 1, {y:-10, rotation:10, ease:"theWiggle"}, "-=0.6")
      .to("#redEggBasket", 2 ,{x:10, y: 100, ease:Power2.easeOut}, "-=0.8")
      
      return bunnyHandTl;
    
  }

  function eggPopping() {
    const eggPoppingTl = new TimelineMax();
    eggPoppingTl

      .to("#eggPopping", 0.1, {x:"+=20", yoyo:true, repeat: 20})
      .to("#topEggShell2",0.5,  {y:-15, ease: Bounce.easeOut})
      .to(closedEgg, 0.5, {fill: 'url(#radial-gradient-17)'}, "-=0.5")
      .to(".no-show-egg-shell", 0.5, {autoAlpha: 1}, "-=0.5")
      
      .to("#chickenHead2", 0.5, {autoAlpha: 1, ease: Bounce.easeOut}, "-=0.3")
      

    return eggPoppingTl;
  }

let masterTl;
let theDragger;
  function go() {
    // console.log('hey...')
   masterTl  = new TimelineMax({onUpdate:onUpdate});
    masterTl 
    .add(clearStage(), 0)
    .add(cloudsMoving(), 0)
    .add(enterFloorVegetation(), 0)
    .add(eggsShaking(), 0)
    .add( flowerDance(), 1)
    .add(bunnyInTheBack(), 7)
    .add(bunnyHand(), 5)
    .add(eggPopping(), 2)
    ;
    
  }
   theDragger = Draggable.create(".dragger", {
    type: "x",
    bounds: {
      minX:0,
      maxX:boundsWidth-50
    },
    onDrag: onDrag,
    onPress: onPress,
    onRelease: onRelease
  });
  
    function onRelease() {
      console.log(masterTl.progress())
    }
  function onUpdate() {
    TweenMax.set(".dragger", { x: this.progress() * (boundsWidth-50) });
  }
  
  function onDrag() {
    masterTl.progress(this.x / (boundsWidth-50));
  }
  function onPress() {
    masterTl.pause();
   }
  
  document.querySelector("#play").addEventListener("click", function() {
    masterTl.play();
  });
  document.querySelector("#pause").addEventListener("click", function() {
    masterTl.pause();
  });
  document.querySelector("#reverse").addEventListener("click", function() {
    masterTl.reverse();
  });
  document.querySelector("#resume").addEventListener("click", function() {
    masterTl.resume();
  });
  document.querySelector("#restart").addEventListener("click", function() {
    masterTl.restart();
  });
  
 
  go();
}

document.addEventListener('DOMContentLoaded',main)


window.addEventListener("resize", function() {
    boundsWidth = document.querySelector(".draggerBounds").getBoundingClientRect().width;
    theDragger[0].applyBounds({minX:0, maxX:boundsWidth-50});
    TweenMax.set(".dragger", { x: masterTl.progress() * (boundsWidth-50) });
});





