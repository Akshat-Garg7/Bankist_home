'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelectorAll('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const section1=document.getElementById('section--1');
const button=document.querySelector('.btn--scroll-to');
const nav=document.querySelector('.nav');
const header=document.querySelector('.header');

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

btnsOpenModal.forEach(btn=>btn.addEventListener('click', openModal));

btnCloseModal.forEach(btn => btn.addEventListener('click', closeModal));
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
button.addEventListener('click',function()
{
  section1.scrollIntoView({behavior:'smooth'});
});

// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click',function(event)
//   {
//     event.preventDefault();
//     const id=this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior:'smooth'});
//     console.log(id);
//   });
// });

document.querySelector('.nav__links').addEventListener('click',function(event)
{
  event.preventDefault();
  if(event.target.classList.contains('nav__link'))
  {
    const id=event.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:'smooth'});
  }
})


const tabs=document.querySelectorAll('.operations__tab');
const tabsContainer=document.querySelector('.operations__tab-container');
const tabsContent=document.querySelectorAll('.operations__content');
tabsContainer.addEventListener('click',function(event)
{
  const clicked=event.target.closest('.operations__tab');
  if(!clicked) return;
  tabs.forEach(t=>t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  tabsContent.forEach(c=>c.classList.remove('operations__content--active'));
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});
const handleHover=function(event)
{
  if(event.target.classList.contains('nav__link'))
    {
      const link=event.target;
      const siblings=link.closest('.nav').querySelectorAll('.nav__link');
      const logo=link.closest('.nav').querySelector('img');
      siblings.forEach(el=>{
        if(el!==link) el.style.opacity=this;
      });
      logo.style.opacity=this;
    }
  
}

nav.addEventListener('mouseover',handleHover.bind(0.5));
nav.addEventListener('mouseout',handleHover.bind(1));

const navHeight=nav.getBoundingClientRect().height;


const stickyNav=function(entries)
{
  const [entry]=entries;
  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
  
}
const headerObserver=new IntersectionObserver(stickyNav,{
  root:null,
  threshold:0,
  rootMargin:`-${navHeight}px`,
});
headerObserver.observe(header);

const allSections=document.querySelectorAll('.section');
const revealSection=function(entries,observer)
{
  entries.forEach(entry=>
  {
    if(!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  }
  )
}

const sectionObserver=new IntersectionObserver(revealSection,{
  root:null,
  threshold:0.10,
});
allSections.forEach(function(section)
{
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});


const imgTargets=document.querySelectorAll('img[data-src]');

const loadImg=function(entries,observer)
{
  entries.forEach(entry=>{
    if(!entry.isIntersecting) return;
    entry.target.src=entry.target.dataset.src;
    entry.target.addEventListener('load',function()
    {
      entry.target.classList.remove('lazy-img');
    });
  })
}
const imgObserver=new IntersectionObserver(loadImg,{
  root:null,
  threshold:0.1,
});
imgTargets.forEach(img=> imgObserver.observe(img));

const slides=document.querySelectorAll('.slide');
const btnRight=document.querySelector('.slider__btn--right');
const btnLeft=document.querySelector('.slider__btn--left');
let currSlide=0;
const maxSlide=slides.length;


const goToSlide=function(slide)
{
  slides.forEach((s,i)=>
  {
    s.style.transform=`translateX(${100*(i-slide)})%`
  });
};
goToSlide(0);
const nextSlide=function()
{
  if(currSlide===maxSlide-1) currSlide=0;
  else currSlide++;
  goToSlide(currSlide);
};
const prevSlide=function()
{
  if(currSlide===-1) currSlide=maxSlide-1;
  else currSlide--;
  goToSlide(currSlide);
};
btnRight.addEventListener('click',nextSlide);
btnLeft.addEventListener('click',prevSlide);