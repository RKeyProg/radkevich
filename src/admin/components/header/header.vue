<template>
  <div class="header-component">
    <headline title="Панель администрирования">
      <user name="Владимир Астаханов" />
    </headline>
    <navigation />
  </div>
</template>

<script>
import user from "../../components/user";
import headline from "../../components/headline";
import navigation from "../../components/navigation";
export default {
	components: {
		headline,
		navigation,
		user
	}
}
</script>