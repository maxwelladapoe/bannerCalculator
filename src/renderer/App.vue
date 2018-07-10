<template>
    <div id="app">

        <el-container class="main-wrapper">
            <el-aside width="inherit">
                <sidebar class="sidebar"></sidebar>
            </el-aside>


            <el-container class="contents-wrapper">
                <router-view></router-view>
            </el-container>

        </el-container>

    </div>
</template>

<script>
  import Sidebar from './components/layouts/sideBar'

  export default {
    name: 'yeldo',
    components: {
      Sidebar
    }
  }
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,700');
    .main-wrapper {
        min-height: 100%;
        font-family: 'Montserrat', sans-serif;
    }

    [class*="el"]:not([class*="el-icon"]){
        font-family: 'Montserrat', sans-serif !important;
    }

    .contents-wrapper{
        width: 100%;
        background-color: #eeeeee;
    }
</style>
