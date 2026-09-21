	import {
		createRouter,
		createWebHashHistory
	} from 'vue-router'
	import fangwuxinxi from '@/views/fangwuxinxi/list'
	import cheweixinxi from '@/views/cheweixinxi/list'
	import weixiushenqing from '@/views/weixiushenqing/list'
	import xinjianxinxi from '@/views/xinjianxinxi/list'
	import yonghu from '@/views/yonghu/list'
	import renlianshibiechuru from '@/views/renlianshibiechuru/list'
	import huodongxinxi from '@/views/huodongxinxi/list'
	import cheliangxinxi from '@/views/cheliangxinxi/list'
	import cheweigoumai from '@/views/cheweigoumai/list'
	import feiyongxinxi from '@/views/feiyongxinxi/list'
	import users from '@/views/users/list'
	import tousuxinxi from '@/views/tousuxinxi/list'
	import yonghuRegister from '@/views/yonghu/register'
	import yonghuCenter from '@/views/yonghu/center'

export const routes = [{
		path: '/login',
		name: 'login',
		component: () => import('../views/login.vue')
	},{
		path: '/',
		name: '首页',
		component: () => import('../views/index'),
		children: [{
			path: '/',
			name: '首页',
			component: () => import('../views/HomeView.vue'),
			meta: {
				affix: true
			}
		}, {
			path: '/updatepassword',
			name: '修改密码',
			component: () => import('../views/updatepassword.vue')
		}
		
		,{
			path: '/yonghuCenter',
			name: '用户个人中心',
			component: yonghuCenter
		}
		,{
			path: '/fangwuxinxi',
			name: '房屋信息',
			component: fangwuxinxi
		}
		,{
			path: '/cheweixinxi',
			name: '车位信息',
			component: cheweixinxi
		}
		,{
			path: '/weixiushenqing',
			name: '维修申请',
			component: weixiushenqing
		}
		,{
			path: '/xinjianxinxi',
			name: '信件信息',
			component: xinjianxinxi
		}
		,{
			path: '/yonghu',
			name: '用户',
			component: yonghu
		}
		,{
			path: '/renlianshibiechuru',
			name: '人脸识别出入',
			component: renlianshibiechuru
		}
		,{
			path: '/huodongxinxi',
			name: '活动信息',
			component: huodongxinxi
		}
		,{
			path: '/cheliangxinxi',
			name: '车辆信息',
			component: cheliangxinxi
		}
		,{
			path: '/cheweigoumai',
			name: '车位购买',
			component: cheweigoumai
		}
		,{
			path: '/feiyongxinxi',
			name: '费用信息',
			component: feiyongxinxi
		}
		,{
			path: '/users',
			name: '管理员',
			component: users
		}
		,{
			path: '/tousuxinxi',
			name: '投诉信息',
			component: tousuxinxi
		}
		]
	},
	{
		path: '/yonghuRegister',
		name: '用户注册',
		component: yonghuRegister
	},
	{
		path: '/forget',
		name: 'forget',
		component: () => import('../views/forget.vue')
	}
]

const router = createRouter({
	history: createWebHashHistory(process.env.BASE_URL),
	routes
})

export default router
