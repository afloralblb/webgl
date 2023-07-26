import { createShaderProgram, createTexture } from "../utils/util";
import texture1 from '../assets/texture1.jpg';

export function textureDemo(){
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const gl = canvas.getContext("webgl2") as WebGL2RenderingContext;
  
  if (!gl) {
    console.log("抱歉你的浏览器不支持webgl");
  }

  const vertexShader = `
  attribute vec4 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  void main () {
      gl_Position = a_position;
      v_texCoord = a_texCoord;
  }  
  `;

  const fragmentShader = `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D u_texture;
  void main () {
      gl_FragColor = texture2D(u_texture, v_texCoord);
  }
  `;

  // 将顶点的位置数据修改为：
  const pointPos = [
    -1, 1,
    -1, -1,
    1, -1,
    1, -1,
    1, 1,
    -1, 1,
  ];
  // 给顶点增加对应的纹理坐标信息
  const texCoordPos = [
    0, 1,
    0, 0,
    1, 0,
    1, 0,
    1, 1,
    0, 1
  ];

  const program = createShaderProgram(gl, vertexShader, fragmentShader);
  gl.useProgram(program!);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointPos), gl.STATIC_DRAW);

  const texCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoordPos), gl.STATIC_DRAW);

  const a_position = gl.getAttribLocation(program!, "a_position");
  const a_texCoord = gl.getAttribLocation(program!, "a_texCoord");

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.enableVertexAttribArray(a_position);  // 开启 Attribute 变量，允许顶点着色器读到GPU数据
  gl.vertexAttribPointer(
    a_position,
    2,  // 顶点是vec2
    gl.FLOAT,
    false,  // 数据normalize
    Float32Array.BYTES_PER_ELEMENT * 2,  // stride
    0 // 指针offset
  );

  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.enableVertexAttribArray(a_texCoord);
  gl.vertexAttribPointer(
    a_texCoord,
    2,
    gl.FLOAT,
    false,
    Float32Array.BYTES_PER_ELEMENT * 2,
    0
  );

  // 创建纹理
  let texture = createTexture(gl);
  const image = new Image();
  image.src = texture1;
  image.onload = function () {
    console.log("image loaded", image);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // 纹理坐标系与canvas坐标系Y轴相反，需要进行Y轴翻转
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
}