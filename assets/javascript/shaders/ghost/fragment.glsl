uniform vec3 iResolution;
uniform float iTime;
uniform float iTimeDelta;
uniform float iFrame;

uniform sampler2D iChannel0;
uniform sampler2D iChannel1;

varying vec2 vUv;

// 2D Random
float random (in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123 * sin(iTime));
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
vec4 noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    return vec4(a, b, c, d);
}

vec2 coord(vec2 uv, vec2 texel, float x, float y)
{    
    return uv + vec2(texel.x * x, texel.y * y);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 texel = 1. / iResolution.xy;
    vec2 uv = fragCoord.xy / iResolution.xy;
    
   
    vec2 wind = vec2(texel.y*sin(iTime)*.2, texel.x*-2.);

    float s = texture2D(iChannel0, coord(uv, texel, 0., -1.)+wind).x;
    float n = texture2D(iChannel0, coord(uv, texel, 0., 1.)+wind).x;
    float e = texture2D(iChannel0, coord(uv, texel, 1., 0.)+wind).x;
    float w = texture2D(iChannel0, coord(uv, texel, -1., 0.)+wind).x;

    float c = (1. - texture2D(iChannel1, uv).x) * 0.02;
    float p = (s + n + e + w) / 4.;

    p = p - c;

    if (p < 0.) p = 0.;

    // float fnoise = noise(fragCoord * 0.5);
    // vec4 noiseText = vec4(vec3(fnoise), 1.0);
    vec4 noiseText = noise(fragCoord * 0.5);
    //output
    // fragColor =  mix(vec4(p,p,p,1.), noiseText, 0.05) ;
    fragColor =  noiseText * 0.5;
        
}

void main()
{
    mainImage(gl_FragColor, vUv * iResolution.xy);
}