const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
class Element{
 constructor(){this.value='0';this.style={};this.children=[];this.attributes={};this.events={};this.classes=new Set();this.classList={add:x=>this.classes.add(x),remove:x=>this.classes.delete(x),toggle:(x,on)=>on?this.classes.add(x):this.classes.delete(x)};}
 append(x){this.children.push(x)}setAttribute(k,v){this.attributes[k]=v}addEventListener(k,f){this.events[k]=f}dispatchEvent(e){this.events[e.type]?.(e)}
}
const elements={};const get=id=>elements[id]??=new Element();
const context={document:{querySelector:get,createElement:()=>new Element(),body:new Element()},Image:Element,Event:class{constructor(type){this.type=type}}};
vm.runInNewContext(fs.readFileSync('dist/ring-frames.js','utf8'),context);
vm.runInNewContext(fs.readFileSync('dist/app.js','utf8'),context);
const stages=vm.runInNewContext('stages',context);
const input=get('#level');
const last=stages.length-1;
const select=i=>{input.value=i===last?'1000':String(Math.round((i+.2)/stages.length*1000));input.dispatchEvent({type:'input'})};
const key=key=>input.events.keydown({key,preventDefault(){}});
const check=i=>{
 assert.match(input.attributes['aria-valuetext'],new RegExp(`^${i+1} / ${stages.length}，`));
 assert.equal(get('#price').textContent,stages[i].price);
 assert.equal(context.document.body.classes.has('dark'),i===last);
 const active=get('#images').children.filter(x=>x.classes.has('active'));
 assert.equal(active.length,i===last?0:1);
 if(i!==last)assert.equal(active[0].src,`assets/${stages[i].image}`);
};
assert.equal(stages.length,16);
for(let i=0;i<stages.length;i++){select(i);check(i)}
key('Home');check(0);key('ArrowLeft');check(0);
for(let i=1;i<=last;i++){key('ArrowRight');check(i)}
key('ArrowRight');check(last);
for(let i=last-1;i>=0;i--){key('ArrowLeft');check(i)}
key('End');check(last);key('Home');check(0);
let previous=Infinity;
for(const stage of stages.slice(0,-1)){
 const price=Number(stage.price.replace(/[^0-9]/g,''));
 assert.ok(price<=previous,'Prices must never increase');previous=price;
 assert.ok(fs.statSync(`dist/assets/${stage.image}`).size>1000);
}
console.log(`PASS: all ${stages.length} stages, descending prices, matching assets, forward/reverse keyboard navigation, endpoint clamping and dark finale.`);

const frames=vm.runInNewContext('ringFrames',context);
for(const [i,img] of get('#images').children.entries()){
 const frame=frames[stages[i].image];
 const renderedWidth=parseFloat(img.style.width)/100*1334;
 const renderedHeight=parseFloat(img.style.height)/100*1179;
 const scale=renderedWidth/frame.width;
 assert.ok(Math.abs(scale-renderedHeight/frame.height)<1e-8,'Image must use uniform scaling');
 assert.ok(Math.abs(parseFloat(img.style.left)/100*1334+frame.cx*scale-667)<1e-6,'Band center X must match');
 assert.ok(Math.abs(parseFloat(img.style.top)/100*1179+frame.cy*scale-669)<1e-6,'Band center Y must match');
 assert.ok(Math.abs(frame.diameter*scale-554)<1e-6,'Band opening diameter must match');
 if(stages[i].image.startsWith('front-'))assert.ok(frame.axisRatio<1.08,'Replacement must already have a circular band');
}
console.log('PASS: all band centers and diameters align with uniform scaling; new photographs have near-circular openings.');
