<template>
  <section>
    <div class="user-info">
      <template v-if="info">
        <atoms-base-image
          :src="info.profileImage"
          alt="프로필 이미지"
          width="80"
          is-radius
        />
        <div class="user-info__content">
          <div>
            <atoms-base-typorgraphy component="b" variant="title5">
              {{ info.nickName }}
            </atoms-base-typorgraphy>
            <atoms-base-typorgraphy component="span" variant="body2">
              님 환영합니다.
            </atoms-base-typorgraphy>
          </div>
          <atoms-base-typorgraphy component="div" variant="body2">
            smkim@naver.com
          </atoms-base-typorgraphy>
        </div>
      </template>
      <template v-else>
        <atoms-base-image
          :src="require('@/assets/images/common/img__profile-image.png')"
          alt="프로필 이미지"
          width="80"
          is-radius
        />
        <div class="user-info__content">
          <div>
            <atoms-base-typorgraphy component="b" variant="title5">
              로그인을 해주세요.
            </atoms-base-typorgraphy>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
export default {
  name: 'UserInfo',
  data() {
    return {
      isDrawer: false,
      info: this.$store.state.common.userInfo,
    }
  },
  mounted() {
    console.log('### this.$store.state.common:', this.info)
  },
}
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  padding: 0 $spacing $spacing;
  &__content {
    flex-grow: 1;
    margin-left: $spacing * 2;
  }
}
</style>
