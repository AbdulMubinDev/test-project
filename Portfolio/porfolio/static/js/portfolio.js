// Portfolio page blobs
(function(){
	const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const containerId = 'portfolio-blobs';
	const container = document.getElementById(containerId);
	if(!container) return;

	function rand(min, max){ return Math.random()*(max-min)+min }

	function createBlobs(){
		container.innerHTML = '';
		const count = prefersReduced ? 3 : 7;
		for(let i=0;i<count;i++){
			const b = document.createElement('div');
			b.className = 'blob';
			b.style.setProperty('--b-size', rand(140,360)+'px');
			b.style.setProperty('--b-x', rand(-10,110)+'%');
			b.style.setProperty('--b-y', rand(-20,90)+'%');
			b.style.setProperty('--b-dur', rand(12,28)+'s');
			container.appendChild(b);
		}
	}

	let t;
	function onResize(){ clearTimeout(t); t = setTimeout(createBlobs, 250) }

	if(!prefersReduced) window.addEventListener('resize', onResize);
	createBlobs();
})();
