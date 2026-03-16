import { _ as __nuxt_component_0 } from './nuxt-link-CuARts_E.mjs';
import { withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { _ as _export_sfc } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';

const _imports_0 = publicAssetsURL("/assets/images/avatar-small.jpg");
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0;
  _push(`<!--[--><div class="mt-4 flex justify-center" data-v-c86f76b1><h1 class="w-full text-center" data-v-c86f76b1> About me <img class="profile-photo"${ssrRenderAttr("src", _imports_0)} alt="Danil Rodin" role="img" aria-label="Profile photo of Danil Rodin" data-v-c86f76b1></h1></div><div class="mt-3 flex justify-center" data-v-c86f76b1><div class="about-card w-full md:w-9/12 lg:w-8/12" data-v-c86f76b1><h2 data-v-c86f76b1>Nice to meet you!</h2><p data-v-c86f76b1> I&#39;m, <b data-v-c86f76b1>Danil Rodin</b>, the fullstack developer, father of two, GameDev enthusiast. Passionate at family, work, study and friendship. If you want to get in touch, feel free to reach out on telegram `);
  _push(ssrRenderComponent(_component_NuxtLink, { to: "https://t.me/casiq" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`@casiq`);
      } else {
        return [
          createTextVNode("@casiq")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`. </p><h2 data-v-c86f76b1>My tech stack:</h2><p data-v-c86f76b1><b data-v-c86f76b1>Backend:</b> laravel from v5 to latest, symfony v5, phalcon, NestJS</p><p data-v-c86f76b1><b data-v-c86f76b1>Frontend:</b> ES6, VueJS, vuex, pinia, vue-router, vuex-reststate, react, Svelte, Angular, Nuxt, React Native. </p><p data-v-c86f76b1><b data-v-c86f76b1>DB:</b> MySQL, PostgreSQL, MongoDB, elasticsearch, redis.</p><p data-v-c86f76b1><b data-v-c86f76b1>ENV:</b> linux based, docker, docker-compose, traefik, kuberenetes(k3s), terraform</p><p data-v-c86f76b1><b data-v-c86f76b1>Methodologies:</b> agile, scrum, kanban</p><p data-v-c86f76b1>Vegetarian. Health lifestyle. Sometimes I lift heavy weights in gym.</p></div></div><div class="my-4 flex justify-center" data-v-c86f76b1><span class="w-full text-center" data-v-c86f76b1>`);
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Back to main page`);
      } else {
        return [
          createTextVNode("Back to main page")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</span></div><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const about = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-c86f76b1"]]);

export { about as default };
//# sourceMappingURL=about-gUemU9yE.mjs.map
