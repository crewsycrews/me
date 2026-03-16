import { _ as __nuxt_component_0 } from './nuxt-link-CuARts_E.mjs';
import { withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0;
  _push(`<!--[--><div class="mt-4 flex justify-center"><h4 class="w-full text-center">My projects:</h4></div><div class="mt-4 flex justify-center"><iframe src="https://itch.io/embed/2068346?linkback=true&amp;border_width=4&amp;bg_color=000000&amp;fg_color=ffffff&amp;link_color=327345&amp;border_color=d4ef99" width="558" height="173" frameborder="0"></iframe></div><div class="mt-4 flex justify-center"><span class="w-full text-center"><a href="https://marketplace.visualstudio.com/items?itemName=crewsycrews.bundlephobia-support" target="_blank" rel="noopener noreferrer">BundlePhobia VS Code extension on Visual Studio Marketplace</a></span></div><div class="mt-4 flex justify-center"><span class="w-full text-center">`);
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
  _push(` | `);
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/about" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`About me`);
      } else {
        return [
          createTextVNode("About me")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/projects.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const projects = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { projects as default };
//# sourceMappingURL=projects-CD3jMant.mjs.map
