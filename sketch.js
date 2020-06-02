/**
 * 참고한 튜토리얼)
 * https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial
 * https://webglfundamentals.org/webgl/lessons/ko/webgl-fundamentals.html
 *
 * 사용한 라이브러리)
 * https://github.com/toji/gl-matrix
 *
 * WebGL이 작동하는 방식에 대해 내가 이해한 대로 정리해 봤는데
 * ./img/pipeline.jpg를 참고할 것.
 *
 * WebGL 회전 참고한 코드)
 * http://jsfiddle.net/9sqvp52u/
 */

let drag = false;
let pmouseX;
let pmouseY;
let dx = 0;
let dy = 0;

window.onload = main;

function main() {
  const canvas = document.getElementById('colorcube');
  const gl = canvas.getContext('webgl');

  if (!gl) {
    console.error('Unable to initialize WebGL');
    return;
  }

  canvas.addEventListener('mousedown', mousedown);
  canvas.addEventListener('mousemove', mousemove);
  canvas.addEventListener('mouseup', mouseup);
  canvas.addEventListener('mouseout', mouseup);

  /**
   * Our vertex shader below receives vertex position values
   * from an attribute we define called 'aVertexPosition'.
   * That position is then multiplied by 4x4 matrix we provide
   * called 'uProjectionMatrix' and 'uModelViewMatrix';
   * 'gl_Position' is set to the result.
   * GLSL 그냥 따라 치지 말고 어떻게 쓰는지 공부할 것!!!!
   */
  const vertexShaderSource = `
  attribute vec4 aVertexPosition;
  attribute vec4 aVertexColor;

  uniform mat4 uMatrix;

  varying lowp vec4 vColor;

  void main() {
    gl_Position = uMatrix * aVertexPosition;
    vColor = aVertexColor;
  }
  `;

  // fetch the value from 'vColor' varying
  const fragmentShaderSource = `
  varying lowp vec4 vColor;

  void main() {
    gl_FragColor = vColor;
  }
  `;

  const shaderProgram = initializeShaderProgram(gl, vertexShaderSource, fragmentShaderSource);

  /**
   * Attributes receive values from buffers.
   * Each iteration of the vertex shader receives the next value from the buffer
   * assigned to that attribute.
   * Uniforms are similar to Javascript global variables.
   * They stay the same value for all iterations of a shader.
   * Since the attribute and uniform locations are specific to a single shader program,
   * we will store them together to make them easy to pass around.
   */
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
    },
    uniformLocations: {
      matrix: gl.getUniformLocation(shaderProgram, 'uMatrix'),
    },
  };

  const buffers = initializeBuffers(gl);

  const fieldOfView = 45 * Math.PI / 180; // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = glMatrix.mat4.create();
  const modelViewMatrix = glMatrix.mat4.create();

  // 이것들이 하는 역할 정확히 알아볼 것
  const eye = glMatrix.vec3.fromValues(0, 0, 5);
  const target = glMatrix.vec3.fromValues(0, 0, 0);
  const up = glMatrix.vec3.fromValues(0, 1, 0);

  glMatrix.mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
  glMatrix.mat4.lookAt(modelViewMatrix, eye, target, up);
  glMatrix.mat4.multiply(projectionMatrix, projectionMatrix, modelViewMatrix);

  function render() {
    drawScene(gl, programInfo, buffers, projectionMatrix);
    requestAnimationFrame(render); // to call the function 'render' on each frame
  }
  requestAnimationFrame(render);
}

function initializeShaderProgram(gl, vertexShaderSource, fragmentShaderSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  // create the shader program
  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return;
  }

  return shaderProgram;
}

function loadShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source); // send the source to the shader object
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return;
  }

  return shader;
}

function initializeBuffers(gl) {
  // 주석의 네모 그림은 각 면에서 사각형을 그린 방향?을 표시한 것.
  // 꼭짓점에 색깔을 지정해 줄 때도 이거랑 같은 순서로 해 줘야 의도한 대로 칠해짐
  // MDN WebGL 튜토리얼에 나온 순서 그대로임
  // ./img/vertices.jpg를 참고할 것
  const positions = [
    /**
     * 앞면
     * 4 ㅡ 3
     * |    |
     * 1 ㅡ 2
     */
    -1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,
     1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,

    /**
     * 뒷면
     * 2 ㅡ 3
     * |    |
     * 1 ㅡ 4
     */
    -1.0, -1.0, -1.0,
    -1.0,  1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0, -1.0, -1.0,

    /**
     * 윗면
     * 1 ㅡ 4
     * |    |
     * 2 ㅡ 3
     */
    -1.0,  1.0, -1.0,
    -1.0,  1.0,  1.0,
     1.0,  1.0,  1.0,
     1.0,  1.0, -1.0,

    /**
     * 아랫면
     * 1 ㅡ 2
     * |    |
     * 4 ㅡ 3
     */
    -1.0, -1.0, -1.0,
     1.0, -1.0, -1.0,
     1.0, -1.0,  1.0,
    -1.0, -1.0,  1.0,

    /**
     * 왼면
     * 3 ㅡ 4
     * |    |
     * 2 ㅡ 1
     */
    -1.0, -1.0, -1.0,
    -1.0, -1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0,  1.0, -1.0,

    /**
     * 오른면
     * 3 ㅡ 2
     * |    |
     * 4 ㅡ 1
     */
    1.0, -1.0, -1.0,
    1.0,  1.0, -1.0,
    1.0,  1.0,  1.0,
    1.0, -1.0,  1.0,
  ];

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  const colors = [
    // ./img/colors.jpg를 참고할 것
    // 앞면
    1.0, 0.0, 0.0, 1.0, // red
    1.0, 1.0, 0.0, 1.0, // yellow
    1.0, 1.0, 1.0, 1.0, // white
    1.0, 0.0, 1.0, 1.0, // magenta

    // 뒷면
    0.0, 0.0, 0.0, 1.0, // black
    0.0, 0.0, 1.0, 1.0, // blue
    0.0, 1.0, 1.0, 1.0, // cyan
    0.0, 1.0, 0.0, 1.0, // green

    // 윗면
    0.0, 0.0, 1.0, 1.0, // blue
    1.0, 0.0, 1.0, 1.0, // magenta
    1.0, 1.0, 1.0, 1.0, // white
    0.0, 1.0, 1.0, 1.0, // cyan

    // 아랫면
    0.0, 0.0, 0.0, 1.0, // black
    0.0, 1.0, 0.0, 1.0, // green
    1.0, 1.0, 0.0, 1.0, // yellow
    1.0, 0.0, 0.0, 1.0, // red

    // 왼면
    0.0, 0.0, 0.0, 1.0, // black
    1.0, 0.0, 0.0, 1.0, // red
    1.0, 0.0, 1.0, 1.0, // magenta
    0.0, 0.0, 1.0, 1.0, // blue

    // 오른면
    0.0, 1.0, 0.0, 1.0, // green
    0.0, 1.0, 1.0, 1.0, // cyan
    1.0, 1.0, 1.0, 1.0, // white
    1.0, 1.0, 0.0, 1.0, // yellow
  ];

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  const indices = [
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23,   // left
  ];

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    color: colorBuffer,
    indices: indexBuffer,
  };
}

function drawScene(gl, programInfo, buffers, projectionMatrix) {
  // 이상하게 튜토리얼에 쓰여 있는 것처럼 바로 mat4를 부르면 안 불러와짐...
  // 아하 버전이 올라가면서 그렇게 바뀌었나 봄 https://stackoverflow.com/questions/15931119/how-do-i-include-gl-matrix
  // https://webglfundamentals.org/webgl/lessons/webgl-2d-matrices.html
  if (!drag) {
    dx *= 0.95;
    dy *= 0.95;
  }

  // gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const quaternion = glMatrix.quat.create();
  const rotation = glMatrix.mat4.create();

  const degX = dx * 180 / Math.PI;
  const degY = dy * 180 / Math.PI;

  glMatrix.quat.fromEuler(quaternion, degY, degX, 0); // 왜 X랑 Y를 반대로 써야 하지?!
  glMatrix.mat4.fromQuat(rotation, quaternion);
  glMatrix.mat4.multiply(projectionMatrix, projectionMatrix, rotation);

  { // numComponent나 offset 같은 변수를 여러 번 선언할 일이 있어서 이걸 쓰는가보다
    const numCompoments = 3; // pull out 3 values per iteration
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      numCompoments,
      type,
      normalize,
      stride,
      offset
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }

  {
    const numCompoments = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexColor,
      numCompoments,
      type,
      normalize,
      stride,
      offset
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
  }

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

  gl.useProgram(programInfo.program);

  gl.uniformMatrix4fv(
    programInfo.uniformLocations.matrix,
    false,
    projectionMatrix
  );

  {
    const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }
}

function mousedown(e) {
  drag = true;
  pmouseX = e.pageX;
  pmouseY = e.pageY;
}

function mousemove(e) {
  if (drag) {
    dx = (e.pageX - pmouseX) * 2 * Math.PI / e.target.width;
    dy = (e.pageY - pmouseY) * 2 * Math.PI / e.target.height;
    pmouseX = e.pageX;
    pmouseY = e.pageY;
  }
}

function mouseup() {
  drag = false;
}
