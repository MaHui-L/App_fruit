<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/mains' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类查看</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <el-table :data="cateList" style="width: 100%" height="350">
            <el-table-column prop="id" label="ID" width="80">
            </el-table-column>
            <el-table-column prop="cname" label="分类名称" width="120">
            </el-table-column>
            <el-table-column prop="cthumb" label="缩略图" width="120">
                <template slot-scope="scope">
                    <img :src="imgHost+scope.row.cthumb" :alt="scope.row.cname" :titlt="scope.row.cname" width="50px">
                </template>
            </el-table-column>
            <el-table-column prop="csort" label="排序" width="120">
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间" width="120">
            </el-table-column>
            <el-table-column prop="update_time" label="更新时间" width="120">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini"><router-link :to="{name:'cateEdit',query:{id:scope.row.id}}">编辑</router-link></el-button>
                    <el-button size="mini" type="danger" @click="deleteCate(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {SUCCESS,FAIL,HOSTNAME,IMGHOSTNAME} from "../../config/base";

    export default {
        name: "query",
        data() {
            return {
                cateList: [],
                imgHost:IMGHOSTNAME,
            }
        },
        methods:{
            deleteCate(id){
                fetch(HOSTNAME + '/api/category/'+id,{
                    method:'DELETE',
                    headers:{
                        // 'Content-Type': 'application/json',
                        'token':sessionStorage.getItem('token')
                    }
                })
                    .then(res=>res.json())
                    .then(data=>{
                        if(data.code==SUCCESS){
                            this.cateList = this.cateList.filter(ele=>ele.id!=id)
                            this.$message.success(data.msg);
                        }else if(data.code==FAIL){
                            this.$message.error(data.msg)
                        }
                    })
            },
            queryCate() {
                fetch(HOSTNAME + '/api/category',{
                    method:'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'token':sessionStorage.getItem('token')
                    })
                })
                    .then(res=>res.json())
                    .then(data=>{
                        // console.log(data);
                        if(data.code==SUCCESS){
                            this.cateList=data.data;
                            this.$message.success(data.msg);
                        }else if(data.code==FAIL){
                            this.$message.error(data.msg)
                        }
                    })
            },
        },
        beforeMount() {
            this.queryCate();
        }
    }
</script>

<style scoped>

</style>