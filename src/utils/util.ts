/**
 * create shader
 * @param gl 
 * @param type 
 * @param source 
 * @returns 
 */
export function createShader(gl: WebGL2RenderingContext, type: number, source: string) {
  // 创建 shader 对象
  let shader = gl.createShader(type);
  // 往 shader 中传入源代码
  gl.shaderSource(shader!, source);
  // 编译 shader
  gl.compileShader(shader!);
  // 判断 shader 是否编译成功
  let success = gl.getShaderParameter(shader!, gl.COMPILE_STATUS);
  if (success) {
      return shader;
  }
  // 如果编译失败，则打印错误信息
  console.warn(gl.getShaderInfoLog(shader!));
  gl.deleteShader(shader);
}

/**
 * create program
 * @param gl 
 * @param vertexShader 
 * @param fragmentShader 
 * @returns 
 */
export function createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
  // 创建 program 对象
  let program = gl.createProgram();
  // 往 program 对象中传入 WebGLShader 对象
  gl.attachShader(program!, vertexShader);
  gl.attachShader(program!, fragmentShader);
  // 链接 program
  gl.linkProgram(program!);
  // 判断 program 是否链接成功
  let success = gl.getProgramParameter(program!, gl.LINK_STATUS);
  if (success) {
      return program;
  }
  // 如果 program 链接失败，则打印错误信息
  console.warn(gl.getProgramInfoLog(program!));
  gl.deleteProgram(program);
}

export function createShaderProgram(gl: WebGL2RenderingContext, vertexSource: string, fragmentSource: string){
  let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  if(vertexShader && fragmentShader){
    let program = createProgram(gl, vertexShader, fragmentShader) as WebGLProgram;
    return program;
  }
  console.warn('create shader program failed');
}

export function createTexture(gl: WebGL2RenderingContext) {
  let texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  // gl.generateMipmap(gl.TEXTURE_2D);
  return texture;
}

