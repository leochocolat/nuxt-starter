uniform float opacity;

uniform sampler2D u_texture;

varying vec2 vUv;

void main() {
	vec4 texel = texture2D(u_texture, vUv);
	// gl_FragColor = vec4(1., 1., 0., 1.);
	gl_FragColor = texel;
}