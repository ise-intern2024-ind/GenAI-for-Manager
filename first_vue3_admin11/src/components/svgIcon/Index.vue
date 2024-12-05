<template>
    <!-- 不推荐直接使用props的值直接进行赋值，因为父组件发生变化，子组件都会被重新渲染-->
    <!-- <svg class="svg-class" :class="props.className" aria-hidden="true"> -->
    <svg class="svg-class" :class="svgClassName" aria-hidden="true">
        <use :href="svgIcon"></use>
    </svg>
</template>
<script setup>
import { computed,ref } from "vue"
// definedProps在vue3.2版本中不需要定义在使用了
const props = defineProps({
    iconName:{
        type: String,
        default: "",
    },
    className:{
        type: String,
        default: "",
    }
})
const svgClassName = ref(props.className)
const svgIcon = computed(()=>`#icon-${props.iconName}`);
</script>

<style lang="scss">
.svg-class{
    width: 1em;
    height: 1em;
    fill: currentColor;
}
</style>

