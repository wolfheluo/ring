"""Measure alpha contours, writing display geometry only; never modifies images. Requires opencv-python."""
import sys,json
from pathlib import Path
repository=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(repository.parent/'.video-tools'))
import cv2
root=repository/'dist';frames={}
for p in sorted(list((root/'assets').glob('ring-*-transparent.png'))+list((root/'assets').glob('front-*.png'))):
 im=cv2.imread(str(p),-1);mask=(im[:,:,3]>128).astype('uint8')*255
 contours,hierarchy=cv2.findContours(mask,cv2.RETR_CCOMP,cv2.CHAIN_APPROX_NONE)
 holes=[c for i,c in enumerate(contours) if hierarchy[0][i][3]>=0 and cv2.contourArea(c)>5000]
 assert holes,f'No ring opening: {p.name}'
 c=max(holes,key=cv2.contourArea);(cx,cy),(w,h),angle=cv2.fitEllipse(c)
 axisRatio=max(w,h)/min(w,h)
 if p.name.startswith('front-'):assert axisRatio<1.08,f'{p.name}: oval ratio {axisRatio}'
 diameter=(w+h)/2
 # The tab overlaps the top of its opening; retain its original ring-circle framing.
 if p.name=='ring-5-transparent.png':cx,cy,diameter=666.6,669,554
 frames[p.name]=dict(width=im.shape[1],height=im.shape[0],cx=round(cx,3),cy=round(cy,3),diameter=round(diameter,3),axisRatio=round(axisRatio,4))
 print(p.name,'axis ratio',round(axisRatio,3))
(root/'ring-frames.js').write_text('// Measured opening geometry; display uses uniform scale and translation only.\nconst ringFrames = '+json.dumps(frames,indent=2)+';\n',encoding='utf-8')
