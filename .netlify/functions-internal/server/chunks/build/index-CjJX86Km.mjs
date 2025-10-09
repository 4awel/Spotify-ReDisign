import { _ as __nuxt_component_0$1, a as _imports_12 } from './menu-YSjhGXsL.mjs';
import { defineComponent, mergeProps, ref, computed, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'consola';
import 'consola/utils';
import 'mongoose';
import 'pinia';
import 'vue-router';

const _imports_0$1 = "data:image/svg+xml,%3csvg%20width='22'%20height='19'%20viewBox='0%200%2022%2019'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M10.4161%202.38098H3.41614C2.31157%202.38098%201.41614%203.27641%201.41614%204.38098C1.41614%205.48555%202.31157%206.38098%203.41614%206.38098H10.4161'%20stroke='%23898989'%20stroke-width='2'%20stroke-linecap='round'/%3e%3crect%20x='14.1854'%20y='1.38098'%20width='6.23077'%20height='6.23077'%20rx='3.11538'%20stroke='%23898989'%20stroke-width='2'/%3e%3cpath%20d='M11.4161%2016.6119L18.4161%2016.6119C19.5207%2016.6119%2020.4161%2015.7165%2020.4161%2014.6119C20.4161%2013.5074%2019.5207%2012.6119%2018.4161%2012.6119L11.4161%2012.6119'%20stroke='%23898989'%20stroke-width='2'%20stroke-linecap='round'/%3e%3crect%20x='7.64691'%20y='17.6119'%20width='6.23077'%20height='6.23077'%20rx='3.11538'%20transform='rotate(-180%207.64691%2017.6119)'%20stroke='%23898989'%20stroke-width='2'/%3e%3c/svg%3e";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "HeaderHome",
  __ssrInlineRender: true,
  setup(__props) {
    const activeButton = ref(0);
    const groupBtn = [
      {
        title: "All",
        link: "/all"
      },
      {
        title: "Music",
        link: "/music"
      },
      {
        title: "Podcasts",
        link: "/podcasts"
      },
      {
        title: "Audiobooks",
        link: "/audiobooks"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container-header-home" }, _attrs))} data-v-50b1782e><div class="header-home" data-v-50b1782e><nav class="home-group-btn" data-v-50b1782e><!--[-->`);
      ssrRenderList(groupBtn, (item, index2) => {
        _push(`<li class="${ssrRenderClass([{ "active-header-btn": activeButton.value === index2 }, "home-btn-item"])}" data-v-50b1782e>`);
        _push(ssrRenderComponent(_component_nuxt_link, { class: "home-link" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.title)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.title), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></nav><div class="svg-menu" data-v-50b1782e><img${ssrRenderAttr("src", _imports_0$1)} alt="menu" data-v-50b1782e></div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeaderHome.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-50b1782e"]]), { __name: "HeaderHome" });
const _imports_0 = "data:image/svg+xml,%3csvg%20width='17'%20height='15'%20viewBox='0%200%2017%2015'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M1.05945%207.2055H15.3716M15.3716%207.2055L9.47837%201.31226M15.3716%207.2055L9.47837%2013.0987'%20stroke='%23898989'%20stroke-width='2.02054'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ActionGroupButton",
  __ssrInlineRender: true,
  props: {
    optionFst: { default: () => [] },
    optionSec: { default: () => [] },
    optionThrd: { default: () => [] }
  },
  emits: ["selected-clicked-fst", "selected-clicked-sec", "selected-clicked-thrd"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isLeftDisabled = computed(() => {
      if (props.optionFst.length > 0) {
        return props.optionFst[0];
      } else if (props.optionSec.length > 0) {
        return props.optionSec[0];
      } else if (props.optionThrd.length > 0) {
        return props.optionThrd[0];
      }
      return false;
    });
    const isRightDisabled = computed(() => {
      if (props.optionFst.length > 0) {
        return props.optionFst[1];
      } else if (props.optionSec.length > 0) {
        return props.optionSec[1];
      } else if (props.optionThrd.length > 0) {
        return props.optionThrd[1];
      }
      return false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "action-group" }, _attrs))} data-v-cfd8c636><div class="${ssrRenderClass([{ "disable-button": isLeftDisabled.value }, "actio-svg arrow-left"])}"${ssrIncludeBooleanAttr(isLeftDisabled.value) ? " disabled" : ""} data-v-cfd8c636><img style="${ssrRenderStyle({ "transform": "rotate(180deg)" })}"${ssrRenderAttr("src", _imports_0)} alt="arrow-left" data-v-cfd8c636></div><div class="${ssrRenderClass([{ "disable-button": isRightDisabled.value }, "actio-svg arrow-right"])}"${ssrIncludeBooleanAttr(isRightDisabled.value) ? " disabled" : ""} data-v-cfd8c636><img${ssrRenderAttr("src", _imports_0)} alt="arrow-right" data-v-cfd8c636></div><div class="actio-svg menu" data-v-cfd8c636><img${ssrRenderAttr("src", _imports_12)} alt="menu" data-v-cfd8c636></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ActionGroupButton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-cfd8c636"]]), { __name: "ActionGroupButton" });
const cardImg0 = "" + __buildAssetsURL("image-0.Di_Psyls.png");
const cardImg1 = "" + __buildAssetsURL("image-1.C45nB5lb.png");
const cardImg2 = "" + __buildAssetsURL("image-2.DBpwsaEu.png");
const artist0 = "" + __buildAssetsURL("artist-0.DD73jUNM.png");
const artist1 = "" + __buildAssetsURL("artist-1.-CBiEBM5.jpg");
const artist2 = "" + __buildAssetsURL("artist-2.V0Tly7Mv.jpeg");
const artist3 = "" + __buildAssetsURL("artist-3.DPg7EMQ4.jpeg");
const HeaderHome = {
  template: '<div class="header-home">Header Home Component</div>'
};
const ActionGroupButton = {
  template: '<div class="action-group-button">Action Buttons</div>'
};
const _sfc_main = defineComponent({
  name: "HomePage",
  components: {
    HeaderHome,
    ActionGroupButton
  },
  setup() {
    const cardsPlaylistFst = [
      {
        slide: 0,
        playlists: [
          {
            title: "Discover Weekly",
            count: 10,
            description: "Your weekly mixtape of fresh music",
            image: cardImg0
          },
          {
            title: "Chill Hits",
            count: 15,
            description: "Kick back to the best new and recent chill hits",
            image: cardImg1
          },
          {
            title: "Mood Booster",
            count: 20,
            description: "Get happy with today's dose of feel-good songs",
            image: cardImg1
          },
          {
            title: "Rock Classics",
            count: 25,
            description: "Rock legends & epic songs that continue to inspire generations",
            image: cardImg0
          },
          {
            title: "Jazz Vibes",
            count: 18,
            description: "The original chill instrumental beats",
            image: cardImg1
          },
          {
            title: "Workout Energy",
            count: 30,
            description: "High-energy music to power your exercise",
            image: cardImg0
          },
          {
            title: "Focus Flow",
            count: 12,
            description: "Instrumental music for deep concentration",
            image: cardImg1
          }
        ]
      },
      {
        slide: 1,
        playlists: [
          {
            title: "Summer Hits 2024",
            count: 50,
            description: "The biggest songs of the summer",
            image: cardImg0
          },
          {
            title: "Throwback Thursday",
            count: 45,
            description: "All the best throwbacks from the 80s, 90s and 2000s",
            image: cardImg1
          },
          {
            title: "Electronic Rising",
            count: 35,
            description: "Future electronic hits before they blow up",
            image: cardImg1
          },
          {
            title: "Indie Mix",
            count: 28,
            description: "Discover the best new indie music",
            image: cardImg0
          },
          {
            title: "Rap Caviar",
            count: 42,
            description: "New music from Drake, Kendrick Lamar and more",
            image: cardImg1
          },
          {
            title: "Country Roads",
            count: 38,
            description: "Today's top country hits",
            image: cardImg0
          },
          {
            title: "Latin Heat",
            count: 33,
            description: "The hottest Latin tracks right now",
            image: cardImg1
          }
        ]
      },
      {
        slide: 2,
        playlists: [
          {
            title: "Sleep & Relax",
            count: 40,
            description: "Gentle ambient piano to help you fall asleep",
            image: cardImg0
          },
          {
            title: "Dinner Jazz",
            count: 25,
            description: "Soft jazz for your dinner party",
            image: cardImg1
          },
          {
            title: "Acoustic Morning",
            count: 22,
            description: "Wake up gently with these acoustic pieces",
            image: cardImg1
          },
          {
            title: "Piano Classics",
            count: 35,
            description: "The most beautiful piano compositions",
            image: cardImg0
          },
          {
            title: "Study Lofi",
            count: 48,
            description: "A perfect selection of focus lofi beats",
            image: cardImg1
          },
          {
            title: "Yoga & Meditation",
            count: 30,
            description: "Peaceful music for your yoga practice",
            image: cardImg0
          },
          {
            title: "Nature Sounds",
            count: 18,
            description: "Rain, ocean waves and forest sounds",
            image: cardImg1
          }
        ]
      }
    ];
    const cardsPlaylistSec = [
      {
        slide: 0,
        playlists: [
          {
            title: "Rock Mix",
            count: 10,
            description: "Best rock songs for your taste",
            image: cardImg2
          },
          {
            title: "Pop Hits",
            count: 15,
            description: "Today's top pop hits",
            image: cardImg1
          },
          {
            title: "Electronic Dance",
            count: 20,
            description: "EDM tracks to keep you moving",
            image: cardImg1
          },
          {
            title: "Hip Hop Essentials",
            count: 25,
            description: "Essential hip hop tracks",
            image: cardImg0
          },
          {
            title: "R&B Soul",
            count: 18,
            description: "Smooth R&B and soul classics",
            image: cardImg1
          },
          {
            title: "Country Mix",
            count: 30,
            description: "Best country tracks of all time",
            image: cardImg2
          },
          {
            title: "Jazz Classics",
            count: 12,
            description: "Timeless jazz standards",
            image: cardImg1
          }
        ]
      },
      {
        slide: 1,
        playlists: [
          {
            title: "Workout Mix",
            count: 50,
            description: "High energy tracks for your workout",
            image: cardImg0
          },
          {
            title: "Chill Vibes",
            count: 45,
            description: "Relaxing tunes for winding down",
            image: cardImg2
          },
          {
            title: "Party Anthems",
            count: 35,
            description: "Songs to get the party started",
            image: cardImg1
          },
          {
            title: "Focus Mode",
            count: 28,
            description: "Music for deep concentration",
            image: cardImg0
          },
          {
            title: "Road Trip",
            count: 42,
            description: "Perfect playlist for long drives",
            image: cardImg2
          },
          {
            title: "Morning Coffee",
            count: 38,
            description: "Gentle tunes to start your day",
            image: cardImg2
          },
          {
            title: "Evening Wind Down",
            count: 33,
            description: "Relaxing music for the evening",
            image: cardImg1
          }
        ]
      },
      {
        slide: 2,
        playlists: [
          {
            title: "Classical Essentials",
            count: 40,
            description: "Essential classical compositions",
            image: cardImg0
          },
          {
            title: "Indie Discoveries",
            count: 25,
            description: "Hidden indie gems",
            image: cardImg1
          },
          {
            title: "Metal Power",
            count: 22,
            description: "Powerful metal tracks",
            image: cardImg2
          },
          {
            title: "Reggae Roots",
            count: 35,
            description: "Classic reggae and roots music",
            image: cardImg0
          },
          {
            title: "Blues Legends",
            count: 48,
            description: "Legendary blues artists",
            image: cardImg2
          },
          {
            title: "Folk Stories",
            count: 30,
            description: "Storytelling through folk music",
            image: cardImg2
          },
          {
            title: "World Music",
            count: 18,
            description: "Music from around the globe",
            image: cardImg1
          }
        ]
      }
    ];
    const cardsArtists = [
      {
        slide: 0,
        artists: [
          {
            name: "5opka",
            image: artist0
          },
          {
            name: "MellSher",
            image: artist1
          },
          {
            name: "HOLIDAYBOY",
            image: artist3
          },
          {
            name: "MAKE FAMILY NOT FRIENDS",
            image: artist2
          },
          {
            name: "The Weeknd",
            image: artist0
          },
          {
            name: "Taylor Swift",
            image: artist1
          },
          {
            name: "Drake",
            image: artist2
          }
        ]
      },
      {
        slide: 1,
        artists: [
          {
            name: "Ariana Grande",
            image: artist3
          },
          {
            name: "Ed Sheeran",
            image: artist0
          },
          {
            name: "Billie Eilish",
            image: artist1
          },
          {
            name: "Post Malone",
            image: artist2
          },
          {
            name: "Dua Lipa",
            image: artist3
          },
          {
            name: "Kendrick Lamar",
            image: artist0
          },
          {
            name: "Doja Cat",
            image: artist1
          }
        ]
      },
      {
        slide: 2,
        artists: [
          {
            name: "Bad Bunny",
            image: artist2
          },
          {
            name: "Harry Styles",
            image: artist3
          },
          {
            name: "Olivia Rodrigo",
            image: artist0
          },
          {
            name: "Bruno Mars",
            image: artist1
          },
          {
            name: "SZA",
            image: artist2
          },
          {
            name: "Travis Scott",
            image: artist3
          },
          {
            name: "Lana Del Rey",
            image: artist0
          }
        ]
      }
    ];
    const currentSlideIndexFst = ref(0);
    const isDisabledPrevFst = ref(true);
    const isDisabledNextFst = ref(false);
    const currentSlideFst = computed(() => {
      const slide = cardsPlaylistFst.find(
        (item) => item.slide === currentSlideIndexFst.value
      );
      return slide ? slide.playlists : [];
    });
    const transitionSlideFst = (value) => {
      if (value === 0) {
        if (currentSlideIndexFst.value > 0) {
          currentSlideIndexFst.value--;
        }
      } else {
        if (currentSlideIndexFst.value < cardsPlaylistFst.length - 1) {
          currentSlideIndexFst.value++;
        }
      }
      isDisabledPrevFst.value = currentSlideIndexFst.value === 0;
      isDisabledNextFst.value = currentSlideIndexFst.value === cardsPlaylistFst.length - 1;
    };
    const currentSlideIndexSec = ref(0);
    const isDisabledPrevSec = ref(true);
    const isDisabledNextSec = ref(false);
    const currentSlideSec = computed(() => {
      const slide = cardsPlaylistSec.find(
        (item) => item.slide === currentSlideIndexSec.value
      );
      return slide ? slide.playlists : [];
    });
    const transitionSlideSec = (value) => {
      if (value === 0) {
        if (currentSlideIndexSec.value > 0) {
          currentSlideIndexSec.value--;
        }
      } else {
        if (currentSlideIndexSec.value < cardsPlaylistSec.length - 1) {
          currentSlideIndexSec.value++;
        }
      }
      isDisabledPrevSec.value = currentSlideIndexSec.value === 0;
      isDisabledNextSec.value = currentSlideIndexSec.value === cardsPlaylistSec.length - 1;
    };
    const currentSlideIndexThrd = ref(0);
    const isDisabledPrevThrd = ref(true);
    const isDisabledNextThrd = ref(false);
    const currentSlideThrd = computed(() => {
      const slide = cardsArtists.find(
        (item) => item.slide === currentSlideIndexThrd.value
      );
      return slide ? slide.artists : [];
    });
    const transitionSlideThrd = (value) => {
      if (value === 0) {
        if (currentSlideIndexThrd.value > 0) {
          currentSlideIndexThrd.value--;
        }
      } else {
        if (currentSlideIndexThrd.value < cardsArtists.length - 1) {
          currentSlideIndexThrd.value++;
        }
      }
      isDisabledPrevThrd.value = currentSlideIndexThrd.value === 0;
      isDisabledNextThrd.value = currentSlideIndexThrd.value === cardsArtists.length - 1;
    };
    return {
      // Первый блок
      transitionSlideFst,
      currentSlideFst,
      currentSlideIndexFst,
      isDisabledPrevFst,
      isDisabledNextFst,
      // Второй блок
      transitionSlideSec,
      currentSlideSec,
      currentSlideIndexSec,
      isDisabledPrevSec,
      isDisabledNextSec,
      // Третий блок
      transitionSlideThrd,
      currentSlideThrd,
      currentSlideIndexThrd,
      isDisabledPrevThrd,
      isDisabledNextThrd
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HeaderHome = __nuxt_component_0;
  const _component_ActionGroupButton = __nuxt_component_1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "container-home" }, _attrs))} data-v-025d76b4>`);
  _push(ssrRenderComponent(_component_HeaderHome, null, null, _parent));
  _push(`<div class="block-content" data-v-025d76b4><div class="header-content-home" data-v-025d76b4><div class="header-text" data-v-025d76b4><h1 data-v-025d76b4>Made For You</h1></div>`);
  _push(ssrRenderComponent(_component_ActionGroupButton, {
    onSelectedClickedFst: _ctx.transitionSlideFst,
    optionFst: [_ctx.isDisabledPrevFst, _ctx.isDisabledNextFst]
  }, null, _parent));
  _push(`</div><div class="main-content-home cards" data-v-025d76b4><div${ssrRenderAttrs({
    name: "card-slide",
    class: "cards-container"
  })} data-v-025d76b4>`);
  ssrRenderList(_ctx.currentSlideFst, (item, index2) => {
    _push(`<div class="home-card" style="${ssrRenderStyle({ "--card-index": index2 })}" data-v-025d76b4><div class="img-card" data-v-025d76b4><img${ssrRenderAttr("src", item.image)} alt="default-img" data-v-025d76b4></div><div class="content-card" data-v-025d76b4><div class="content-card-header" data-v-025d76b4><h4 data-v-025d76b4>${ssrInterpolate(item.title)}</h4><span class="count-track" data-v-025d76b4>${ssrInterpolate(item.count)}</span></div><div class="content-card-description" data-v-025d76b4><span data-v-025d76b4>${ssrInterpolate(item.description)}</span></div></div></div>`);
  });
  _push(`</div></div><div class="header-content-home" data-v-025d76b4><div class="header-text" data-v-025d76b4><h1 data-v-025d76b4>Your Top Mixes</h1></div>`);
  _push(ssrRenderComponent(_component_ActionGroupButton, {
    onSelectedClickedSec: _ctx.transitionSlideSec,
    optionSec: [_ctx.isDisabledPrevSec, _ctx.isDisabledNextSec]
  }, null, _parent));
  _push(`</div><div class="main-content-home cards" data-v-025d76b4><div${ssrRenderAttrs({
    name: "card-slide",
    class: "cards-container"
  })} data-v-025d76b4>`);
  ssrRenderList(_ctx.currentSlideSec, (item, index2) => {
    _push(`<div class="home-card" style="${ssrRenderStyle({ "--card-index": index2 })}" data-v-025d76b4><div class="img-card" data-v-025d76b4><img${ssrRenderAttr("src", item.image)} alt="default-img" data-v-025d76b4></div><div class="content-card" data-v-025d76b4><div class="content-card-header" data-v-025d76b4><h4 data-v-025d76b4>${ssrInterpolate(item.title)}</h4><span class="count-track" data-v-025d76b4>${ssrInterpolate(item.count)}</span></div><div class="content-card-description" data-v-025d76b4><span data-v-025d76b4>${ssrInterpolate(item.description)}</span></div></div></div>`);
  });
  _push(`</div></div><div class="header-content-home" data-v-025d76b4><div class="header-text" data-v-025d76b4><h1 data-v-025d76b4>Your Favorite Artists</h1></div>`);
  _push(ssrRenderComponent(_component_ActionGroupButton, {
    onSelectedClickedThrd: _ctx.transitionSlideThrd,
    optionThrd: [_ctx.isDisabledPrevThrd, _ctx.isDisabledNextThrd]
  }, null, _parent));
  _push(`</div><div class="main-content-home cards" data-v-025d76b4><div${ssrRenderAttrs({
    name: "card-slide",
    class: "cards-container"
  })} data-v-025d76b4>`);
  ssrRenderList(_ctx.currentSlideThrd, (item, index2) => {
    _push(`<div class="home-card artist-card" style="${ssrRenderStyle({ "--card-index": index2 })}" data-v-025d76b4><div class="img-card-radius" data-v-025d76b4><img${ssrRenderAttr("src", item.image)} alt="artist-img" data-v-025d76b4></div><div class="content-card" data-v-025d76b4><div class="content-card-header" data-v-025d76b4><h4 class="overlight" data-v-025d76b4>${ssrInterpolate(item.name)}</h4></div></div></div>`);
  });
  _push(`</div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-025d76b4"]]);

export { index as default };
//# sourceMappingURL=index-CjJX86Km.mjs.map
