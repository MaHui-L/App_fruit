<template>
    <div >
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/mains' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>添加商品分类</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <el-form :model="form" ref="form" :rules="rules" label-width="80px">
            <el-form-item label="分类名称" prop="cname">
                <el-input prefix-icon="" v-model="form.cname" placeholder="请输入分类名称" clearable>
                    <i slot="prefix" class="el-icon-user"></i>
                </el-input>
            </el-form-item>
            <el-form-item label="分类排序" prop="csort">
                <el-input prefix-icon="" v-model.number="form.csort" placeholder="分类排序" clearable>
                    <i slot="prefix" class="el-icon-sort"></i>
                </el-input>
            </el-form-item>
            <el-form-item label="缩略图" prop="cthumb">
                <el-upload  :action="uploadurl" :on-success="uploadSuccess" v-model="form.cthumb" placeholder="请上传缩略图">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('form')">提交</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {api} from "../../config/api";
    import {HOSTNAME,IMGHOSTNAME,} from "../../config/base";

    export default {
        name: "insert",
        data:function(){
            return {
                uploadurl:HOSTNAME+'/api/upload',
                imageUrl:'',
                rules: {
                    cname: [
                        {required: true, message: '商品分类不能为空', trigger: 'blur'},
                        {min: 2, max: 4, message: '长度在 2 到 4个字符', trigger: 'blur'}
                    ],
                    cthumb: [
                        {required: true, message: '缩略图不能为空', trigger: 'blur'},
                    ],
                    csort: [
                        {required: true, message: '排序不能为空', trigger: 'blur'}
                    ],
                },
                form: {
                    cname: '',
                    cthumb: '',
                    csort: '',
                },
            }
        },

        methods: {
            uploadSuccess(res){
                this.imageUrl = IMGHOSTNAME+res.src;
                this.form.cthumb = res.src;
                window.console.log(res);
            },
            submitForm(){
                api('post','/api/category',this.form)

            },
            // submitForm() {
            //     fetch(HOSTNAME + '/api/category',{
            //         method: 'POST',
            //         body:JSON.stringify(this.form),
            //         headers: new Headers({
            //             'Content-Type': 'application/json',
            //             'token':sessionStorage.getItem('token')
            //         })
            //     })
            //         .then(res=>res.json())
            //         .then(data=>{
            //             // console.log(data);
            //             let {code,msg} = data;
            //             if(code==TOKENFAIL){
            //                 this.$message({
            //                     type:'warning',
            //                     message:msg
            //                 })
            //             }
            //             if(code==SUCCESS){
            //                 this.$message({
            //                     type:'success',
            //                     message:msg
            //                 });
            //                 this.$refs.form.resetFields();
            //                 //写删除图片
            //             }else if(data.code==FAIL){
            //                 this.$message.error(data.msg)
            //             }
            //         })
            // },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style>
    .el-upload{
        border: 1px dashed #d9d9d9;
    }
</style>

<style scoped>
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
</style>