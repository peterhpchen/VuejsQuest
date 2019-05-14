module.exports = {
  base: '/VuejsQuest/',
  title: '勇者鬥 Vue 龍',
  description: 'Vue.js 學習之旅',
  head: [
    ['link', { rel: 'icon', href: '/logo.ico' }]
  ],
  themeConfig: {
    nav: [
      { text: '基礎', link: '/basic/' }
    ],
    sidebar: {
      '/basic/': [
        '',
        '01_Preface',
        '02_FirstVue',
        '03_Instance',
        '04_Lifecycle',
        '05_Mustache',
        '06_Directives',
        '07_Computed',
        '08_Watcher',
        '09_ComputedVSWatch',
        '10_Class',
        '11_Style',
        '12_Conditional',
        '13_For',
        '14_Reactivity',
        '15_Set',
        '16_Event',
        '17_EventModifier',
        '18_KeyModifier',
        '19_FormInputBinding',
        '20_ComponentBasic',
        '21_ComponentData',
        '22_ComponentRegistration',
        '23_Props',
        '24_PropsValidation',
        '25_PropsAttribute',
        '26_CustomEvent',
        '27_Slots',
        '28_KeepAlive',
        '29_AsyncComponent',
        '30_End',
        '31_AccessOtherComponent',
        '32_DependencyInjection'
      ]
    }
  }
}
