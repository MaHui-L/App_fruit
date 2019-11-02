<template>
    <div v-loading.fullscreen.lock="loading" element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.5)" >
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/mains' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <el-form :model="form" ref="form" :rules="rules" label-width="80px">
            <el-form-item label="所属分类" prop="cid">
                <template>
                    <el-select v-model="form.cid" clearable placeholder="请选择">
                        <el-option v-for="item in category" :key="item.id" :label="item.cname" :value="item.id">
                        </el-option>
                    </el-select>
                </template>
            </el-form-item>
            <el-form-item label="商品名称" prop="gname">
                <el-input prefix-icon="" v-model="form.gname" placeholder="请输商品名称5-30个字符" clearable>
                    <i slot="prefix" class="el-icon-user"></i>
                </el-input>
            </el-form-item>
            <el-form-item label="商品原价" prop="oprice">
                <el-input prefix-icon="" v-model.number="form.oprice" placeholder="商品原价" clearable>
                    <i slot="prefix" class="el-icon-sort"></i>
                </el-input>
            </el-form-item>
            <el-form-item label="商品现价" prop="nprice">
                <el-input prefix-icon="" v-model.number="form.nprice" placeholder="商品现价" clearable>
                    <i slot="prefix" class="el-icon-sort"></i>
                </el-input>
            </el-form-item>
            <el-form-item label="商品描述" prop="description">
                <el-input prefix-icon="" v-model.number="form.description" placeholder="商品描述" clearable>
                    <i slot="prefix" class="el-icon-sort"></i>
                </el-input>
            </el-form-item>
            <el-form-item label="商品库存" prop="gstock">
                <el-input prefix-icon="" v-model.number="form.gstock" placeholder="商品库存" clearable>
                    <i slot="prefix" class="el-icon-sort"></i>
                </el-input>
            </el-form-item>
            <el-form-item label="缩略图" prop="gthumb">
                <el-upload  :action="uploadurl" :on-success="gthumbUploadS" v-model="form.gthumb" placeholder="请上传缩略图">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="轮播图" prop="gbanner"></el-form-item>
            <el-form-item>
                <el-upload
                        multiple
                        :action="uploadurl"
                        list-type="picture-card"
                        :on-success="bannerUploadS"
                        :show-file-list="false">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <ul v-if="bannerArr.length" class="banner-box">
                    <li v-for="(item,index) in bannerArr" :key="index" @mouseenter="showMask(index)" @mouseleave="hiddenMask(index)">
                        <div class="mask" ref="mask">
                            <i class="el-icon-plus" @click="previewImage(index)"></i>
                            <i class="el-icon-delete" @click="deleteImage(index)"></i>
                        </div>
                        <img :src="imgBanner+item" alt="">
                    </li>
                </ul>
                <el-dialog :visible.sync="bannerVisible">
                    <img width="100%" :src="bannerImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="详情图" prop="gdetail"></el-form-item>
            <el-form-item>
                <el-upload
                        multiple
                        :action="uploadurl"
                        :on-preview="detailPreview"
                        :on-remove="detailRemove"
                        list-type="picture-card"
                        :on-success="detailUploadS">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="detailVisible">
                    <img width="100%" :src="detailImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="商品品牌" prop="gbrand">
                <el-input prefix-icon="" v-model.number="form.gbrand" placeholder="商品品牌" clearable>
                    <i slot="prefix" class="el-icon-sort"></i>
                </el-input>
            </el-form-item>
            <el-form-item label="商品规格" prop="gnorms">
                <el-input prefix-icon="" v-model.number="form.gnorms" placeholder="商品规格" clearable>
                    <i slot="prefix" class="el-icon-sort"></i>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('form')">提交</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {SUCCESS,FAIL,HOSTNAME,TOKENFAIL,IMGHOSTNAME} from "../../config/base";

    export default {
        name: "insert",
        data:function(){
            return {
                uploadurl:HOSTNAME+'/api/upload',
                imageUrl:'',
                rules: {
                    cid: [
                        {required: true, message: '所属分类不能为空', trigger: 'change'},
                    ],
                    gname: [
                        {required: true, message: '商品名称不能为空', trigger: 'blur'},
                    ],
                    gthumb: [
                        {required: true, message: '缩略图不能为空', trigger: 'blur'},
                    ],
                    gbanner: [
                        {required: true, message: '轮播图不能为空', trigger: 'blur'}
                    ],
                    nprice: [
                        {required: true, message: '现价不能为空', trigger: 'blur'}
                    ],
                    oprice: [
                        {required: true, message: '原价不能为空', trigger: 'blur'}
                    ],
                    gdetail: [
                        {required: true, message: '商品详情不能为空', trigger: 'blur'}
                    ],
                    gstock:[
                        {required: true, message: '商品库存不能为空', trigger: 'blur'}
                    ],
                    description:[
                        {required: true, message: '商品描述不能为空', trigger: 'blur'}
                    ],
                    gbrand:[
                        {required: true, message: '商品品牌不能为空', trigger: 'blur'}
                    ],
                    gnorms:[
                        {required: true, message: '商品品牌不能为空', trigger: 'blur'}
                    ],
                },
                form: {
                    cid:'',
                    gname: '',
                    nprice: '',
                    oprice: '',
                    gdetail: '',
                    gthumb: '',
                    gbanner: '',
                    gstock:'',
                    description:'',
                    gbrand:'',
                    gnorms:'',
                },
                category:[],
                loading:true,
                bannerArr:[],
                detailArr:[],
                imgBanner:IMGHOSTNAME,
                bannerVisible:false,
                bannerImageUrl:'',
                mask:'',
                detailImageUrl:'',
                detailVisible:false,
            }
        },
        methods: {
            //缩略图上传
            gthumbUploadS(res){
                this.imageUrl = IMGHOSTNAME+res.src;
                this.form.gthumb = res.src;
            },
            //遮罩层移入事件
            showMask(index){
                // window.console.log(this.$refs);
                this.$refs.mask[index].style.display='flex'
            },
            //遮罩层移出事件
            hiddenMask(index){
                this.$refs.mask[index].style.display='none'
            },
            //轮播图图上传
            bannerUploadS(res){
                this.bannerArr.push(res.src);
                // this.form.gbanner=this.bann                                                                              erArr.join()
            },
            //轮播图预览图片
            previewImage(index){
                this.bannerVisible = true;
                this.bannerImageUrl = IMGHOSTNAME +this.bannerArr[index];
            },
            //轮播图删除图片
            deleteImage(index){
                this.bannerVisible = false;
                this.bannerImageUrl = IMGHOSTNAME +this.bannerArr.splice(index,1);

            },
            //详情图上传
            detailUploadS(res){
                this.detailArr.push(res.src);
            },
            //详情图删除
            detailRemove(file) {
                this.detailArr=this.detailArr.filter(ele=>ele!=file.response.src);
            },
            //详情图预览放大
            detailPreview(file) {
                this.detailImageUrl = file.url;
                this.detailVisible = true;
                // this.detailImageUrl = IMGHOSTNAME +this.detailArr[file];
            },
            //获取分类
            getCate(){
                fetch(HOSTNAME + '/api/category',{
                    method:'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'token':sessionStorage.getItem('token')
                    })
                })
                    .then(res=>res.json())
                    .then(data=>{
                        this.loading = false;
                        if(data.code==SUCCESS){
                            this.category =  data.data;
                        }
                    })
            },
            //提交数据
            submitForm() {
                fetch(HOSTNAME + '/api/goods',{
                    method: 'POST',
                    body:JSON.stringify(this.form),
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'token':sessionStorage.getItem('token')
                    })
                })
                    .then(res=>res.json())
                    .then(data=>{
                        // console.log(data);
                        let {code,msg} = data;
                        if(code==TOKENFAIL){
                            this.$message({
                                type:'warning',
                                message:msg
                            })
                        }
                        if(code==SUCCESS){
                            this.$message({
                                type:'success',
                                message:msg
                            });
                            this.$refs.form.resetFields();
                            //写删除图片
                        }else if(data.code==FAIL){
                            this.$message.error(data.msg)
                        }
                    })
            },
            //重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        watch:{
            bannerArr(){
                this.form.gbanner=this.bannerArr.join(',');
                // window.console.log(this.form.gbanner)
            },
            detailArr(){
                this.form.gdetail=this.detailArr.join(',');
                // window.console.log(this.form.gbanner)
            },
        },
        beforeMount() {
            this.getCate();
        }
    }
</script>
<style>
    .el-upload{
        border: 1px dashed #d9d9d9;
    }
</style>

<style scoped lang="scss">
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .banner-box{
        display: flex;
        >li{
            justify-content: center;
            align-items: center;
            width: 150px;
            height: 150px;
            margin: 5px;
            position: relative;
            >.mask{
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.3);
                border-radius: 6px;
                overflow: hidden;
                display: none;
                justify-content: center;
                align-items: center;
                position: absolute;
                left: 0;
                top:0;
                >i{
                    color: #ffffff;
                    margin: 0 5px;
                }
            }
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
</style>