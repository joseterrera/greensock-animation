

// import {TweenMax, TweenLite,TimelineMax, CSSPLugin } from "gsap";

// import { ThrowPropsPlugin} from "gsap";


import { remove, remove1, remove1RandomItem, shuffle, getNextShuffledItemGenerator } from './js/lib/shuffle'

import { flatten } from './js/lib/helpers'

import {selector, fSelector, selectMultiple} from './js/lib/selector'
import CustomEase  from '/js/lib/CustomEase.js'
// import{ CustomWiggle } from '/js/lib/CustomWiggle.js'
import CustomWiggle from '/js/lib/CustomWiggle.js';

// import{ CustomWiggle } from '/js/lib/CustomWiggle.js'
import { ThrowPropsPlugin } from '/js/lib/ThrowPropsPlugin.js'



// const CustomWiggle = require('/js/lib/CustomWiggle.js')
// const ThrowPropsPlugin = require( 'gsap/ThrowPropsPlugin');

// import {ass} from './js/dope'

// console.log(ass)

const main = (event) => {
// const flowers = document.querySelectorAll('.cls-187');
const add = (a,b,c) => a + b +c 
const curriedAdd = a => b => c => add(a,b,c)
const curry = (fn,...args) => args.length >= fn.length 
  ? fn(...args)
  : curry.bind(null,fn,...args)


const selectMultiFromDocument = selectMultiple(document)
const flowers = selectMultiFromDocument( '.cls-186', '.cls-186' )
const peak = selectMultiFromDocument('.cls-182', '.cls-188');
const clouds = selector('g#clouds');

const cloud1 = document.querySelector('g#cloud1');
const cloud2Shadow = document.querySelector("g#cloud2-shadow");
const cloud1Shadow = document.querySelector("g#cloud1-shadow");

const flowersArray = selector('.cls-186');
const yellowFlowersArray = selector('.cls-187');
const eyes = selectMultiFromDocument('#eyes1', '#eyes2', '#eyes3','#eyes4', '#eyes5', '#eyes6', '#eyes7', '#eyes8', '#eyes9', '#eyes10', '#eyes11', '#eyes12', '#eyes13', '#eyes14');
// console.log(eyes);

const eggs = selectMultiFromDocument('#egg1', '#egg2', '#egg3','#egg4', '#egg5', '#egg6', '#egg7', '#egg8', '#egg9', '#egg10');
// console.log(eggs);


function clearStage() {
  var clearTl = new TimelineMax();
  clearTl
  .set(flowersArray, {autoAlpha: 0})
  .set(yellowFlowersArray, {autoAlpha: 0})
  // .set(clouds, {left:-200, opacity:0});
  .set(cloud1, {x:'-1200', autoAlpha:0.5})
  .set(cloud1Shadow, {x:'-2400', autoAlpha:1})

  .set(cloud2, {x:'-=3600', autoAlpha:0.5})
  .set(cloud2Shadow, {x: '-=1400', autoAlpha:1})
  return clearTl;
  }

  const cloudShadow = selectMultiFromDocument("g#cloud1-shadow", "g#cloud1");
  // console.log('classy',cloudShadow);
 
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
  // .to(removeItems1, 1, {y:0, rotation:32, x:'-=1'}, 0)
  .to(removeItems2, 1, {throwProps:{rotation:360}}, '-=0.5')
  // .to(removeItems2, 1, {y:0, rotation:32, x:'+=1'}, '-=0.2')
    
}


// not used, nor finished
function birdsEating() {
  var birdsEatingTl = new TimelineMax({repeat:-1, repeatDelay: 4});
  birdsEatingTl
  // .set(peak, {rotation:12})
  // .set(peak, { rotation: 0})
  .to(peak, 1.4, {y:'+=3'}, '+=0.1')
  .to(peak, 1.4, {y:'-=3'}, '+=0.1')
  
  return birdsEatingTl;
}


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




  //clouds moving 
  function cloudsMoving() {
 const cloudsMovingTl = new TimelineMax({repeat:-1}, Math.random()*5);
        cloudsMovingTl
        .to(cloud1, 14, {autoAlpha:1})
        .to(cloud1Shadow, 14, {autoAlpha:1})

        .to(cloud2, 14, {autoAlpha:1})
        .to(cloud2Shadow, 14, {autoAlpha:1})

         .to(cloud1, 40 , {x:"+=3000", ease:Linear.easeNone}, 0)
         .to(cloud1Shadow, 40 , {x:"+=3000", ease:Linear.easeNone}, 0)
         .to(cloud2, 60 , {x:"+=3000", ease:Linear.easeNone}, 0)
         .to(cloud2Shadow, 60 , {x:"+=3000", ease:Linear.easeNone}, 0)
         

        return cloudsMovingTl;
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
    // .to("#egg6", 1, {x: 400});
    return eggsShakingTl;
  }




  // TweenMax.to("#basket", 4, {x:10, y:10, ease: "wiggle"});

  // var tl = new TimelineMax({repeat:50, repeatDelay:1, delay:1});
  // tl.to("#basket", 4, {x:10, y:10, ease: "wiggle"});

  


  function bunnyHand() {
    // function wiggle(id, duration) {
    //   var tl = new TimelineLite();
    //   tl.to("#" + id, duration, {rotation:30, ease:"Wiggle.easeOut" })
    //   return tl;
    // }
    // const wiggles = 4;
    // CustomWiggle.create("Wiggle.easeOut", {wiggles:wiggles, type:"easeOut"});
    CustomWiggle.create("theWiggle", {wiggles:2});
    const bunnyHandTl = new TimelineMax();
    bunnyHandTl
      .to("#bunnyHand", 0.5, {x: -10})
      .to("#bunnyHand", 0.5, {x: 10})
      // .to("#basket", 4,  {rotation:30, ease:"myWiggle"})
      
      // .add(wiggle("basket", 3))
      // .to("#basket", 1, {rotation:"-=30", transformOrigin:"100% 0%", smoothOrigin:true})
      // .to("#basket", 1, {rotation:"+=30", transformOrigin:"0px 0px"});   
      // .add("rotate1")         
      // .to("#basket", 0.3, {rotation:"-=10", transformOrigin:"right bottom"}, "rotate1")
      // .add("rotate2")
      // .to("#basket", 1, {rotation:"+=10", transformOrigin:"right bottom"}, "rotate2")
      .to("#basket", 1, {y:-10, rotation:10, ease:"theWiggle"}, "-=0.6")
      .to("#redEggBasket", 2 ,{x:10, y: 100, ease:Power2.easeOut}, "-=0.8")
      
      return bunnyHandTl;
    
  }




  function go() {
    console.log('hey...')
    var masterTl  = new TimelineMax();
    masterTl 
    .add(clearStage(), 'scene-clear-stage')
    .add(enterFloorVegetation(), 'scene-floor-vegetation')
    // .add(birdsEating(), "birds-eating")
    .add(cloudsMoving(),  'clouds-moving')
    .add( flowerDance(), 0)
    .add(bunnyHand(), 'bunny-hand')
    
    .add(bunnyInTheBack(), 'bunny-in-the-back')
    .add(eggsShaking(), 'eggs-shaking')
    ;
    
  }
 
  go();
}

document.addEventListener('DOMContentLoaded',main)




