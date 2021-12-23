<template>
  <AppLayout>
    <div class="container">
      <AppMemberSidebar />
      <article class="article">
        <slot />
      </article>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/AppLayout";
import AppMemberSidebar from "@/components/AppMemberSidebar";

export default {
  name: "AppMemberLayout.vue",
  components: {
    AppLayout,
    AppMemberSidebar,
  },
};
</script>

<style scoped lang="less">
.container {
  display: flex;
  padding-top: 20px;
  .article {
    width: 1000px;
    position: relative;
  }
}
</style>
