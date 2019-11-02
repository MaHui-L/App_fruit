<template>
    <div class="login">
        <el-form :model="form">
            <el-form-item label="用户名">
                <el-input v-model="form.names">
                </el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password">
                </el-input>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" @click="submitHandel">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {SUCCESS,FAIL,HOSTNAME} from "../config/base";

    export default {
        name: "login",
        data(){
            return{
                form:{
                    names:'',
                    password:''
                }
            }
        },
        methods:{
            submitHandel(){
                fetch(HOSTNAME + '/admin/login/index',{
                    method: 'POST',
                    body:JSON.stringify(this.form),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                })
                    .then(res=>res.json())
                    .then(data=>{
                        if(data.code==SUCCESS){
                            let redirect = this.$route.query.redirect || 'mains';
                            this.$message.success(data.msg);
                            sessionStorage.token=data.data.token;
                            sessionStorage.names=data.data.names;
                            this.$router.push({name:redirect})
                        }else if(data.code==FAIL){
                            this.$message.error(data.msg)
                        }
                        window.console.log(data.code)
                    })
            }
        }
    }
</script>

<style scoped lang="scss">
    $width:300px;
    $bgcolor:#ccc;
    @mixin centerMid{
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
    .login{
        width: $width;
        height: auto;
        @include centerMid;
    }
</style>