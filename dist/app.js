const stages = [
  {price:'¥1,750,000',name:'Harry Winston',description:'Emerald-cut diamond'},
  {price:'¥1,550,000',name:'Cartier',description:'Pavé band, halo setting'},
  {price:'¥1,750,000',name:'Chaumet',description:'Joséphine pear tiara'},
  {price:'¥1,400,000',name:'Diamond',description:'A promise set in stone'},
  {price:'¥3',name:'Ribbon',description:''},
  {price:'¥0',name:'Can tab',description:''},
  {price:'¥0',name:'Dried grass',description:'The ring you made'},
  {price:'¥0',name:'Your hair',description:'Fallen, new roots grown in'},
  {price:'Priceless',name:'The time we spent together',description:''}
];
const input=document.querySelector('#level');
const imageRoot=document.querySelector('#images');
const images=stages.slice(0,-1).map((stage,i)=>{
  const img=new Image();img.src=`assets/ring-${i}.webp`;img.alt='';img.className=`ring${i===0?' active':''}`;img.draggable=false;imageRoot.append(img);return img;
});
const ticks=Array.from({length:81},()=>{const tick=document.createElement('span');tick.className='tick';document.querySelector('#ruler').append(tick);return tick});
let stageIndex=-1;
function render(){
  const progress=Number(input.value)/1000;
  const next=Math.min(stages.length-1,Math.floor(progress*stages.length));
  ticks.forEach((tick,i)=>{const distance=Math.abs(i/80-progress);tick.style.height=`${5+22*Math.exp(-Math.pow(distance/.035,2))}px`;tick.classList.toggle('current',distance<.0063)});
  if(next===stageIndex)return;
  stageIndex=next;
  const stage=stages[next];
  images.forEach((img,i)=>img.classList.toggle('active',i===next));
  document.body.classList.toggle('dark',next===stages.length-1);
  document.querySelector('#price').textContent=stage.price;
  document.querySelector('#name').textContent=stage.name;
  document.querySelector('#description').textContent=stage.description;
  input.setAttribute('aria-valuetext',`${next+1} / ${stages.length}，${stage.name}，${stage.price}`);
  document.querySelector('#rightLabel').classList.toggle('selected',next>=7);
  const caption=document.querySelector('.caption');caption.classList.remove('changed');void caption.offsetWidth;caption.classList.add('changed');
}
input.addEventListener('input',()=>{document.body.classList.add('interacted');render()});
// Keyboard arrows move one complete stage; Home and End jump to either endpoint.
input.addEventListener('keydown',event=>{
  let target;
  if(['ArrowRight','ArrowUp'].includes(event.key))target=Math.min(8,stageIndex+1);
  if(['ArrowLeft','ArrowDown'].includes(event.key))target=Math.max(0,stageIndex-1);
  if(event.key==='Home')target=0;
  if(event.key==='End')target=8;
  if(target===undefined)return;
  event.preventDefault();input.value=target===8?1000:Math.round((target+.2)/9*1000);input.dispatchEvent(new Event('input'));
});
render();
