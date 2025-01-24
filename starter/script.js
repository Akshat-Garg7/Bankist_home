'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelectorAll('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const section1=document.getElementById('section--1');
const button=document.querySelector('.btn--scroll-to');


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