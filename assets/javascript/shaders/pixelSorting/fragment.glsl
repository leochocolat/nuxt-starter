uniform float opacity;

uniform sampler2D tDiffuse;
uniform float u_delta_time;
uniform vec3 iResolution;

uniform sampler2D iChannel0;
uniform sampler2D iChannel1;

varying vec2 vUv;


void main()
{
    vec2 uv = vUv;
	vec2 texel = 1. / iResolution.xy;
    
    float step_y = texel.y;
    vec2 s  = vec2(0.0, -step_y);
    vec2 n  = vec2(0.0, step_y);

    vec4 im_n =  texture2D(iChannel1, uv+n);
    vec4 im =    texture2D(iChannel1, uv);
    vec4 im_s =  texture2D(iChannel1, uv+s);
    
    // use luminance for sorting
    float len_n = dot(im_n, vec4(0.299, 0.587, 0.114, 0.));
    float len = dot(im, vec4(0.299, 0.587, 0.114, 0.));
    float len_s = dot(im_s, vec4(0.299, 0.587, 0.114, 0.));
    
    if(int(mod(float(u_delta_time) + (vUv * iResolution.xy).y, 2.0)) == 0) {
        if ((len_s > len)) { 
            im = im_s;    
        }
    } else {
        if ((len_n < len)) { 
            im = im_n;    
        }   
    }
    
    // blend with image
    // if(u_delta_time<1.) {
    //     gl_FragColor = texture2D(iChannel1, uv);
    // } else {
    //     gl_FragColor = (texture2D(iChannel1, uv) + im * 99. ) / 100.;
    // }
	
	gl_FragColor = (texture2D(tDiffuse, uv) + im * 99. ) / 100.;
}