<template>
    <div v-if="form">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/mains' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>修改商品分类</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <el-form :model="form" ref="form"  label-width="80px">
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
                <el-upload  :action="uploadurl" :on-success="uploadSuccess"  v-model="form.cthumb" placeholder="请上传缩略图">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(id)">提交</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {SUCCESS,FAIL,HOSTNAME,TOKENFAIL,IMGHOSTNAME} from "../../config/base";

    export default {
        name: "Edit",
        data:function (){
            return{
                form:null,
                id:0,
                imageUrl:'',
                uploadurl:HOSTNAME+'/api/upload',
            }
        },
        methods:{
            uploadSuccess(res){
                this.imageUrl = IMGHOSTNAME+res.src;
                this.form.cthumb = res.src;
                window.console.log(res);
            },
            //获取对应数据
            getCate(id) {
                fetch(HOSTNAME + '/api/category/'+id,{
                    method: 'GET',
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
                            this.form = data.data;
                            this.imageUrl = IMGHOSTNAME+data.data.cthumb;
                        }else if(data.code==FAIL){
                            this.$message.error(data.msg)
                        }
                    })
            },

            //提交
            submitForm(id) {
                fetch(HOSTNAME + '/api/category/'+id,{
                    method: 'PUT',
                    body:JSON.stringify(this.form),
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'token':sessionStorage.getItem('token')
                    })
                })
                    .then(res=>res.json())
                    .then(data=>{

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

                            window.console.log(data.data);
                            this.$refs.form.resetFields();
                            //写删除图片
                        }else if(data.code==FAIL){
                            this.$message.error(data.msg)
                        }
                    })
            },
            resetForm(form) {
                this.$refs[form].resetFields();
            }
        },
        beforeMount(){
            this.id = this.$route.query.id;
            this.getCate(this.id)
        }
    }
</script>

<style scoped>

</style>