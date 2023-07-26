import './index.css';
import {pointDemo} from './demos/pointDemo';
import { triangleDemo } from './demos/triangleDemo';
import { textureDemo } from './demos/textureDemo';

const demoDict = {
  point: pointDemo,
  triangle: triangleDemo,
  texture: textureDemo,
}

for (let [queryName, demo] of Object.entries(demoDict)) {
  if (window.location.href.match(queryName)) {
    document.title = `webgl: ${queryName} demo`;
    demo();
    break;
  }
}