
(() => {
  const slider = document.querySelector("[data-slider]");
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll(".hero-slide"));
  if (slides.length <= 1) return;

  let i = slides.findIndex(s => s.classList.contains("is-active"));
  if (i < 0) i = 0;

  setInterval(() => {
    slides[i].classList.remove("is-active");
    i = (i + 1) % slides.length;
    slides[i].classList.add("is-active");
  }, 4200);
})();


(() => {
  const revealEls = document.querySelectorAll(".reveal, [data-reveal]");
  if (!revealEls.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.16 });

  revealEls.forEach(el => io.observe(el));
})();



(() => {
  const about = document.querySelector('#nosotros.about');
  if (!about) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        about.classList.add('is-visible');

        
        about.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));

        io.unobserve(about);
      }
    });
  }, { threshold: 0.22 });

  io.observe(about);
})();


let index = 0;
const items = document.querySelectorAll(".testi-item");

function showTesti(i){
  items.forEach(el=>el.classList.remove("active"));
  items[i].classList.add("active");
}

function nextTesti(){
  index = (index+1) % items.length;
  showTesti(index);
}

function prevTesti(){
  index = (index-1+items.length)%items.length;
  showTesti(index);
}


(() => {
  const sections = document.querySelectorAll('.about, .team, .contact');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('is-visible');
    });
  }, { threshold: 0.25 });

  sections.forEach(s => io.observe(s));
})();

 (function(){
      const monthLabel = document.getElementById('monthLabel');
      const daysGrid = document.getElementById('daysGrid');
      const forDate = document.getElementById('forDate');
      const prevMonthBtn = document.getElementById('prevMonth');
      const nextMonthBtn = document.getElementById('nextMonth');

      // En páginas sin calendario, salir para no romper el resto del JS (ej. menú móvil)
      if (!monthLabel || !daysGrid || !forDate || !prevMonthBtn || !nextMonthBtn) return;

      
      let year = 2026, month = 1; // 

      const monthsEs = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
      const dowEs = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];

      function render(){
        monthLabel.textContent = monthsEs[month].charAt(0).toUpperCase() + monthsEs[month].slice(1) + " " + year;

        daysGrid.innerHTML = "";
        const first = new Date(year, month, 1);
        const start = first.getDay(); // 0 domingo
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // espacios vacíos
        for(let i=0;i<start;i++){
          const s = document.createElement('div');
          s.className = 'bk-day bk-day--empty';
          daysGrid.appendChild(s);
        }

        for(let d=1; d<=daysInMonth; d++){
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'bk-day';
          btn.textContent = d;

          
          const dot = document.createElement('span');
          dot.className = 'bk-dot';
          
          if([9,10,11,12,13,16,17,18,19,20,23,24,25,26,27].includes(d)){
            btn.classList.add('bk-day--has');
          } else {
            dot.style.opacity = 0;
          }
          btn.appendChild(dot);

          btn.addEventListener('click', ()=>{
            document.querySelectorAll('.bk-day.is-active').forEach(x=>x.classList.remove('is-active'));
            btn.classList.add('is-active');

            const dt = new Date(year, month, d);
            forDate.textContent = dowEs[dt.getDay()] + ", " + d + " de " + monthsEs[month];
          });

          
          if(d===6){
            btn.classList.add('is-active');
            const dt = new Date(year, month, d);
            forDate.textContent = dowEs[dt.getDay()] + ", " + d + " de " + monthsEs[month];
          }

          daysGrid.appendChild(btn);
        }
      }

      prevMonthBtn.addEventListener('click', ()=>{
        month--;
        if(month<0){ month=11; year--; }
        render();
      });

      nextMonthBtn.addEventListener('click', ()=>{
        month++;
        if(month>11){ month=0; year++; }
        render();
      });

      render();
    })();

    (function () {
  const burger = document.querySelector(".nav-burger");
  const links = document.querySelector(".nav-links");
  if (!burger || !links) return;

  burger.addEventListener("click", () => {
    links.classList.toggle("is-open");
    const open = links.classList.contains("is-open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });

  
  links.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => links.classList.remove("is-open"));
  });
})();
