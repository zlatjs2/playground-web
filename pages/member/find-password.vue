<template>
  <div>
    <atoms-base-typorgraphy component="h2" variant="title4" getter-bottom>
      비밀번호 찾기
    </atoms-base-typorgraphy>
    <form @submit="onSubmit">
      <molecules-text-field
        v-model="email"
        placeholder="가입시 입력한 이메일"
        getter-bottom
      />

      <atoms-base-button
        color="primary"
        variant="contained"
        is-full-width
        getter-bottom
      >
        비밀번호 재발급
      </atoms-base-button>
      <atoms-base-button
        variant="contained"
        is-full-width
        @click="() => $router.push('/signin')"
      >
        취소
      </atoms-base-button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'FindPassword',
  layout: 'memberLayout',
  data() {
    return {
      email: '',
    }
  },
  methods: {
    onSubmit() {
      console.log('### 1:', 1)
    },
  },
}
</script>

<style></style>
