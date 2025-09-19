// Create animated liquid blobs for about page
(function(){
    const container = document.getElementById('blobs');
    if(!container) return;

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const blobCount = (()=>{
        if(prefersReduced) return 3;
        const w = Math.max(window.innerWidth, 320);
        if(w > 1400) return 7;
        if(w > 1000) return 5;
        return 4;
    })();

    function rand(min, max){ return Math.random()*(max-min)+min }

    // Clear existing
    container.innerHTML = '';

    for(let i=0;i<blobCount;i++){
        const el = document.createElement('div');
        el.className = 'blob';
        // size 120 - 420
        const size = Math.round(rand(120, 420));
        const left = Math.round(rand(-20, 80));
        const top = Math.round(rand(-30, 70));
        const dur = (rand(10, 26)).toFixed(2) + 's';

        el.style.setProperty('--b-size', size+'px');
        el.style.setProperty('--b-x', left+'%');
        el.style.setProperty('--b-y', top+'%');
        el.style.setProperty('--b-dur', dur);

        // subtle individual opacity
        el.style.opacity = (rand(0.55,0.95)).toFixed(2);

        container.appendChild(el);
    }

    // Recreate on resize with debounce
    let timeout;
    window.addEventListener('resize', ()=>{
        clearTimeout(timeout);
        timeout = setTimeout(()=>{
            // Lightweight: only regenerate if viewport cross major breakpoints
            container.innerHTML='';
            const event = new Event('loadBlobs');
            window.dispatchEvent(event);
        }, 250);
    });

    window.addEventListener('loadBlobs', ()=>{
        (function createAgain(){
            const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const blobCount = (()=>{
                if(prefersReduced) return 3;
                const w = Math.max(window.innerWidth, 320);
                if(w > 1400) return 7;
                if(w > 1000) return 5;
                return 4;
            })();
            for(let i=0;i<blobCount;i++){
                const el = document.createElement('div');
                el.className = 'blob';
                const size = Math.round(rand(100, 420));
                const left = Math.round(rand(-20, 80));
                const top = Math.round(rand(-30, 70));
                const dur = (rand(10, 26)).toFixed(2) + 's';
                el.style.setProperty('--b-size', size+'px');
                el.style.setProperty('--b-x', left+'%');
                el.style.setProperty('--b-y', top+'%');
                el.style.setProperty('--b-dur', dur);
                el.style.opacity = (rand(0.55,0.95)).toFixed(2);
                container.appendChild(el);
            }
        })();
    });

    // Initial creation (after DOM ready)
    if(document.readyState === 'loading'){
        document.addEventListener('DOMContentLoaded', ()=>{
            window.dispatchEvent(new Event('loadBlobs'));
        });
    } else {
        window.dispatchEvent(new Event('loadBlobs'));
    }
})();
