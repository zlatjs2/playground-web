<template>
  <div>
    <atoms-base-input v-model="userName" placeholder="이름" />
    <atoms-base-input v-model="password" placeholder="패스워드" is-readonly />

    <molecules-text-field v-model="userId" maxlength="5" />

    <div>이름: {{ userId }}</div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      userName: '',
      password: '',
      userId: '',
    }
  },
  methods: {},
}
</script>

<style lang="scss">
body {
  color: $common-black;
}
</style>
