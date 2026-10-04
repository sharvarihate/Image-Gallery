// Replace the thumb/full URLs with your own images (e.g. images/photo1.jpg) if you like.
const images = [
    {id:10, cat:"nature",  title:"Forest path"},
    {id:29, cat:"nature",  title:"Mountain lake"},
    {id:15, cat:"nature",  title:"Waterfall"},
    {id:1031,cat:"city",   title:"City street"},
    {id:1067,cat:"city",   title:"Skyline at dusk"},
    {id:1043,cat:"city",   title:"Old town"},
    {id:237, cat:"animals",title:"Puppy"},
    {id:1074,cat:"animals",title:"Lion"},
    {id:169, cat:"animals",title:"Bird on branch"}
  ].map(i => ({...i, thumb:`https://picsum.photos/id/${i.id}/500/375`, full:`https://picsum.photos/id/${i.id}/1200/900`}));
  
  const gallery = document.getElementById("gallery");
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lb-img");
  const lbCap = document.getElementById("lb-cap");
  let visible = [], current = 0;
  
  images.forEach((img, i) => {
    const el = document.createElement("div");
    el.className = "item"; el.tabIndex = 0; el.dataset.cat = img.cat; el.dataset.index = i;
    el.innerHTML = `<img src="${img.thumb}" alt="${img.title}" loading="lazy"><span>${img.title}</span>`;
    gallery.appendChild(el);
  });
  const items = [...document.querySelectorAll(".item")];
  
  function applyFilter(f){
    items.forEach(el => el.classList.toggle("hide", f !== "all" && el.dataset.cat !== f));
    visible = items.filter(el => !el.classList.contains("hide")).map(el => +el.dataset.index);
  }
  document.querySelector(".filters").addEventListener("click", e => {
    if(e.target.tagName !== "BUTTON") return;
    document.querySelectorAll(".filters button").forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    applyFilter(e.target.dataset.filter);
  });
  applyFilter("all");
  
  function show(pos){
    current = (pos + visible.length) % visible.length;
    const img = images[visible[current]];
    lbImg.src = img.full; lbImg.alt = img.title;
    lbCap.textContent = `${img.title} (${current + 1}/${visible.length})`;
  }
  function open(index){ show(visible.indexOf(index)); lightbox.hidden = false; }
  function close(){ lightbox.hidden = true; }
  
  gallery.addEventListener("click", e => { const it = e.target.closest(".item"); if(it) open(+it.dataset.index); });
  gallery.addEventListener("keydown", e => { if(e.key === "Enter"){ const it = e.target.closest(".item"); if(it) open(+it.dataset.index); }});
  lightbox.querySelector(".prev").onclick = () => show(current - 1);
  lightbox.querySelector(".next").onclick = () => show(current + 1);
  lightbox.querySelector(".close").onclick = close;
  lightbox.addEventListener("click", e => { if(e.target === lightbox) close(); });
  document.addEventListener("keydown", e => {
    if(lightbox.hidden) return;
    if(e.key === "Escape") close();
    if(e.key === "ArrowLeft") show(current - 1);
    if(e.key === "ArrowRight") show(current + 1);
  });