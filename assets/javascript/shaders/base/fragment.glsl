uniform vec3 iResolution;
uniform float iTime;
uniform float iTimeDelta;
uniform float iFrame;

uniform float u_texture;

varying vec2 vUv;

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{    
	fragColor = texture2D(u_texture, vUv);
}

void main() {
	mainImage(gl_FragColor, gl_FragCoord.xy);
}