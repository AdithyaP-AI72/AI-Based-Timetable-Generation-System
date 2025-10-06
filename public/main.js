function toast(message){
  const el = document.getElementById('toast');
  if(!el) return; el.textContent = message; el.classList.remove('hidden');
  el.classList.add('show');
  setTimeout(()=>{ el.classList.remove('show'); setTimeout(()=>el.classList.add('hidden'), 250); }, 2200);
}

document.addEventListener('click', (e)=>{
  const t = e.target.closest('[data-open-toast]');
  if(t){ e.preventDefault(); toast('Coming soon'); }
});

async function postJSON(url, body){
  const res = await fetch(url, { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(body) });
  if(!res.ok) throw new Error('Request failed');
  return res.json();
}

// Dashboard handlers
document.addEventListener('DOMContentLoaded', ()=>{
  const genForm = document.getElementById('gen-form');
  if(genForm){
    const loader = document.getElementById('gen-loader');
    const out = document.getElementById('gen-result');
    genForm.addEventListener('submit', async (e)=>{
      e.preventDefault();
      loader.classList.remove('hidden');
      const fd = new FormData(genForm);
      const semester = fd.get('semester') || 'demo';
      const programs = (fd.get('programs')||'').split(',').map(s=>s.trim()).filter(Boolean);
      try{
        const data = await postJSON('/api/generate', { semester, programs, constraints:{}, priorities:{} });
        out.textContent = JSON.stringify(data, null, 2);
        toast('Generation complete');
      }catch(err){ toast('Failed to generate'); }
      finally{ loader.classList.add('hidden'); }
    });

    document.querySelectorAll('[data-load]').forEach(btn=>{
      btn.addEventListener('click', async ()=>{
        const type = btn.getAttribute('data-load');
        const map = { courses: '/api/data/courses', students:'/api/data/students', faculty:'/api/data/faculty' };
        const targetId = type+'-list';
        const ul = document.getElementById(targetId);
        ul.innerHTML = '';
        try{
          const res = await fetch(map[type]);
          const list = await res.json();
          list.slice(0,20).forEach(item=>{
            const li = document.createElement('li');
            li.textContent = item.title || item.name || item.code;
            ul.appendChild(li);
          });
          toast('Loaded '+type);
        }catch{ toast('Failed to load '+type); }
      });
    });
  }

  // Timetable page
  const grid = document.getElementById('grid');
  const loadBtn = document.getElementById('load-tt');
  if(grid && loadBtn){
    loadBtn.addEventListener('click', async ()=>{
      const sem = document.getElementById('semester').value || 'demo';
      grid.classList.add('shimmer'); grid.innerHTML = '';
      try{
        const res = await fetch('/api/timetable/'+encodeURIComponent(sem));
        const items = await res.json();
        const days = ['Mon','Tue','Wed','Thu','Fri'];
        const slots = ['09:00','10:00','11:00','12:00','14:00'];
        grid.style.gridTemplateColumns = `repeat(${days.length},1fr)`;
        // Header row
        days.forEach(d=>{
          const h = document.createElement('div'); h.className='tt-cell'; h.innerHTML = `<strong>${d}</strong>`; grid.appendChild(h);
        });
        // Cells with simple animation
        for(let i=0;i<slots.length;i++){
          for(let j=0;j<days.length;j++){
            const cell = document.createElement('div');
            cell.className = 'tt-cell fade-in';
            cell.style.animationDelay = `${(i*days.length+j)*0.015}s`;
            const match = items.find(x=> x.day===days[j] && x.startTime===slots[i]);
            cell.innerHTML = match ? `<div>${match.course||''}</div><span class='tt-badge'>${slots[i]}</span>` : `<span class='tt-badge'>${slots[i]}</span>`;
            grid.appendChild(cell);
          }
        }
        toast('Timetable loaded');
      }catch{ toast('Failed to load timetable'); }
      finally{ grid.classList.remove('shimmer'); }
    });
  }
});


