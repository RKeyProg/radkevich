import tag from "./tag.vue";
import { shallowMount } from "@vue/test-utils";

it("появляется ли у тега кнопка удаления, если передать атрибут interactive", async () => {
	const wrapper = shallowMount(tag);
	
	await wrapper.setProps({
		interactive: true
	})

	expect(wrapper.find("button").exists()).toBe(true);
})