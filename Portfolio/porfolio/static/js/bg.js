(function(){
  const root = document.createElement('div');
  root.className = 'global-bg';
  root.innerHTML = `
    <div class="bg-layer layer-1"></div>
    <div class="bg-layer layer-2"></div>
    <div class="particles" id="global-particles"></div>
  `;
  document.body.insertBefore(root, document.body.firstChild);

  const container = document.getElementById('global-particles');
  if(!container) return;

  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const count = prefersReduced ? 3 : Math.max(4, Math.floor(window.innerWidth / 320));

  function rand(min,max){return Math.random()*(max-min)+min}

  function createParticles(){
    container.innerHTML = '';
    for(let i=0;i<count;i++){
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.round(rand(80,260));
      const left = Math.round(rand(-20,90));
      const top = Math.round(rand(-30,90));
      const dur = (rand(12,36)).toFixed(2)+'s';
      const op = (rand(0.35,0.85)).toFixed(2);
      p.style.setProperty('--p-size', size+'px');
      p.style.setProperty('--p-left', left+'%');
      p.style.setProperty('--p-top', top+'%');
      p.style.setProperty('--p-dur', dur);
      p.style.setProperty('--p-op', op);
      container.appendChild(p);
    }
  }

  createParticles();
  let t;
  window.addEventListener('resize', ()=>{clearTimeout(t);t=setTimeout(createParticles,220)});
})();
