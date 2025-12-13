// small helper: capture nav links and bubble movement
    (function(){
      const nav = document.getElementById('navLinks');
      const bubble = document.getElementById('bubble');
      const links = Array.from(nav.querySelectorAll('a'));

      // position bubble under active link
      function moveBubbleTo(el){
        if(!el) return;
        const rect = el.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();
        const left = rect.left - navRect.left;
        // center bubble on element
        const w = Math.max(rect.width + 20, 110);
        bubble.style.width = w + 'px';
        bubble.style.transform = `translateX(${left - (w-rect.width)/2}px) translateY(-50%)`;
        bubble.style.opacity = '1';
      }

      // On load, activate first
      window.addEventListener('load', ()=>{
        // choose active based on location hash
        let active = links.find(a => a.getAttribute('href') === window.location.hash) || links[0];
        moveBubbleTo(active);
      });

      // link clicks -> move bubble
      links.forEach(a=>{
        a.addEventListener('click', (e)=>{
          // small delay to allow scroll-smooth to move
          moveBubbleTo(a);
        });
      });

      // on resize, reposition bubble
      window.addEventListener('resize', ()=> {
        const active = links.find(a => a.getAttribute('href') === window.location.hash) || links[0];
        moveBubbleTo(active);
      });

      // observe intersection to highlight bubble when scrolling
      const sections = links.map(l => document.querySelector(l.getAttribute('href')));
      const io = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
          if(entry.isIntersecting){
            const id = '#' + entry.target.id;
            const link = links.find(l => l.getAttribute('href') === id);
            if(link) moveBubbleTo(link);
          }
        });
      }, {rootMargin: '0px 0px -40% 0px', threshold: 0.25});
      sections.forEach(s => { if(s) io.observe(s); });

      // reveal animations on scroll
      const reveals = Array.from(document.querySelectorAll('.reveal'));
      const io2 = new IntersectionObserver((entries)=>{
        entries.forEach(e=>{
          if(e.isIntersecting) e.target.classList.add('visible');
        });
      }, {threshold:0.15});
      reveals.forEach(r => io2.observe(r));
    })();

    // quick contact form behavior (only demo)
    document.getElementById('contactForm').addEventListener('submit', function(e){
      e.preventDefault();
      document.getElementById('formNotice').style.display = 'block';
      setTimeout(()=>{ document.getElementById('formNotice').style.display='none'; }, 4000);
    });

    // set current year
    document.getElementById('year').textContent = (new Date()).getFullYear();

    // When visitor clicks "Voir les services" from hero, ensure bubble moves
    document.querySelectorAll('[data-target]').forEach(el=>{
      el.addEventListener('click', (ev)=>{
        const t = ev.currentTarget.getAttribute('data-target');
        setTimeout(()=> {
          const link = document.querySelector('#navLinks a[data-target="'+t+'"]');
          if(link) {
            // move bubble
            const evt = new Event('click');
            link.dispatchEvent(evt);
          }
        }, 250);
      }); 
    });



