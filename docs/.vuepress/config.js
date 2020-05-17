module.exports = {
    title: '前端面试小册',
    description: '为前端求职路上的你写的一本手册',
    cache: false,
    themeConfig: {
        nav: [
            { text: '基础', link: '/base/HTML' },
            { text: '进阶', link: '/advance/' },
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
                'ES6',
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
            '/advance/': [''],
            '/interview/': [''],
            // fallback
            '/': [
                '',
                // 'base',
                // 'advance',
                // 'interview'
            ]
        }
    }
}
