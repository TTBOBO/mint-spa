
const hm = {



	/**
	 * 
	 * @param {Object} data  data数据
	 */
	drawline: function (data) {
		var text = data.title.text ? data.title.text : ''
		var x = data.title.x ? data.title.x : 'center'; //默认为左边
		var option = {
			title: {
				text: text,
				bottom: 0,
				x: 'center'
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: data.Ddata
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '15%',
				top: '10%',
				containLabel: true
			},
			toolbox: {
				feature: {
					saveAsImage: {
						left: 0
					}
				}
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: data.xData
			},
			yAxis: {
				type: 'value'
			},
			series: [
				{
					name: data.name,
					type: 'line',
					stack: '总量',
					data: data.sData
				}
			]
		}

		return option;
	},

	drawCol: function (data) {
		var text = data.title.text ? data.title.text : ''
		var x = data.title.x ? data.title.x : 'center'; //默认为左边
		var option = {
			title: {
				text: text,
				bottom: 0,
				x: 'center'
			},
			color: ['#3398DB', 'red'],
			tooltip: {
				trigger: 'axis',
			},
			toolbox: {
				feature: {
					saveAsImage: {}
				}
			},
			grid: {
				left: '3%',
				right: '10%',
				bottom: '19%',
				top: '10%',
				containLabel: false
			},
			xAxis: [
				{
					type: 'category',
					data: data.xData,
					axisTick: {
						alignWithLabel: false
					}
				}
			],
			yAxis: [
				{
					type: 'value'
				}
			],
			series: [
				{
					name: data.name,
					type: 'bar',
					barWidth: '35%',
					data: data.sData
				}
			]
		};
		return option;

	},
	chartResize: function (fun) {
		window.addEventListener("resize", function () {
			if (typeof (fun) == 'function') {
				window.onresize = fun.resize()
			}
			window.onresize = fun.resize();
		});
	},
	getKey: function (obj) {
		var Obj = {};
		for (var key in obj) {
			Obj[key] = obj[key];
		}
		return Obj;
	},
	/**
	 * 
	 * @param {*} routers   所有路由
	 * @param {*} path      路由path
	 * 当path 在routers存在时  返回当前的对象
	 */
	getRouter(routers, path) {
		if (!path || !routers || !routers.length) {
			return false;
		}
		let returnObj = null;
		for (let item of routers) {
			if (item.path == path) {
				return item;
			}
			if (item.children) {
				returnObj = hm.getRouter(item.children, path);
				if (returnObj) {
					return returnObj;
				}
			}
		}
		return null;
	},
	/**
	 * 
	 * @param {*} routers   所有路由
	 * @param {*} name      跳转路由的名称
	 * @param {*} route     router
	 * @param {*} next      跳转
	 * 当name为 一级路由时   默认跳转到 第一个子路由
	 */
	toDefaultPage(routers, name, route, next) {
		let len = routers.length;
		let i = 0;
		let notHandle = true;
		while (i < len) {
			if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
				route.replace({
					name: routers[i].children[0].name
				});
				notHandle = false;
				next();
				break;
			}
			i++;
		}
		if (notHandle) {
			next();
		}
	},

	/**
	 * 
	 * @param {*列表权限值} access 
	 * @param {*所有权限值} accessArr 
	 */
	showRouter(access, accessArr) {
		if (!accessArr || !access) {
			return false;
		}
		return hm.getIndexOf(access, accessArr);
	},

	getIndexOf(ele, agr) {
		if (agr.indexOf(ele) != -1) {
			return true;
		} else {
			return false;
		}
	},

	/**
	 * 
	 * @param {String} meta   设置meta 标题
	 */
	title(meta) {
		const title = meta ? meta.title || '惠民后台管理系统' : '惠民后台管理系统';
		document.title = title;
	},
	/**
	 * 
	 * @param {*} vm   全局vue
	 * @param {*} routerName  当前路由
	 */
	setCurrentPath(vm, routerName) {
		let title = '';
		let path = '';
		let otherRouter = false;

		vm.$store.state.pageInfo.routers.forEach((item) => {
			if (item.children.length == 1) {
				if (item.children[0].name == routerName) {
					title = item.title;
					path = item.path;
					if (item.name === 'otherRouter') {
						otherRouter = true;
					}
				}
			} else {
				item.children.forEach((child) => {
					if (child.name == routerName) {
						title = child.title;
						path = path;
						if (item.name === 'otherRouter') {
							otherRouter = true;
						}
					}
				})
			}
		})


		let crumbPathArr = [];  //面包屑数据
		//根据name值  决定路由
		if (routerName == 'Info') {
			let itemRes = hm.getRouterTitle(vm.$store.state.pageInfo.routers, 'Info');
			crumbPathArr = [{
				title: itemRes.title,
				path: itemRes.path,
				name: itemRes.name,
			}]
		} else if (otherRouter) {  //当不是在 左侧栏路由时   otherRouter
			let itemRes = hm.getRouterTitle(vm.$store.state.pageInfo.routers, 'Info');
			crumbPathArr = [{
				title: itemRes.title,
				path: itemRes.path,
				name: itemRes.name,
			}, {
				title: title,
				path: path,
				name: routerName,
			}]
		} else {
			let currentPathObj = vm.$store.state.pageInfo.routers.filter((item) => {
				if (item.children <= 1) { //只有一个子节点时
					return item.children[0].name == routerName;
				} else {
					let i = 0;
					let length = item.children.length;
					let childArr = item.children;
					while (i < length) {
						if (childArr[i].name == routerName) {
							return true;
						}
						i++;
					}
				}
			})[0];   //过滤掉不在当前name的路由组  或  父路由  取数组第0个
			if (currentPathObj.children.length <= 1 && currentPathObj.name == 'home') {
				crumbPathArr = [
					{
						title: '首页',
						path: '/info',
						name: 'Info'
					}
				];
			} else if (currentPathObj.children.length <= 1 && currentPathObj.name != 'home') {
				crumbPathArr = [
					{
						title: '首页',
						path: '/info',
						name: 'Info'
					}, {
						title: currentPathObj.title,
						path: currentPathObj.path,
						name: currentPathObj.name,
					}
				];
			} else {
				let childObj = currentPathObj.children.filter((child) => {
					return child.name == routerName;
				})[0];  //返回一个数组且取第0个
				crumbPathArr = [
					{
						title: '首页',
						path: '/info',
						name: 'Info'
					},
					{
						title: currentPathObj.title,
						path: '',
						name: currentPathObj.name,
					},
					{
						title: childObj.title,
						path: childObj.path,
						name: name
					}
				];
			}
		}
		vm.$store.commit('SETCRUMBPATH', crumbPathArr);
		return crumbPathArr;
	},


	getRouterTitle(routers, name) {
		let titleObj = '';
		if (!name || !routers || !routers.length) {
			return false;
		}
		for (let item of routers) {
			//以及菜单
			if (item.name === name) {
				return item;
			}
			//字菜单
			titleObj = hm.getRouterTitle(item.children, name);
			if (titleObj) {
				return titleObj;
			}
		}
		return false;
	},
	filterTime(val) {
		if (!val) return '';
		// 测试时间戳: 1495159106281 => 2017/5/19 9:58
		// 正式时间戳: new Date(val).getTime()
		let creaTime = new Date(val).getTime(),
			curTime = new Date().getTime(),
			$Date = new Date(val),
			year = $Date.getFullYear(),    // 年
			month = $Date.getMonth() + 1,  // 月
			date = $Date.getDate(),        // 日
			diffTime = curTime - creaTime,                // 毫秒差
			diffSecounds = Math.floor(diffTime / 1000),   // 秒差
			diffMinutes = Math.floor(diffSecounds / 60),  // 分钟差
			diffHours = Math.floor(diffMinutes / 60),     // 小时差
			diffDays = Math.floor(diffHours / 24);        // 天差

		if (diffMinutes === 0) {
			return diffSecounds + '秒前'
		}
		if (diffHours === 0) {
			return diffMinutes + '分钟前'
		}
		if (diffDays === 0) {
			return diffHours + '小时前'
		}
		if (diffDays > 0 && diffDays <= 20) {
			return diffDays + '天前'
		}
		if (diffDays > 20) {
			return year + '-' + month + '-' + date
		}
	},

	getRoleList(data) {
		data = [
			{ id: 3, title: 角色列表, href: "/admin/auser/role", parent_id: 0, type: 0, icon: "fa fa-globe", active: 0, menu_open: 0, create_at: "2017-11-29 11:15:57", update_at: "2017-11-29 11:15:57", is_show: 1},
			{ id: 4, title: 权限列表, href: "/admin/auser/permission", parent_id: 3, type: 0, icon: "fa fa-briefcase", active: 0, menu_open: 0, create_at: "2017 - 11 - 29 11: 15: 57", update_at: "2017 - 11 - 29 11: 15: 57", is_show: 1}];
		let treeData = [];
		data.forEach((item, index) => {
			item.expand = false;
			if (item.parent_id == 0) {
				list.push({
					title:item.title,
					id:item.id
				});
			}
		})

		var treedataLevs =[];

		for(var i = 0; i < treeData.length; i++) {
			treedataLevs.push({
				treedataLev:hm.getChildList(data,treeData[i].id)
			})
		}

	},
	getChildList(arr, id) {
		var temp = [],lev=0,item = '';
		var forFn = function(arr, id,lev) {
			for(var i = 0; i < arr.length; i++) {
				item = arr[i];
				if(item.parent_id == id) {
					item.lev=lev;
					temp.push(item);
					forFn(arr,item.id,lev+1);
				}
			}
		}
		forFn(arr, id,lev);
		console.log(temp);
		return temp;
		
	},
	getTreeData(dataList,defaultData) {
			let baseData = [];
			var data = dataList;
			let treedata = []
			var _this = this;
			//查找最顶层
			let len = data.length
			for(let j=0;j<len;j++){
				data[j].expand = false
				data[j].title = data[j].title
				if(data[j].parent_id == 0){
					treedata.push({
						"expand":true,
						"title":data[j].title,
						"id":data[j].id,
						checked:false
					})
				}
			}
			//找到跟最高层id相关的子子孙孙，并给子孙添加lev
			var treedataLevs =[]
			for(let h=0,ls=treedata.length;h<ls;h++){
				treedataLevs.push({
					treedataLev:sonsTree(data,treedata[h].id)
				})
			}
			for(let p=0,lq=treedataLevs.length;p<lq;p++){
				var treedataLev = treedataLevs[p].treedataLev
				//找到最高层的lev
				var maxLev = 0
				for(let i=0,lt=treedataLev.length;i<lt;i++){
					if(parseInt(treedataLev[i].lev) > maxLev){
						maxLev = parseInt(treedataLev[i].lev)
					}else{
						maxLev = maxLev
					}
				}
				//比较当前层和上一层的数据，然后做处理
				var needLev = maxLev
				var maxLevTree = []
				var maxLevTreePrev = []
				for(let m=0;m<maxLev;m++){
					maxLevTree = getLevArr(treedataLev,needLev)
					maxLevTreePrev = getLevArr(treedataLev,needLev-1)
					for(var j=0,lp=maxLevTreePrev.length;j<lp;j++){
						maxLevTreePrev[j].children = new Array()
						for(var i=0,lm=maxLevTree;i<lm.length;i++){
							if(maxLevTree[i].parent_id == maxLevTreePrev[j].id){
								maxLevTreePrev[j].children.push(maxLevTree[i])
							}
						}
					}
					needLev--
				}
				treedata[p].children = maxLevTreePrev
			}
			treedata.forEach((item) => {  //defaultData  [1,2,3,4,5]
				if(item.children.length == 0 &&  defaultData ? (defaultData.indexOf(item.id) != -1 || defaultData[0] == "*"  ? true : false) : false) {
					item.checked = true;
				}
			})
			baseData = treedata
			//找出同一级的数据
			function getLevArr(arr,lev){
				var newarr = []
				for(let i=0,la=arr.length;i<la;i++){
					//这里对arr 的children 做处理
					arr.children = new Array()
					if(parseInt(arr[i].lev) == lev){
						newarr.push(arr[i])
					}
				}
				return newarr
			}
			//给每个数据添加一个lev
			function sonsTree(arr,id){
				var temp = [],lev=0;
				var forFn = function(arr, id,lev){
					for (var i = 0; i < arr.length; i++) {
						var item = arr[i];
						if (item.parent_id==id ) {
							item.lev=lev;
							if(defaultData ? (defaultData.indexOf(item.id) != -1 || defaultData[0] == "*" ? true : false) : "") {
								item.checked = true;
							}
							temp.push(item);
							forFn(arr,item.id,lev+1);

						}
					}
				};
				forFn(arr, id,lev);
				return temp;
			}
			console.log(baseData);
			return baseData;
			
	}
}


export default hm;

