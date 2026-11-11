const stages = [
  {price:'¥1,750,000',name:'Harry Winston',description:'Emerald-cut diamond',image:'ring-0-transparent.png'},
  {price:'¥1,750,000',name:'Chaumet',description:'Joséphine pear tiara',image:'ring-2-transparent.png'},
  {price:'¥1,550,000',name:'Cartier',description:'Pavé band, halo setting',image:'ring-1-transparent.png'},
  {price:'¥1,400,000',name:'Diamond',description:'A promise set in stone',image:'ring-3-transparent.png'},
  {price:'¥700,000',name:'Solitaire',description:'A single brilliant promise',image:'ring-solitaire.png'},
  {price:'¥300,000',name:'Sapphire',description:'A little piece of the blue',image:'ring-sapphire.png'},
  {price:'¥100,000',name:'Gold band',description:'A circle of warm gold',image:'ring-gold.png'},
  {price:'¥30,000',name:'Silver',description:'A small spark, every day',image:'ring-silver.png'},
  {price:'¥5,000',name:'Steel',description:'Simple, strong, together',image:'ring-steel.png'},
  {price:'¥500',name:'Beaded',description:'Made one bead at a time',image:'ring-beaded.png'},
  {price:'¥50',name:'Copper wire',description:'Twisted by hand, just for you',image:'ring-wire.png'},
  {price:'¥3',name:'Ribbon',description:'',image:'ring-4-transparent.png'},
  {price:'¥0',name:'Can tab',description:'',image:'ring-5-transparent.png'},
  {price:'¥0',name:'Dried grass',description:'The ring you made',image:'ring-6-transparent.png'},
  {price:'¥0',name:'Your hair',description:'Fallen, new roots grown in',image:'ring-7-transparent.png'},
  {price:'Priceless',name:'The time we spent together',description:''}
];
const lastStage=stages.length-1;
const input=document.querySelector('#level');
const imageRoot=document.querySelector('#images');
const images=stages.slice(0,-1).map((stage,i)=>{
  const img=new Image();img.src=`assets/${stage.image}`;img.alt='';img.className=`ring${i===0?' active':''}`;img.draggable=false;imageRoot.append(img);return img;
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
  document.querySelector('#rightLabel').classList.toggle('selected',next>=lastStage-1);
  const caption=document.querySelector('.caption');caption.classList.remove('changed');void caption.offsetWidth;caption.classList.add('changed');
}
input.addEventListener('input',()=>{document.body.classList.add('interacted');render()});
// Keyboard arrows move one complete stage; Home and End jump to either endpoint.
input.addEventListener('keydown',event=>{
  let target;
  if(['ArrowRight','ArrowUp'].includes(event.key))target=Math.min(lastStage,stageIndex+1);
  if(['ArrowLeft','ArrowDown'].includes(event.key))target=Math.max(0,stageIndex-1);
  if(event.key==='Home')target=0;
  if(event.key==='End')target=lastStage;
  if(target===undefined)return;
  event.preventDefault();input.value=target===lastStage?1000:Math.round((target+.2)/stages.length*1000);input.dispatchEvent(new Event('input'));
});
render();
