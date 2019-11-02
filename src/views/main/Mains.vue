<template>
    <div>
        <el-container>
            <el-aside style="width: 200px;">
                <el-row>
                    <el-col >
                        <el-menu default-active="2" class="el-menu-vertical-demo" >
                            <el-submenu index="1">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>商品分类管理</span>
                                </template>
                                <el-menu-item index="1-1"><router-link to="/categoryadd">添加分类</router-link></el-menu-item>
                                <el-menu-item index="1-2"><router-link to="/categoryquery">查看分类</router-link></el-menu-item>
                            </el-submenu>
                            <el-submenu index="2">
                                <template slot="title">
                                    <i class="el-icon-menu"></i>
                                    <span slot="title">商品管理</span>
                                </template>
                                <el-menu-item index="2-1"><router-link to="/goodsadd">添加商品</router-link></el-menu-item>
                                <el-menu-item index="2-2"><router-link to="/goodsquery">查看商品</router-link></el-menu-item>
                            </el-submenu>
                            <el-submenu index="3" >
                                <template slot="title">
                                    <i class="el-icon-document"></i>
                                    <span slot="title">日报管理</span>
                                </template>
                                <el-menu-item index="3-1">填写日报</el-menu-item>
                                <el-menu-item index="3-2">查看日报</el-menu-item>
                            </el-submenu>
                            <el-submenu index="4" >
                                <template slot="title">
                                    <i class="el-icon-document"></i>
                                    <span slot="title">数据可视化</span>
                                </template>
                                <el-menu-item index="4-1"><router-link to="/amain/vcharts">日报可视化</router-link></el-menu-item>
                            </el-submenu>
                        </el-menu>
                    </el-col>
                </el-row>
            </el-aside>
            <el-container>
                <el-header>
                    <el-menu
                            class="el-menu-demo"
                            mode="horizontal"
                            active-text-color="#ffd04b">
                        <el-menu-item index="1">处理中心</el-menu-item>
                        <el-submenu index="2">
                            <template slot="title">我的工作台</template>
                            <el-menu-item index="2-1">选项1</el-menu-item>
                            <el-menu-item index="2-2">选项2</el-menu-item>
                            <el-menu-item index="2-3">选项3</el-menu-item>
                            <el-submenu index="2-4">
                                <template slot="title">选项4</template>
                                <el-menu-item index="2-4-1">选项1</el-menu-item>
                                <el-menu-item index="2-4-2">选项2</el-menu-item>
                                <el-menu-item index="2-4-3">选项3</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-menu-item index="3">消息中心</el-menu-item>
                        <el-menu-item index="5" round size="mini" style="float: right;">退出</el-menu-item>
                        <el-menu-item index="4" style="float: right">{{names}}</el-menu-item>
                    </el-menu>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "mains",
        data(){
            return{
                names:''
            }
        },
        methods:{
            getNames(){
                this.names = sessionStorage.getItem('names');
            }
        },
        beforeMount() {
            this.getNames();
        }
    }
</script>

<style scoped>
    .el-header, .el-footer {
        padding: 0;
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
    a{
        color: #333;
    }
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
    }

    .el-main {
        min-height: 500px;
        background-color: #E9EEF3;
        color: #333;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
    .el-aside{
        height: 100vh;
    }
    .el-menu{
        border-right: none;
    }
    .router-link-exact-active{
        color: #409eff;
    }
    .el-menu--horizontal>.el-menu-item.is-active {
        border-bottom: 2px solid #409eff;
        color: #303133;
    }
</style>