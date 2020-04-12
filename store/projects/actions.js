export const actions = {
    setProjects({ commit }, projects) {
        commit('SET_PROJECTS', projects);
    },

    setCurrent({ commit }, current) {
        commit('SET_CURRENT', current);
    },
}

export default actions;