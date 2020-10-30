module.exports = {
    title: '前端面试小册',
    description: '为前端求职路上的你写的一本手册',
    cache: false,
    base: '/frontend-interview/', // 部署到gitee时需要配置此项
    themeConfig: {
        nav: [
            { text: '基础', link: '/base/HTML' },
            { text: '进阶', link: '/advance/Algorithm' },
            { text: '面试与简历', link: '/interview/' },
            // { text: '前端网址导航', link: 'https://github.com/JohnSnow93/front-end-interview' },
            { text: 'Github', link: 'https://github.com/JohnSnow93/front-end-interview' },
        ],
        sidebar: {
            '/base/': [
                'HTML',
                'CSS-Basic',
                'CSS-Practice',
                'JS-Basic',
                // 'ES6',
                // 'BOMAndDOMAndBrowser',
                // 'javascript'
                // {
                //     title: 'JavaScript',   // 必要的
                //     path: '/base/javascript/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                //     collapsable: false, // 可选的, 默认值是 true,
                //     sidebarDepth: 1,    // 可选的, 默认值是 1
                //     children: [
                //         // '/base/javascript/JS-Basic'
                //     ]
                // },
            ],
            '/advance/': [
              'Algorithm',
              'React',
              'Vue',
              'Webpack',
              'DesignPattern',
              'NetworkAndSecurity',
              'ComplexQuestion'
            ],
            '/interview/': [''],
            // fallback
            '/': [
                '',
                // 'base',
                // 'advance',
                // 'interview'
            ]
        }
    },
    plugins: [
        [
            'vuepress-plugin-comment',
            {
                choosen: 'valine',
                // options选项中的所有参数，会传给Valine的配置
                options: {
                    el: '#valine-vuepress-comment',
                    appId: 'OUyhEkrYLAbScvXeYrYyrzmn-gzGzoHsz',
                    appKey: 'lL4DIdzykjlrAxAjjeLp6zYv'
                },
                container: '.page-nav'
            }
        ]
    ]
}
