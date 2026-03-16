import { _ as __nuxt_component_0 } from './nuxt-link-CuARts_E.mjs';
import { defineComponent, ref, computed, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { u as useSeoMeta } from './composables-B3kEuqGU.mjs';
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

const _imports_0 = publicAssetsURL("/assets/images/git_logo.png");
const _imports_1 = publicAssetsURL("/assets/images/hexlet_logo.png");
const _imports_2 = publicAssetsURL("/assets/images/telegram_logo.png");
const _imports_3 = publicAssetsURL("/assets/images/codewars_logo.png");
const _imports_4 = publicAssetsURL("/assets/images/twitter_logo.png");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Danil Rodin | Fullstack Developer",
      description: "Personal website of Danil Rodin: fullstack developer, projects, links and background.",
      ogTitle: "Danil Rodin | Fullstack Developer",
      ogDescription: "Personal website of Danil Rodin with projects and developer profile.",
      ogImage: "/assets/images/og-image.png",
      ogImageAlt: "Danil Rodin",
      twitterCard: "summary_large_image",
      twitterImage: "/assets/images/og-image.png"
    });
    const textBlocks = ["Software dev", "Family guy", "Healthy lifestyle"];
    const shellColors = [
      "text-green-500",
      "text-white",
      "text-red-500",
      "text-blue-500",
      "text-yellow-300"
    ];
    const logoColors = [
      "lightGreen",
      "lightWhite",
      "lightRed",
      "lightBlue",
      "lightYellow"
    ];
    const logoColorIndex = ref(0);
    const shellColorIndex = ref(0);
    const textIndex = ref(0);
    ref(0);
    ref(null);
    const classForText = computed(() => `textBlock${textIndex.value}`);
    const textyText = computed(() => textBlocks[textIndex.value]);
    const logoClass = computed(() => logoColors[logoColorIndex.value]);
    const shellColorClass = computed(() => shellColors[shellColorIndex.value]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<!--[--><div class="${ssrRenderClass(["logo", logoClass.value])}" data-v-2be2fc4c> Danil Rodin </div><div class="zsh mt-2 hidden items-center md:flex" data-v-2be2fc4c><span class="w-1/12" data-v-2be2fc4c></span><span class="w-10/12" data-v-2be2fc4c><span class="${ssrRenderClass(shellColorClass.value)}" data-v-2be2fc4c>[</span>~/Crewsy/Crews<span class="${ssrRenderClass(shellColorClass.value)}" data-v-2be2fc4c>] [</span>main<span class="${ssrRenderClass(shellColorClass.value)}" data-v-2be2fc4c>]<br data-v-2be2fc4c></span></span><span class="w-1/12" data-v-2be2fc4c></span></div><div class="zsh hidden items-center md:flex" data-v-2be2fc4c><span class="w-1/12" data-v-2be2fc4c></span><span class="w-10/12" data-v-2be2fc4c><span class="text-left" data-v-2be2fc4c><span class="${ssrRenderClass([classForText.value, "text"])}" data-v-2be2fc4c>${ssrInterpolate(textyText.value)}</span></span></span><span class="w-1/12" data-v-2be2fc4c></span></div><div class="mt-4 flex justify-center text-center" data-v-2be2fc4c><a href="https://github.com/crewsycrews" title="Danil Rodin GitHub" aria-label="Danil Rodin on GitHub" target="_blank" rel="noopener noreferrer" data-v-2be2fc4c><img${ssrRenderAttr("src", _imports_0)} alt="Danil Rodin GitHub" class="icon" data-v-2be2fc4c></a><a href="https://ru.hexlet.io/u/casiq" title="Hexlet profile" aria-label="Danil Rodin on Hexlet" target="_blank" rel="noopener noreferrer" data-v-2be2fc4c><img${ssrRenderAttr("src", _imports_1)} alt="Hexlet" class="icon" data-v-2be2fc4c></a><a href="https://t.me/casiq" title="Danil Rodin Telegram" aria-label="Danil Rodin on Telegram" target="_blank" rel="noopener noreferrer" data-v-2be2fc4c><img${ssrRenderAttr("src", _imports_2)} alt="Danil Rodin Telegram" class="icon" data-v-2be2fc4c></a><a href="https://www.codewars.com/users/crewsycrews/" title="CodeWars profile" aria-label="Danil Rodin on CodeWars" target="_blank" rel="noopener noreferrer" data-v-2be2fc4c><img${ssrRenderAttr("src", _imports_3)} alt="CodeWars" class="icon" data-v-2be2fc4c></a><a href="https://dev.to/crewsycrews" title="Danil Rodin on Dev.to" aria-label="Danil Rodin on Dev.to" target="_blank" rel="noopener noreferrer" data-v-2be2fc4c><img src="https://d2fltix0v2e0sb.cloudfront.net/dev-badge.svg" alt="Danil Rodin&#39;s DEV Profile" class="icon devto" data-v-2be2fc4c></a><a href="https://twitter.com/naniyak" title="Danil Rodin Twitter" aria-label="Danil Rodin on Twitter" target="_blank" rel="noopener noreferrer" data-v-2be2fc4c><img${ssrRenderAttr("src", _imports_4)} alt="Danil Rodin Twitter" class="icon" data-v-2be2fc4c></a></div><div class="mt-4 flex justify-center text-center" data-v-2be2fc4c><span class="w-full" data-v-2be2fc4c>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/projects" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`My projects`);
          } else {
            return [
              createTextVNode("My projects")
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
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2be2fc4c"]]);

export { index as default };
//# sourceMappingURL=index-BKCp-gCj.mjs.map
