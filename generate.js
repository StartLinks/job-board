const fs=require('fs'),path=require('path');
const code=fs.readFileSync(path.join(__dirname,'js/data.js'),'utf8');
const fn=new Function(code+'; return {JOBS,makeAv,extSvgSm};');
const {JOBS,makeAv,extSvgSm}=fn();

const LOGOS={
  'Chatcut':'chatcut.png',
  'Cherry Studio':'cherry-studio.png',
  'Evomap':'evomap.png',
  'Floatboat':'floatboat.png',
  'Humanify':'humanify.png',
  'InsForge':'insforge.png',
  'Kuku':'kuku.png',
  'SP1':'sp1.svg',
  'Skyris':'skyris.png',
  'Tripo':'tripo.png',
  '万物时':'wanwushi.png'
};

const dir=path.join(__dirname,'jobs');
fs.mkdirSync(dir,{recursive:true});

JOBS.forEach((j,idx)=>{
  const pb=makeAv(idx*13+2);
  const websiteLink=j.website?`<a href="${j.website}" target="_blank" style="color:#3185fc;font-size:.85rem">${j.website}</a>`:'';
  const logoFile=LOGOS[j.team];
  const logoHtml=logoFile
    ?`<img src="../logos/${logoFile}" style="width:100%;height:100%;object-fit:contain;display:block;border-radius:12px" onerror="this.style.display='none'">`
    :j.ic;
  const detailBg=logoFile?'background:transparent':`background:${j.c}`;

  const html=`<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${j.pos} — ${j.team} | Open Roles</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&family=Noto+Sans+SC:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>
  <header class="nav">
    <nav class="nav-in">
      <ul class="nav-links">
        <li><a href="../index.html" class="active">we are hiring</a></li>
      </ul>
    </nav>
  </header>

  <div class="modal-overlay" id="modalOverlay">
    <div class="modal-box">
      <button class="modal-close" id="modalClose">&#x2715;</button>
      <img src="../images/apply-poster.jpg" alt="投递方式">
    </div>
  </div>

  <div class="detail-wrap">
    <a href="../index.html" class="bk">&larr; 返回职位列表</a>

    <div class="dt-top">
      <div>
        <div class="dt-co">
          <div class="dt-ci" style="${detailBg}">${logoHtml}</div>
          <span class="dt-cn">${j.team} ${j.website?extSvgSm:''}</span>
        </div>
        <h1 class="dt-t">${j.pos}</h1>
      </div>
      <button class="btn-a" id="applyBtn">投递岗位</button>
    </div>

    <div class="tags">${j.tags.map(t=>'<span class="tag">'+t+'</span>').join('')}</div>

    <div>
      <div class="mr"><div class="ml">Posted by</div><div class="mv"><div class="avs">${pb}</div></div></div>
      <div class="mr"><div class="ml">Location</div><div class="mv"><strong>${j.loc}</strong></div></div>
${j.website?`      <div class="mr"><div class="ml">Website</div><div class="mv">${websiteLink}</div></div>`:``}
    </div>

    <div class="ds">
      <div class="ml" style="margin-bottom:16px">Description</div>
      <div class="db">${j.desc}</div>
    </div>
  </div>

  <footer class="ft">
    <span>&copy; 2026 Open Roles</span>
    <div style="display:flex;gap:20px"><a href="#">Privacy</a><a href="#">Terms</a></div>
  </footer>
  <script>
    const overlay=document.getElementById('modalOverlay');
    document.getElementById('applyBtn').addEventListener('click',()=>overlay.classList.add('open'));
    document.getElementById('modalClose').addEventListener('click',()=>overlay.classList.remove('open'));
    overlay.addEventListener('click',e=>{ if(e.target===overlay) overlay.classList.remove('open'); });
    document.addEventListener('keydown',e=>{ if(e.key==='Escape') overlay.classList.remove('open'); });
  </script>
</body>
</html>`;
  fs.writeFileSync(path.join(dir, j.id+'.html'), html);
  console.log('✓', j.team, '—', j.pos);
});
console.log('\nDone!', JOBS.length, 'pages generated.');
