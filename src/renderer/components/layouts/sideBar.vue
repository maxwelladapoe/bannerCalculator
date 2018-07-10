<template>
        <el-menu default-active="1" class="el-menu-vertical-demo" :collapse="true"  :router="true" >

            <el-menu-item index="1" :route="{name:'landing-page'}">
                <i class="el-icon-menu"></i>
                <span slot="title">Banner Price Calculator</span>
            </el-menu-item>
            <el-menu-item index="2" :route="{name:'invoice-page'}">
                <i class="el-icon-document"></i>
                <span slot="title">Invoices</span>
            </el-menu-item>
            <el-menu-item index="3">
                <i class="el-icon-bell"></i>
                <span slot="title">Task Manager</span>
            </el-menu-item>
            <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">Settings</span>
            </el-menu-item>
        </el-menu>
</template>

<script>
  export default {
    name: 'sideBar'
  }
</script>

<style scoped lang="scss">

    .el-menu-vertical-demo{
        height: 100% !important;
    }
</style>