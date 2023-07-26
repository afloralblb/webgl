import { createShaderProgram } from "../utils/util";

export function triangleDemo(){
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const gl = canvas.getContext("webgl2") as WebGL2RenderingContext;
  
  if (!gl) {
    console.log("抱歉你的浏览器不支持webgl");
  }

  const vertexShader = `
    attribute vec4 a_position;
    void main () {
        gl_Position = a_position;
        gl_PointSize = 10.;
    }  
  `;

  const fragmentShader = `
    precision mediump float;
    void main () {
        gl_FragColor = vec4(1.0, 0.5, 1.0, 1.0);
    }
  `;

  const pointPos = [
    -0.5, 0.0,
    0.5, 0.0,
    0.0, 0.5
  ];

  const program = createShaderProgram(gl, vertexShader, fragmentShader);
  gl.useProgram(program!);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointPos), gl.STATIC_DRAW);

  /**
   * 不再使用 gl.vertexAttrib3f(a_position, 0.0, 0.0, 0.0)
   * 采用vertexAttribPointer进行传值
   */
  const a_position = gl.getAttribLocation(program!, "a_position");
  gl.enableVertexAttribArray(a_position);  // 开启 Attribute 变量，允许顶点着色器读到GPU数据
  gl.vertexAttribPointer(
    a_position,
    2,  // 顶点是vec2
    gl.FLOAT,
    false,  // 数据normalize
    Float32Array.BYTES_PER_ELEMENT * 2,  // stride
    0 // 指针offset
  );

  gl.drawArrays(gl.TRIANGLES, 0, 3); // gl.drawArrays(mode: gl.mode, start:number, count:number)
}