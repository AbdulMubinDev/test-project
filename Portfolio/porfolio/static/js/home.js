// home.js — generate liquid blobs and a subtle parallax on pointer move
(function(){
  const container = document.getElementById('home-blobs');
  if(!container) return;

  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const count = prefersReduced ? 3 : (window.innerWidth > 1400 ? 6 : 4);

  function rand(min,max){return Math.random()*(max-min)+min}

  function createBlobs(){
    container.innerHTML = '';
    for(let i=0;i<count;i++){
      const el = document.createElement('div');
      el.className = 'blob';
      const size = Math.round(rand(140,420));
      const left = Math.round(rand(-20, 80));
      const top = Math.round(rand(-30, 70));
      const dur = (rand(12, 30)).toFixed(2)+'s';
      el.style.setProperty('--b-size', size+'px');
      el.style.setProperty('--b-x', left+'%');
      el.style.setProperty('--b-y', top+'%');
      el.style.setProperty('--b-dur', dur);
      el.style.opacity = (rand(0.55,0.95)).toFixed(2);
      container.appendChild(el);
    }
  }

  createBlobs();

  // parallax grid on pointer move
  const grid = document.querySelector('.grid-bg');
  if(grid){
    window.addEventListener('pointermove', (e)=>{
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      grid.style.transform = `translate3d(${x*20}px, ${y*20}px, 0)`;
    });
  }

  // regenerate on resize debounce
  let t;
  window.addEventListener('resize', ()=>{
    clearTimeout(t);
    t = setTimeout(()=>createBlobs(),250);
  });
})();
