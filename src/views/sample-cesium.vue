<style lang="less">
@import "sample-cesium";
</style>
<template>
    <div id="cesiumContainer">

    </div>
</template>

<script>
import Cesium from 'cesium/Cesium'
import  'cesium/Widgets/widgets.css'
import iezNavi from 'iez-navi/viewerCesiumNavigationMixin'
export default {
  name: "sample-cesium",
  mounted () {
    let viewer = new Cesium.Viewer('cesiumContainer');
    iezNavi(viewer,{});
  }
}
</script>

