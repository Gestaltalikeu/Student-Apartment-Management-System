<template>
	<div>
		<el-dialog v-model="formVisible" :title="formTitle" width="80%" destroy-on-close :fullscreen='false'>
			<el-form class="formModel_form" ref="formRef" :model="form" label-width="$template2.back.add.form.base.labelWidth" :rules="rules">
				<el-row>
					<el-col :span="12">
						<el-form-item label="用户账号" prop="yonghuzhanghao">
							<el-select
								class="list_sel"
								:disabled="!isAdd||disabledForm.yonghuzhanghao?true:false"
								v-model="form.yonghuzhanghao" 
								placeholder="请选择用户账号"
								@change="yonghuzhanghaoChange">
								<el-option v-for="(item,index) in yonghuzhanghaoLists" :label="item" :value="item">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="用户姓名" prop="yonghuxingming">
							<el-input class="list_inp" v-model="form.yonghuxingming" placeholder="用户姓名"
								 type="text" 								:readonly="!isAdd||disabledForm.yonghuxingming?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="小区名称" prop="xiaoqumingcheng">
							<el-input class="list_inp" v-model="form.xiaoqumingcheng" placeholder="小区名称"
								 type="text" 								:readonly="!isAdd||disabledForm.xiaoqumingcheng?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="房间号" prop="fangjianhao">
							<el-input class="list_inp" v-model="form.fangjianhao" placeholder="房间号"
								 type="text" 								:readonly="!isAdd||disabledForm.fangjianhao?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="楼栋数" prop="loudongshu">
							<el-input class="list_inp" v-model="form.loudongshu" placeholder="楼栋数"
								 type="text" 								:readonly="!isAdd||disabledForm.loudongshu?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="物业费" prop="wuyefei">
							<el-input class="list_inp" v-model.number="form.wuyefei" placeholder="物业费"
								 type="number" 								:readonly="!isAdd||disabledForm.wuyefei?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="取暖费" prop="qunuanfei">
							<el-input class="list_inp" v-model.number="form.qunuanfei" placeholder="取暖费"
								 type="number" 								:readonly="!isAdd||disabledForm.qunuanfei?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="水电费" prop="shuidianfei">
							<el-input class="list_inp" v-model.number="form.shuidianfei" placeholder="水电费"
								 type="number" 								:readonly="!isAdd||disabledForm.shuidianfei?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="收费金额" prop="shoufeijine">
							<el-input class="list_inp" v-model="shoufeijine" :readonly="true" placeholder="收费金额" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="结算时间" prop="jiesuanshijian">
							<el-date-picker
								class="list_date"
								v-model="form.jiesuanshijian"
								format="YYYY 年 MM 月 DD 日"
								value-format="YYYY-MM-DD"
								type="datetime"
								:readonly="!isAdd||disabledForm.jiesuanshijian?true:false"
								placeholder="请选择结算时间" />
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer v-if="isAdd||type=='logistics'||type=='reply'">
				<span class="formModel_btn_box">
					<el-button class="formModel_cancel" @click="closeClick">取消</el-button>
					<el-button class="formModel_confirm" type="primary" @click="save"
						>
						提交
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<script setup>
	import {
		reactive,
		ref,
		getCurrentInstance,
		nextTick,
		computed,
		defineEmits
	} from 'vue'
	const context = getCurrentInstance()?.appContext.config.globalProperties;	
	const emit = defineEmits(['formModelChange'])
	//基础信息
	const tableName = 'feiyongxinxi'
	const formName = '费用信息'
	//基础信息
	//form表单
	const form = ref({})
	const disabledForm = ref({
		yonghuzhanghao : false,
		yonghuxingming : false,
		xiaoqumingcheng : false,
		fangjianhao : false,
		loudongshu : false,
		wuyefei : false,
		qunuanfei : false,
		shuidianfei : false,
		shoufeijine : false,
		jiesuanshijian : false,
		ispay : false,
	})
	const formVisible = ref(false)
	const isAdd = ref(false)
	const formTitle = ref('')
	//表单验证
	//匹配整数
	const validateIntNumber = (rule, value, callback) => {
		if (!value) {
			callback();
		} else if (!context?.$toolUtil.isIntNumer(value)) {
			callback(new Error("请输入整数"));
		} else {
			callback();
		}
	}
	//匹配数字
	const validateNumber = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isNumber(value)) {
			callback(new Error("请输入数字"));
		} else {
			callback();
		}
	}
	//匹配手机号码
	const validateMobile = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isMobile(value)) {
			callback(new Error("请输入正确的手机号码"));
		} else {
			callback();
		}
	}
	//匹配电话号码
	const validatePhone = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isPhone(value)) {
			callback(new Error("请输入正确的电话号码"));
		} else {
			callback();
		}
	}
	//匹配邮箱
	const validateEmail = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isEmail(value)) {
			callback(new Error("请输入正确的邮箱地址"));
		} else {
			callback();
		}
	}
	//匹配身份证
	const validateIdCard = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.checkIdCard(value)) {
			callback(new Error("请输入正确的身份证号码"));
		} else {
			callback();
		}
	}
	//匹配网站地址
	const validateUrl = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isURL(value)) {
			callback(new Error("请输入正确的URL地址"));
		} else {
			callback();
		}
	}
	const rules = ref({
		yonghuzhanghao: [
		],
		yonghuxingming: [
		],
		xiaoqumingcheng: [
			{required: true,message: '请输入',trigger: 'blur'}, 
		],
		fangjianhao: [
			{required: true,message: '请输入',trigger: 'blur'}, 
		],
		loudongshu: [
		],
		wuyefei: [
			{required: true,message: '请输入',trigger: 'blur'}, 
			{ validator: validateNumber, trigger: 'blur' },
		],
		qunuanfei: [
			{required: true,message: '请输入',trigger: 'blur'}, 
			{ validator: validateNumber, trigger: 'blur' },
		],
		shuidianfei: [
			{required: true,message: '请输入',trigger: 'blur'}, 
			{ validator: validateNumber, trigger: 'blur' },
		],
		shoufeijine: [
			{required: true,message: '请输入',trigger: 'blur'}, 
			{ validator: validateNumber, trigger: 'blur' },
		],
		jiesuanshijian: [
		],
		ispay: [
		],
	})
	//表单验证
	
	const formRef = ref(null)
	const id = ref(0)
	const type = ref('')
	//用户账号列表
	const yonghuzhanghaoLists = ref([])
	const shoufeijine =computed(()=>{
		let c = form.value
		let a = c.qunuanfei+c.wuyefei+c.shuidianfei
		form.value.shoufeijine = a?a.toFixed(2) : 0
		return a?a.toFixed(2) : 0
	})
	//methods

	//获取唯一标识
	const getUUID =()=> {
      return new Date().getTime();
    }
	//重置
	const resetForm = () => {
		form.value = {
			yonghuzhanghao: '',
			yonghuxingming: '',
			xiaoqumingcheng: '',
			fangjianhao: '',
			loudongshu: '',
			wuyefei: '',
			qunuanfei: '',
			shuidianfei: '',
			shoufeijine: '',
			jiesuanshijian: '',
			ispay: '未支付',
		}
	}
	//获取info
	const getInfo = ()=>{
		context?.$http({
			url: `${tableName}/info/${id.value}`,
			method: 'get'
		}).then(res => {
			let reg=new RegExp('../../../file','g')
			form.value = res.data.data
			formVisible.value = true
		})
	}
	const crossRow = ref('')
	const crossTable = ref('')
	const crossTips = ref('')
	const crossColumnName = ref('')
	const crossColumnValue = ref('')
	//初始化
	const init=(formId=null,formType='add',formNames='',row=null,table=null,statusColumnName=null,tips=null,statusColumnValue=null)=>{
		resetForm()
		if(formId){
			id.value = formId
			type.value = formType
		}
		if(formType == 'add'){
			isAdd.value = true
			formTitle.value = '新增' + formName
			formVisible.value = true
		}else if(formType == 'info'){
			isAdd.value = false
			formTitle.value = '查看' + formName
			getInfo()
		}else if(formType == 'edit'){
			isAdd.value = true
			formTitle.value = '修改' + formName
			getInfo()
		}
		else if(formType == 'cross'){
			isAdd.value = true
			formTitle.value = formNames
			// getInfo()
			for(let x in row){
				if(x=='yonghuzhanghao'){
					form.value.yonghuzhanghao = row[x];
					disabledForm.value.yonghuzhanghao = true;
					continue;
				}
				if(x=='yonghuxingming'){
					form.value.yonghuxingming = row[x];
					disabledForm.value.yonghuxingming = true;
					continue;
				}
				if(x=='xiaoqumingcheng'){
					form.value.xiaoqumingcheng = row[x];
					disabledForm.value.xiaoqumingcheng = true;
					continue;
				}
				if(x=='fangjianhao'){
					form.value.fangjianhao = row[x];
					disabledForm.value.fangjianhao = true;
					continue;
				}
				if(x=='loudongshu'){
					form.value.loudongshu = row[x];
					disabledForm.value.loudongshu = true;
					continue;
				}
				if(x=='wuyefei'){
					form.value.wuyefei = row[x];
					disabledForm.value.wuyefei = true;
					continue;
				}
				if(x=='qunuanfei'){
					form.value.qunuanfei = row[x];
					disabledForm.value.qunuanfei = true;
					continue;
				}
				if(x=='shuidianfei'){
					form.value.shuidianfei = row[x];
					disabledForm.value.shuidianfei = true;
					continue;
				}
				if(x=='shoufeijine'){
					form.value.shoufeijine = row[x];
					disabledForm.value.shoufeijine = true;
					continue;
				}
				if(x=='jiesuanshijian'){
					form.value.jiesuanshijian = row[x];
					disabledForm.value.jiesuanshijian = true;
					continue;
				}
			}
			if(row){
				crossRow.value = row
			}
			if(table){
				crossTable.value = table
			}
			if(tips){
				crossTips.value = tips
			}
			if(statusColumnName){
				crossColumnName.value = statusColumnName
			}
			if(statusColumnValue){
				crossColumnValue.value = statusColumnValue
			}
			form.value.ispay='未支付'
			formVisible.value = true
		}

		context?.$http({
			url: `${context?.$toolUtil.storageGet('sessionTable')}/session`,
			method: 'get'
		}).then(res => {
			var json = res.data.data
			if(context?.$toolUtil.storageGet("role")!="管理员") {
				disabledForm.value.xiaoqumingcheng = true;
			}
			if(context?.$toolUtil.storageGet("role")!="管理员") {
				disabledForm.value.shoufeijine = true;
			}
		})
		context?.$http({
			url: `option/fangwuxinxi/yonghuzhanghao`,
			method: 'get'
		}).then(res=>{
			yonghuzhanghaoLists.value = res.data.data
		})
		//由上级字段带出不可改
		disabledForm.value.yonghuxingming = true;
		//由上级字段带出不可改
		disabledForm.value.xiaoqumingcheng = true;
		//由上级字段带出不可改
		disabledForm.value.fangjianhao = true;
		//由上级字段带出不可改
		disabledForm.value.loudongshu = true;
	}
	//初始化
	//声明父级调用
	defineExpose({
		init
	})
	//关闭
	const closeClick = () => {
		formVisible.value = false
	}
	const yonghuzhanghaoChange=()=>{
		context?.$http({
			url: `follow/fangwuxinxi/yonghuzhanghao?columnValue=` + form.value.yonghuzhanghao,
			method: 'get'
		}).then(res=>{
			if(res.data.data.yonghuxingming){
				form.value.yonghuxingming = res.data.data.yonghuxingming
			}
			if(res.data.data.xiaoqumingcheng){
				form.value.xiaoqumingcheng = res.data.data.xiaoqumingcheng
			}
			if(res.data.data.fangjianhao){
				form.value.fangjianhao = res.data.data.fangjianhao
			}
			if(res.data.data.loudongshu){
				form.value.loudongshu = res.data.data.loudongshu
			}
		})
	}
	//富文本
	const editorChange = (e,name) =>{
		form.value[name] = e
	}
	//提交
	const save=()=>{
		var table = crossTable.value
		var objcross = JSON.parse(JSON.stringify(crossRow.value))
		let crossUserId = ''
		let crossRefId = ''
		let crossOptNum = ''
		if(type.value == 'cross'){
			if(crossColumnName.value!=''){
				if(!crossColumnName.value.startsWith('[')){
					for(let o in objcross){
						if(o == crossColumnName.value){
							objcross[o] = crossColumnValue.value
						}
					}
					//修改跨表数据
					changeCrossData(objcross)
				}else{
					crossUserId = context?.$toolUtil.storageGet('userid')
					crossRefId = objcross['id']
					crossOptNum = crossColumnName.value.replace(/\[/,"").replace(/\]/,"")
				}
			}
		}
		formRef.value.validate((valid)=>{
			if(valid){
				if(crossUserId&&crossRefId){
					form.value.crossuserid = crossUserId
					form.value.crossrefid = crossRefId
					let params = {
						page: 1,
						limit: 1000, 
						crossuserid:form.value.crossuserid,
						crossrefid:form.value.crossrefid,
					}
					context?.$http({
						url: `${tableName}/page`,
						method: 'get', 
						params: params 
					}).then(res=>{
						if(res.data.data.total>=crossOptNum){
							context?.$toolUtil.message(`${crossTips.value}`,'error')
							return false
						}else{
							context?.$http({
								url: `${tableName}/${!form.value.id ? "save" : "update"}`,
								method: 'post', 
								data: form.value 
							}).then(res=>{
								context?.$toolUtil.message(`操作成功`,'success',()=>{
									formVisible.value = false
									emit('formModelChange')
								})
							})
						}
					})
				}else{
					context?.$http({
						url: `${tableName}/${!form.value.id ? "save" : "update"}`,
						method: 'post', 
						data: form.value 
					}).then(res=>{
						context?.$toolUtil.message(`操作成功`,'success',()=>{
							formVisible.value = false
							emit('formModelChange')
						})
					})
				}
			}
		})
	}
	//修改跨表数据
	const changeCrossData=(row)=>{
		context?.$http({
			url: `${crossTable.value}/update`,
			method: 'post',
			data: row
		}).then(res=>{})
	}
</script>
<style lang="scss" scoped>
	// 表单
	.formModel_form{
		border: 0px solid rgba(254, 182, 203, 0.5);
		border-radius: 0px;
		padding: 40px 30px;
		margin: 0;
		background: #fff;
		// form item
		:deep(.el-form-item) {
			margin: 0 150px 20px 0;
			background: none;
			display: flex;
			//label
			.el-form-item__label {
			 color: #666;
			 background: none;
			 font-weight: 500;
			 display: block;
			 width: 150px;
			 text-align: right;
			 min-width: 150px;
			}
			// 内容盒子
			.el-form-item__content {
				display: flex;
				width: calc(100% - 120px);
				justify-content: flex-start;
				align-items: center;
				flex-wrap: wrap;
				// 输入框
				.list_inp {
					border: 1px solid rgba(255, 255, 255, 0.25);
					border-radius: 0px;
					padding: 0 10px;
					color: #666;
					background: rgba(0, 0, 0, 0.1);
					width: auto;
					line-height: 36px;
					box-sizing: border-box;
					min-width: 350px;
					height: 36px;
					//去掉默认样式
					.el-input__wrapper{
						border: none;
						box-shadow: none;
						background: none;
						border-radius: 0;
						height: 100%;
						padding: 0;
					}
					.is-focus {
						box-shadow: none !important;
					}
				}
				//日期选择器
				.list_date {
					border: 1px solid rgba(255, 255, 255, 0.25);
					border-radius: 0px;
					color: #666;
					background: rgba(0, 0, 0, 0.1);
					width: auto;
					line-height: 36px;
					box-sizing: border-box;
					min-width: 250px;
					//去掉默认样式
					.el-input__wrapper{
						border: none;
						box-shadow: none;
						background: none;
						border-radius: 0;
						height: 100%;
					}
				}
				// 下拉框
				.list_sel {
					border: 1px solid rgba(255, 255, 255, 0.25);
					border-radius: 0px;
					padding: 0 10px;
					color: #666;
					background: rgba(0, 0, 0, 0.1);
					width: auto;
					line-height: 36px;
					box-sizing: border-box;
					min-width: 300px;
					//去掉默认样式
					.select-trigger{
						height: 100%;
						.el-input{
							height: 100%;
							.el-input__wrapper{
								border: none;
								box-shadow: none;
								background: none;
								border-radius: 0;
								height: 100%;
								padding: 0;
							}
							.is-focus {
								box-shadow: none !important;
							}
						}
					}
				}
			}
		}
	}
	// 按钮盒子
	.formModel_btn_box {
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		.formModel_cancel {
			border: 1px solid #d43f3a;
			cursor: pointer;
			border-radius: 3px;
			padding: 0 24px;
			margin: 0 20px 0 0;
			outline: none;
			color: #fff;
			background: rgba(217, 83, 79, 0.45);
			width: auto;
			font-size: 14px;
			min-width: 100px;
			height: 36px;
		}
		.formModel_cancel:hover {
		}
		
		.formModel_confirm {
			border: 1px solid #357ebd;
			cursor: pointer;
			border-radius: 3px;
			padding: 0 24px;
			margin: 0 20px 0 0;
			outline: none;
			color: #fff;
			background: rgba(66, 139, 202, 0.55);
			width: auto;
			font-size: 14px;
			min-width: 100px;
			height: 36px;
		}
		.formModel_confirm:hover {
		}
	}
</style>