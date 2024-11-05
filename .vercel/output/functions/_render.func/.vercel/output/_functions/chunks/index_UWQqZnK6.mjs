export { renderers } from '../renderers.mjs';

const page = () => import('./pages/index_DN99Cinc.mjs').then(n => n.i);

export { page };
