export default {
	namespaced: true,
	state: {
		data: []
	},
	mutations: {
		SET_CATEGORIES: (state, categories) => (state.data = categories),
		ADD_CATEGORY: (state, category) => state.data.unshift(category),
		EDIT_CATEGORY: (state, editCategory) => {
			const editOldCategory = category => {
				if (category.id === editCategory.category.id) {
					category.category = editCategory.category.category;
				}
				return category;
			}

			state.data = state.data.map(editOldCategory)
		},
		REMOVE_CATEGORY: (state, categoryId) => {
			state.data = state.data.filter(category => category.id !== categoryId)
		},
		ADD_SKILL: (state, newSkill) => {
			state.data = state.data.map(category => {
				if (category.id === newSkill.category) {
					category.skills.push(newSkill);
				}
				return category;
			})
		},
		REMOVE_SKILL: (state, skillToRemove) => {
      state.data = state.data.map(category => {
        if (category.id === skillToRemove.category) {
          category.skills = category.skills.filter(skill => skill.id !== skillToRemove.id)
        }
        return category;
      })
		},
		EDIT_SKILL: (state, skillToEdit) => {
			const editSkillInCategory = category => {
				category.skills = category.skills.map(skill => {
					return skill.id === skillToEdit.id ? skillToEdit : skill;
				});
			}

			const findCategory = category => {
				if (category.id === skillToEdit.category){
					editSkillInCategory(category);
				}

				return category;
			}

			state.data = state.data.map(findCategory)
		}
	},
	actions: {
		async create({commit}, title) {
			try {
				const { data } = await this.$axios.post('/categories', { title })
				commit("ADD_CATEGORY", data);
			} catch (error) {
				console.log(error);
				throw new Error("Произошла ошибка");
			}
		},
		async fetch({commit}) {
			try {
				const { data } = await this.$axios.get('/categories/370')
				commit("SET_CATEGORIES", data)
			} catch (error) {
				console.log(error);
			}
		},
		async edit({commit}, category) {
			try {
				const { data } = await this.$axios.post(`/categories/${category.categoryId}`, {
					title: category.categoryTitle
				});
				commit("EDIT_CATEGORY", data)
      } catch (error) {
        console.log(error);
				throw new Error("Ошибка")
      }
		},
		async remove({commit}, categoryId) {
			try {
        const { data } = await this.$axios.delete(`/categories/${categoryId}`);
        commit("REMOVE_CATEGORY", categoryId)
      } catch (error) {
        console.log(error);
        throw new Error("Ошибка")
      }
		}
	}
}