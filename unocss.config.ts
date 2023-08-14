// uno.config.ts
import { defineConfig, presetUno, presetIcons, toEscapedSelector as e } from 'unocss';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import transformerDirectives from '@unocss/transformer-directives';
import transformCompileClass from '@unocss/transformer-compile-class';

import presetRemToPx from '@unocss/preset-rem-to-px';
import presetPxToRem from './build/plugins/unocss-px-to-rem';


import path from 'node:path';
const rootDir = path.join(__dirname);
export default defineConfig({
  theme: {
    boxShadow: {
      1: '0 0 0 5px rgba(43, 57, 94, .1)'
    },
    colors: {
      'default': '#ddd',
      'primary': '#2c416e',
      'footer': '#3a3d41',
      'gray-333': '#333',
      'gray-666': '#666',
      'gray-999': '#999'
    },
    breakpoints: {
      sm: '375px',
      md: '750px',
    },

  },
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html|less|css|scss)($|\?)/,
      ],
    }
  },
  presets: [
    presetUno(),
    presetRemToPx({ baseFontSize: 4 }),
    presetPxToRem({ baseFontSize: 10 }),
    presetIcons({
      unit: 'px',
      customizations: {},
      extraProperties: {
        width: 'inherit',
        height: 'inherit'
      }
    })
  ],
  transformers: [
    transformCompileClass(),
    transformerVariantGroup(),
    transformerDirectives({
      applyVariable: ['--apply']
    }),
  ],
  rules: [
    [/^lh-(\d+)-(\d+)$/, ([, c, b]) => {
      return { 'line-height': +c / +b, 'font-size': `${b}px` };
    }],
    [/^w-h-(\d+)$/, ([, c]) => {
      return { height: `${c}px`, width: `${c}px` };
    }],
    [/^pic-?(\d+)?-?(\d+)?$/, ([, w, h], { rawSelector, currentSelector, variantHandlers, theme }) => {
      const selector = e(rawSelector);
      let pic = `${selector}{display:block;overflow:hidden;`;
      if (+w) {
        pic += `width:${+w / 10}rem;`;
      }
      if (+h) {
        pic += `height:${+h / 10}rem`;
      }
      pic += '}';
      const img = `${selector} img{width:100%;height:100%;object-fit:cover;}`;
      return `${pic}${img}`;
    }],
  ],
  shortcuts: [
    [/^container$/, () => {
      const w = 1920 - 165 * 2 + 40;
      return `relative max-w-${w} px-20 m-auto lt-md:px-15 lt-md:max-w-full`;
    }],
    [/^ellipsis-(\d+)$/, ([, c]) => {
      let str = 'truncate';
      if (Number(c) > 1) {
        str = `line-clamp-${c}`;
      }
      return str;
    }],
    {
      'items-c': 'flex items-center',
      'justify-c': 'flex justify-center',
      'flex-c': 'flex items-center justify-center',
      'section-title': 'c-gray-333 lh-45-32 h-45 fw-bold lt-md:(text-24 h-auto)',
      'section-title-light': 'c-white lh-45-32 h-45 fw-bold'
    },
  ]
});
