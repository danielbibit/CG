let canvas = document.getElementById('c');
let gl = canvas.getContext('webgl2');

if(!gl) throw new Error("Sem webgl");

const vertexShader = `#version 300 es

void main(){
    gl_Position = vec4(0, 0, 0, 1);
    gl_PointSize = 100.0;
}
`;

const fragShader = `#version 300 es
precision highp float;

out vec4 color;
void main(){
    color = vec4(0.5, 0.5, 0.5, 1);
}
`;

function compileShader(gl, type, source){
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    const stat = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

    if(!stat)
        throw new Error("Shader vertex: " + gl.getShaderInfoLog(shader));

    return shader;
}

const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexShader);
const frag = compileShader(gl, gl.FRAGMENT_SHADER, fragShader);

const program = gl.createProgram();
gl.attachShader(program, vertex);
gl.attachShader(program, frag);
gl.linkProgram(program);

const stat = gl.getProgramParameter(program, gl.LINK_STATUS);
if(!stat)
    throw new Error("Program: " + gl.getProgramInfoLog(program));

gl.useProgram(program);
gl.drawArrays(gl.POINTS, 0, 1);
