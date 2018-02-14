<template>
  <div>
      <span id="load">  <span class="iconfont icon-jiazai load" ></span></span>
    
  </div>
</template>
<style>
#load{
    animation: run 1s infinite linear;
    display: inline-block;
    -webkit-animation:run 1s linear  infinite ;
}
@keyframes run {
    0%{
        transform: rotate(0deg);
    }
    50%{
        transform: rotate(180deg);
    }
    100%{
        transform: rotate(360deg);
    }
}

</style>

