
        /* -------------------------------------------------------------
           1. NAVIGATION SYSTEM & ROUTING
        ------------------------------------------------------------- */
        // Static multi-page navigation: every menu item is an actual HTML page.
        const pages = {home:'index.html',presentation:'presentation.html',popculture:'popculture.html',history:'history.html',bushido:'bushido.html',arsenal:'arsenal.html',warriors:'warriors.html',culture:'culture.html'};
        function navigateTo(page) { window.location.href = pages[page] || 'index.html'; }
        document.addEventListener('DOMContentLoaded', () => {
            initSlideshowDots();
            const mobile = document.getElementById('mobile-menu-btn');
            const menu = document.getElementById('mobile-menu');
            if(mobile && menu) {
                mobile.addEventListener('click', () => {
                    const opened = menu.classList.toggle('hidden');
                    mobile.setAttribute('aria-expanded', String(!opened));
                });
            }
        });

        /* -------------------------------------------------------------
           2. PRESENTATION / SLIDESHOW SYSTEM (15 SLIDES)
        ------------------------------------------------------------- */
        let currentSlide = 0;
        const totalSlides = 15;
        let autoplayInterval = null;

        function updateSlide() {
            const slides = document.querySelectorAll('.slide-item');
            slides.forEach((s, idx) => {
                if (idx === currentSlide) {
                    s.classList.add('active-slide');
                } else {
                    s.classList.remove('active-slide');
                }
            });

            // Update Progress Bar
            const progress = document.getElementById('slide-progress');
            if (progress) {
                progress.style.width = `${((currentSlide + 1) / totalSlides) * 100}%`;
            }

            // Update Counter Text
            const counter = document.getElementById('slide-counter');
            if (counter) counter.innerText = `Slajd ${currentSlide + 1} z ${totalSlides}`;

            // Update Dots
            const dots = document.querySelectorAll('.slide-dot');
            dots.forEach((dot, idx) => {
                if (idx === currentSlide) {
                    dot.setAttribute('aria-current', 'step');
                    dot.className = 'slide-dot w-5 h-2 rounded-full bg-samurai-gold transition-all';
                } else {
                    dot.removeAttribute('aria-current');
                    dot.className = 'slide-dot w-2 h-2 rounded-full bg-white/20 transition-all cursor-pointer hover:bg-white/50';
                }
            });
        }

        function initSlideshowDots() {
            const dotsContainer = document.getElementById('slide-dots');
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('button');
                dot.type='button';
                dot.setAttribute('aria-label', `Przejdź do slajdu ${i + 1}`);
                dot.title = `Slajd ${i + 1}`;
                dot.onclick = () => { currentSlide = i; updateSlide(); };
                dotsContainer.appendChild(dot);
            }
            updateSlide();
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlide();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlide();
        }

        function toggleAutoplay() {
            const btnText = document.getElementById('autoplay-text');
            const btnIcon = document.getElementById('autoplay-icon');

            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
                if (btnText) btnText.innerText = 'Autoplay';
                if (btnIcon) btnIcon.textContent = '▶';
            } else {
                autoplayInterval = setInterval(nextSlide, 5000);
                if (btnText) btnText.innerText = 'Pauza';
                if (btnIcon) btnIcon.textContent = 'Ⅱ';
            }
        }

        function toggleFullscreenPresentation() {
            const pBox = document.getElementById('presentation-box');
            if (pBox) {
                pBox.classList.toggle('presentation-fullscreen');
            }
        }

        // Keyboard Arrow Navigation for Slideshow
        window.addEventListener('keydown', (e) => {
            const activeView = document.querySelector('.page-view.active-view');
            if (e.key==='Escape') {closePopModal();document.getElementById('presentation-box')?.classList.remove('presentation-fullscreen');}
            if (activeView && activeView.id === 'view-presentation' && !['INPUT','TEXTAREA'].includes(document.activeElement?.tagName)) {
                if (e.key === 'ArrowRight') nextSlide();
                if (e.key === 'ArrowLeft') prevSlide();
            }
        });

        /* -------------------------------------------------------------
           3. POPCULTURE CATALOG FILTERING & MODAL DATA
        ------------------------------------------------------------- */
        const popData = {
            'got': {
                title: 'Ghost of Tsushima',
                type: 'Gra Wideo',
                studio: 'Sucker Punch Productions (2020)',
                rating: '9.5 / 10',
                accuracy: 'Wysoka (z elementami romantyzowanymi)',
                desc: 'Akcja gry rozgrywa się podczas pierwszej inwazji Mongołów na Japonię w 1274 roku. Gracz wciela się w Jina Sakai, samuraja z Cuszimy, który zmuszony jest porzucić tradycyjny sztywny kodeks honoru, by stworzyć taktykę walki z ukrycia jako "Duch".',
                historicalContext: 'Mimo że miecze Katana w kształcie znanym z gry rozpowszechniły się nieco później, gra wybitnie oddaje realia geograficzne wyspy Cuszima, brutalność najazdu mongolskiego oraz dylematy moralne rycerstwa.',
                recommendation: 'Must-play dla każdego fana estetyki samurajskiej i filmów Akiry Kurosawy (gra posiada dedykowany tryb Kurosawa Mode).',
                more: "Motyw konfliktu obowiązku i skuteczności to przede wszystkim konstrukcja fabularna. Historyczni wojownicy posługiwali się różnorodnymi metodami, a współczesny obraz bushidō nie obowiązywał wtedy w jednej ustalonej formie."
            },
            'shogun2024': {
                title: 'Shōgun (2024)',
                type: 'Serial Telewizyjny',
                studio: 'FX / Disney+ (2024)',
                rating: '9.8 / 10',
                accuracy: 'Wybitna / Bardzo Wysoka',
                desc: 'Superprodukcja oparta na powieści Jamesa Clavella. Angielski żeglarz John Blackthorne rozbija się u wybrzeży Japonii w roku 1600. Trafia w sam środek bezwzględnej walki politycznej Lorda Yoshii Toranagi o władzę nad całym państwem.',
                historicalContext: 'Postać Toranagi bezpośrednio wzorowana jest na Tokugawie Ieyasu, a postać Blackthorne\'a na Williamie Adamsie — pierwszym angielskim samuraju. Serial zachwyca dbałością o etykietę dworską, językową i kostiumograficzną.',
                recommendation: 'Jeden z najlepszych seriali historycznych w historii telewizji.',
                more: "Świetnym punktem odniesienia jest bitwa pod Sekigaharą w 1600 roku, która poprzedziła ustanowienie szogunatu Tokugawów. Serial celowo zmienia nazwy części postaci i wydarzeń."
            },
            'sevensamurai': {
                title: 'Siedmiu Samurajów',
                type: 'Film Kinowy (Klasyk)',
                studio: 'Reż. Akira Kurosawa (1954)',
                rating: '10 / 10',
                accuracy: 'Legendarna i realistyczna',
                desc: 'Arcydzieło światowej kinematografii. Wieśniacy nękani przez bandytów wynajmują siedmiu roninów, którzy za miskę ryżu godzą się bronić ich osady.',
                historicalContext: 'Kurosawa perfekcyjnie ukazał dolę bezpańskich samurajów w chaotycznej erze Sengoku oraz głęboką przepaść społeczną między chłopstwem a stanem rycerskim.',
                recommendation: 'Kamień milowy kina wojennego, który zainspirował m.in. "Siedmiu Wspaniałych" i "Gwiezdne Wojny".',
                more: "Film zainspirował liczne historie o grupie bohaterów zebranych do wspólnego zadania. Akira Kurosawa zwraca również uwagę na trudną sytuację mieszkańców wsi i różnice klasowe."
            },
            'sekiro': {
                title: 'Sekiro: Shadows Die Twice',
                type: 'Gra Wideo',
                studio: 'FromSoftware (2019)',
                rating: '9.6 / 10',
                accuracy: 'Dark Fantasy (Inspirowane Historią)',
                desc: 'Gra akcji nastawiona na niesamowicie precyzyjny system parowania oręża. Wcielamy się w jednorękiego shinobi o imieniu Wilk, obiecującego ochronę młodemu panu powiązanemu z tajemnicą nieśmiertelności.',
                historicalContext: 'Choć gra nasączona jest demonologią i mitologią japońską, realia architektury zamkowej oraz mechanika walki kataną bazują na autentycznych technikach.',
                recommendation: 'Wymagające, ale niezwykle satysfakcjonujące doświadczenie dla graczy.',
                more: "W Sekiro pojawiają się potwory, nadnaturalne moce i fikcyjne krainy. Z tego powodu estetyka może nawiązywać do historii, ale świat przedstawiony nie jest odtworzeniem dawnej Japonii."
            },
            'lastsamurai': {
                title: 'Ostatni Samuraj',
                type: 'Film Hollywoodzki',
                studio: 'Reż. Edward Zwick (2003)',
                rating: '8.8 / 10',
                accuracy: 'Średnia (Fabularyzowana)',
                desc: 'Amerykański weteran wojenny Nathan Algren przybywa do Japonii, by szkolić nowoczesną armię cesarską. Pojmany przez zbuntowanych samurajów pod wodzą Katsumoto, zaczyna pojmować i szanować ich tradycyjny styl życia.',
                historicalContext: 'Inspirowane Buntem w Satsumie z 1877 roku i postacią Saigō Takamoriego. Film idealizuje stan samurajski, lecz posiada genialną muzykę Hansa Zimmera.',
                recommendation: 'Porywające widowisko filmowe ze świetną rolą Kena Watanabe.',
                more: "Konflikt między tradycją a reformami jest realnym tematem historii Japonii XIX wieku, jednak film upraszcza zróżnicowane postawy dawnych samurajów wobec modernizacji."
            },
            'blueeye': {
                title: 'Niebieskooki Samuraj',
                type: 'Serial Animowany',
                studio: 'Netflix (2023)',
                rating: '9.4 / 10',
                accuracy: 'Wysoka (Koncepcja & Tło)',
                desc: 'Dojrzały, porywający serial animowany o mistrzyni miecza Mizu, która szuka zemsty na czterech białych mężczyznach nielegalnie przebywających w odizolowanej Japonii ery Edo.',
                historicalContext: 'Świetne przedstawienie realności polityki izolacjonizmu (Sakoku), sztuki kowalskiej oraz roli kobiet w dawnej Japonii.',
                recommendation: 'Jeden z najlepiej ocenianych seriali animowanych ostatnich lat.',
                more: "Serial świadomie korzysta z alternatywnej opowieści i współczesnych tematów tożsamości. Polityka sakoku istniała naprawdę, ale jej funkcjonowanie było bardziej złożone niż całkowite odcięcie Japonii od świata."
            }
        };

        function filterPopculture(type) {
            document.querySelectorAll('.pop-filter-btn').forEach(btn => {
                btn.className = 'pop-filter-btn px-5 py-2.5 rounded-xl bg-samurai-card border border-white/10 text-samurai-text hover:border-samurai-gold transition-all';
            });
            const activeBtn = document.getElementById(`pop-filter-${type}`);
            if (activeBtn) {
                activeBtn.className = 'pop-filter-btn px-5 py-2.5 rounded-xl bg-samurai-gold text-black font-bold transition-all';
            }

            const cards = document.querySelectorAll('.pop-card');
            cards.forEach(card => {
                if (type === 'all' || card.dataset.type === type) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        function openPopModal(key) {
            const data = popData[key];
            if (!data) return;

            const modalContent = document.getElementById('pop-modal-content');
            modalContent.innerHTML = `
                <div class="flex items-center space-x-3 mb-4">
                    <span class="bg-samurai-red/20 text-samurai-red border border-samurai-red/30 px-3 py-1 rounded text-xs font-cinzel font-bold">${data.type}</span>
                    <span class="text-samurai-gold text-xs font-cinzel font-bold">★ ${data.rating}</span>
                </div>
                <h2 class="font-cinzel text-3xl font-black text-white mb-1">${data.title}</h2>
                <span class="text-xs text-samurai-muted font-cinzel block mb-6">${data.studio}</span>

                <div class="space-y-6 text-sm text-samurai-muted leading-relaxed">
                    <div>
                        <h4 class="font-cinzel text-white text-base font-bold mb-2">Opis Fabuły & Dzieła:</h4>
                        <p>${data.desc}</p>
                    </div>

                    <div class="bg-samurai-bg p-5 rounded-2xl border border-white/5">
                        <h4 class="font-cinzel text-samurai-gold text-sm font-bold mb-2">Tło i Zgodność Historyczna:</h4>
                        <p class="text-xs text-samurai-text mb-2"><strong class="text-white">Poziom zgodności:</strong> ${data.accuracy}</p>
                        <p class="text-xs leading-relaxed">${data.historicalContext}</p>
                    </div>

                    <div>
                        <h4 class="font-cinzel text-white text-base font-bold mb-2">Dodatkowe informacje:</h4>
                        <p>${data.more || 'Dzieło łączy opowieść fabularną z inspiracjami historycznymi.'}</p>
                    </div>
                    <div>
                        <h4 class="font-cinzel text-white text-base font-bold mb-1">Rekomendacja:</h4>
                        <p class="italic text-xs text-samurai-goldLight">${data.recommendation}</p>
                    </div>
                </div>
            `;

            const container = document.getElementById('pop-modal-container');
            container.classList.remove('hidden');
            container.classList.add('flex');
            document.body.style.overflow = 'hidden';
            container.setAttribute('role','dialog');
            container.setAttribute('aria-modal','true');
            document.querySelector('#pop-modal-container button')?.focus();
        }

        function closePopModal() {
            const container = document.getElementById('pop-modal-container');
            if(!container)return;
            container.classList.add('hidden');
            container.classList.remove('flex');
            document.body.style.overflow = '';
        }

        document.getElementById('pop-modal-container')?.addEventListener('click', (e) => {
            if (e.target.id === 'pop-modal-container') closePopModal();
        });


        /* -------------------------------------------------------------
           4. SAKURA: visible as soon as the page opens, scalable and safe
        ------------------------------------------------------------- */
        (() => {
          const canvas = document.getElementById('sakura-canvas');
          if (!canvas) return;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          const control = document.getElementById('toggle-sakura');
          const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
          let enabled = !reduceMotion.matches;
          let petals = [];
          let w = 0, h = 0, raf = null, last = 0;
          const rand = (min,max) => min + Math.random()*(max-min);
          function spawn(onScreen = false) {
            return {x:rand(-40,w+40),y:onScreen?rand(0,h):rand(-130,-10),size:rand(4.5,10),vy:rand(.55,1.6),vx:rand(-.48,.35),rot:rand(-3,3),phase:rand(0,7),spin:rand(-.027,.027),alpha:rand(.48,.88)};
          }
          function sizeCanvas() {
            w = Math.max(1,window.innerWidth);h = Math.max(1,window.innerHeight);
            const dpr = Math.min(window.devicePixelRatio||1,2);
            canvas.width = Math.round(w*dpr);canvas.height=Math.round(h*dpr);
            canvas.style.width=w+'px';canvas.style.height=h+'px';
            ctx.setTransform(dpr,0,0,dpr,0,0);
            petals = Array.from({length:w<650?26:53},()=>spawn(true));
          }
          function drawPetal(p) {
            ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);
            ctx.globalAlpha=p.alpha;
            ctx.fillStyle='#ffb3c8';
            ctx.beginPath();ctx.moveTo(0,0);
            ctx.bezierCurveTo(-p.size,-p.size*.65,-p.size*1.25,p.size*.8,0,p.size*1.4);
            ctx.bezierCurveTo(p.size*.8,p.size*.75,p.size*1.1,-p.size*.5,0,0);
            ctx.fill();ctx.restore();
          }
          function animate(t) {
            raf=requestAnimationFrame(animate);
            if(!enabled || document.hidden) {last=t;return;}
            const delta=Math.min((t-(last||t))/16.67,2);last=t;
            ctx.clearRect(0,0,w,h);
            for (let i=0;i<petals.length;i++) {
              const p=petals[i];p.y+=p.vy*delta;p.x+=(p.vx+Math.sin(p.y*.012+p.phase)*.3)*delta;p.rot+=p.spin*delta;
              drawPetal(p);
              if(p.y>h+25||p.x<-60||p.x>w+60)petals[i]=spawn();
            }
          }
          const updateButton=()=>{
            document.body.classList.toggle('sakura-pause',!enabled);
            control?.setAttribute('aria-pressed',String(enabled));
            const caption=control?.querySelector('span');
            if(caption) caption.textContent='Sakura: '+(enabled?'ON':'OFF');
          };
          control?.addEventListener('click',()=>{enabled=!enabled;updateButton();if(!enabled)ctx.clearRect(0,0,w,h)});
          if(reduceMotion.addEventListener)reduceMotion.addEventListener('change',e=>{enabled=!e.matches;updateButton();});
          let resizeDebounce=0;
          window.addEventListener('resize',()=>{clearTimeout(resizeDebounce);resizeDebounce=setTimeout(sizeCanvas,120)},{passive:true});
          sizeCanvas();updateButton();raf=requestAnimationFrame(animate);
        })();

        /* -------------------------------------------------------------
           5. Smooth interactions; content visible even without JavaScript
        ------------------------------------------------------------- */
        (() => {
          if('scrollRestoration' in history) history.scrollRestoration='manual';
          const progress=document.getElementById('scroll-progress');
          const topButton=document.getElementById('back-to-top');
          function onScroll(){
            const el=document.documentElement;
            const max=Math.max(1,el.scrollHeight-innerHeight);
            if(progress) progress.style.width=(100*window.scrollY/max)+'%';
            topButton?.classList.toggle('visible',window.scrollY>420);
          }
          window.addEventListener('scroll',onScroll,{passive:true});
          window.addEventListener('resize',onScroll,{passive:true});onScroll();
          topButton?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
          if(!window.location.hash){window.scrollTo(0,0);}
          if('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
            const observer=new IntersectionObserver((entries)=>{
              entries.forEach(({target,isIntersecting})=>{
                if(isIntersecting){target.classList.add('is-visible');observer.unobserve(target);}
              });
            },{threshold:.08,rootMargin:'0px 0px -30px 0px'});
            document.querySelectorAll('.reveal-on-scroll').forEach((el)=>observer.observe(el));
          }
          const modal=document.getElementById('pop-modal-container');
          if(modal && !modal.classList.contains('hidden')) modal.classList.add('hidden');
          document.querySelectorAll('#mobile-menu a').forEach(link=>link.addEventListener('click',()=>document.getElementById('mobile-menu')?.classList.add('hidden')));
        })();
