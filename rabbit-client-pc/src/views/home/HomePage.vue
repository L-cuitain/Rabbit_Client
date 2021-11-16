<template>
  <AppLayout>
    <div class="container">
      <HomeCategory />
      <HomeBanner />
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/AppLayout.vue";
import HomeCategory from "@/views/home/components/HomeCategory.vue";
import HomeBanner from "@/views/home/components/HomeBanner";

export default {
  name: "HomePage",
  components: {
    AppLayout,
    HomeCategory,
    HomeBanner,
  },
};
</script>

<style></style>
