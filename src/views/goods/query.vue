<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/mains' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品查看</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <el-form :inline="true" :model="form" v-if="category.length" class="demo-form-inline">
            <el-form-item label="商品名称" >
                <el-input v-model="form.gname" placeholder="请输入关键字" style="width: 150px;"></el-input>
            </el-form-item>
            <el-form-item label="所属分类">
                <el-select v-model="form.cid" placeholder="请选择">
                    <el-option v-for="(item,index) in category" :label="item.cname" :key="index" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="现价价格区间">
                <el-input v-model.number="form.min_price" placeholder="￥" style="width: 150px;"></el-input>---
                <el-input v-model.number="form.max_price" placeholder="￥" style="width: 150px;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="queryGoods">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="goodsList" style="width: 100%" height="350" border stripe>
            <el-table-column prop="id" label="ID" width="80">
            </el-table-column>
            <el-table-column prop="gname" label="商品名称" width="120">
            </el-table-column>
            <el-table-column prop="cname" label="所属分类" width="80">
            </el-table-column>
            <el-table-column prop="status" label="上架状态" width="100">
                <template slot-scope="scope">
                    <el-button type="success" size="mini" v-if="scope.row.status">上架中</el-button>
                    <el-button type="warning" size="mini" v-else>已下架</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="oprice" label="商品原价" width="100">
            </el-table-column>
            <el-table-column prop="nprice" label="商品现价" width="100">
            </el-table-column>
            <el-table-column prop="gdetail" label="商品详情" width="200">
                <template slot-scope="scope">
                    <img v-for="(item,index) in (scope.row.gdetail).split(',')" :key="index" :src="imgHost+item"
                         :alt="scope.row.gname" :titlt="scope.row.gname" width="50px">
                </template>
            </el-table-column>
            <el-table-column prop="gthumb" label="缩略图" width="120">
                <template slot-scope="scope">
                    <img :src="imgHost+scope.row.gthumb" :alt="scope.row.gname" :titlt="scope.row.gname" width="50px">
                </template>
            </el-table-column>
            <el-table-column prop="gbanner" label="轮播图" width="200">
                <template slot-scope="scope">
                    <img v-for="(item,index) in (scope.row.gbanner).split(',')" :key="index" :src="imgHost+item"
                         :alt="scope.row.gname" :titlt="scope.row.gname" width="50px">
                </template>
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间" width="100">
            </el-table-column>
            <el-table-column prop="update_time" label="更新时间" width="100">
            </el-table-column>
            <el-table-column prop="gstock" label="库存" width="100">
            </el-table-column>
            <el-table-column prop="description" label="商品描述" width="120">
            </el-table-column>
            <el-table-column prop="gbrand" label="商品品牌" width="120">
            </el-table-column>
            <el-table-column prop="gnorms" label="商品规格" width="120">
            </el-table-column>
            <el-table-column label="操作" width="220" fixed="right" align="center">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="warning" size="mini" v-if="scope.row.status">下架</el-button>
                    <el-button @click="handleClick(scope.row)" type="success" size="mini" v-else>上架</el-button>
                    <el-button size="mini">
                        <router-link :to="{name:'goodsEdit',query:{id:scope.row.id}}">编辑</router-link>
                    </el-button>
                    <el-button size="mini" type="danger" @click="deleteCate(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="total,prev, pager, next,jumper"
                :total="total" :page-size="3"
                @current-change="changePage">
        </el-pagination>
    </div>
</template>

<script>
    import {SUCCESS, FAIL, HOSTNAME, IMGHOSTNAME} from "../../config/base";
    // import {api} from "../../config/api";
    import axios from 'axios'

    export default {
        name: "query",
        data() {
            return {
                goodsList: [],
                imgHost: IMGHOSTNAME,
                status: 1,
                total:0,
                current:1,
                category:[],
                form:{
                    cid:'',
                    gname:'',
                    min_price:'',
                    max_price:'',
                }
            }
        },
        methods: {
            //干煸页码时的请求
            changePage(i){
                this.current = i
            },
            //删除
            deleteCate(id) {
                fetch(HOSTNAME + '/api/goods/' + id, {
                    method: 'DELETE',
                    headers: {
                        // 'Content-Type': 'application/json',
                        'token': sessionStorage.getItem('token')
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.code == SUCCESS) {
                            this.goodsList = this.goodsList.filter(ele => ele.id != id)
                            this.$message.success(data.msg);
                        } else if (data.code == FAIL) {
                            this.$message.error(data.msg)
                        }
                    })
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
            //显示数据
            queryGoods() {
                let token = sessionStorage.getItem('token');
                axios.get(HOSTNAME + '/api/goods', {
                    headers: {
                        token: token,
                    },
                    params:{
                        limit:3,
                        page:this.current,
                        gname:this.form.gname,
                        cid:this.form.cid,
                        min_price:this.form.min_price,
                        max_price:this.form.max_price,
                    }
                })
                    .then(res => {
                        res = res.data;
                        if (res.code == SUCCESS && res.count) {
                            this.goodsList = res.data;
                            this.total = res.count;
                            this.form.cname=res.data.cname;
                            this.$message.success(res.msg);
                        } else if (res.code == FAIL) {
                            this.$message.error(res.msg)
                        }
                    }).catch(error => {
                    window.console.log(error)
                })
            },
            // queryGoods() {
            //     api('get', '/api/goods').then(resolve => {
            //         if (resolve.code == SUCCESS) {
            //             this.goodsList = resolve.data;
            //             this.$message.success(resolve.msg);
            //         } else if (resolve.code == FAIL) {
            //             this.$message.error(resolve.msg)
            //         }
            //     })
            // },
            // queryGoods() {
            //     let token = sessionStorage.getItem('token');
            //     fetch(HOSTNAME + '/api/goods', {
            //         method: 'GET',
            //         headers: {
            //             'Content-Type': 'application/json',
            //             'token': token,
            //         }
            //     })
            //         .then(res=>res.json())
            //         .then(data=>{
            //             if(data.code==SUCCESS){
            //                 this.goodsList=data.data;
            //                 this.$message.success(data.msg);
            //             }else if(data.code==FAIL){
            //                 this.$message.error(data.msg)
            //             }
            //         })
            // },
            //改变状态
            handleClick(row) {
                window.console.log(row);
                this.goodsList.status =row.status;
                return row.status = !row.status;

            },
        },
        beforeMount() {
            this.queryGoods();
            this.getCate();
        },
        watch:{
            current(){
                this.queryGoods();
            }
        },
    }
</script>
<style>
    .el-table td.is-center, .el-table th.is-center {
        text-align: center;
    }
</style>
<style scoped>

</style>