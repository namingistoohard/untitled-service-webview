/**
  * Our vertex shader below receives vertex position values
  * from an attribute we define called 'aVertexPosition'.
  * That position is then multiplied by 4x4 matrix we provide
  * called 'uProjectionMatrix' and 'uModelViewMatrix';
  * 'gl_Position' is set to the result.
  */

attribute vec4 aVertexPosition;
attribute vec4 aVertexColor;

uniform mat4 uMatrix;

varying lowp vec4 vColor;

void main() {
  gl_Position = uMatrix * aVertexPosition;
  vColor = aVertexColor;
}
