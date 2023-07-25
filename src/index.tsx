import './index.css';
import { createShaderProgram } from './utils/util';

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const gl = canvas.getContext("webgl2") as WebGL2RenderingContext;

if (!gl) {
  console.log("抱歉你的浏览器不支持webgl");
}

const vertexShader = `
attribute vec4 a_position;
void main () {
    gl_Position = a_position;
    gl_PointSize = 30.;
}  
`;

const fragmentShader = `
    precision mediump float;
    void main () {
        gl_FragColor = vec4(1.0, 0.5, 1.0, 1.0);
    }
`;

const program = createShaderProgram(gl, vertexShader, fragmentShader);
gl.useProgram(program!);

const a_position = gl.getAttribLocation(program!, "a_position");
gl.vertexAttrib3f(a_position, 0.0, 0.0, 0.0);

gl.drawArrays(gl.POINTS, 0, 1);