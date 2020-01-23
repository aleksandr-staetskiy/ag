import Vue from "vue"

Vue.component('tabs', {
    template: `
    <div>

      <div class="tab__switch">
        <a v-for="tab in tabs" 
            href="#" 
            class="tab__link" :class="{'tab__link--active' : tab.isActive}"
            @click="chooseTab(tab)"
            >
            {{ tab.name }}
            </a>
      </div>

      <div class="tab__panel">
        <slot></slot>
      </div>

    </div>
    `,
    data() {
        return {
            tabs: []
        }
    },

    created() {
        this.tabs = this.$children
    },

    methods: {
        chooseTab(selectedTab) {
            this.tabs.forEach(item => {
                item.isActive = (item.name === selectedTab.name)
            })
        }
    }
})

Vue.component('tab', {
    template: `
    <div v-show="isActive"> <slot></slot> </div>
  `,
    props: {
        name: {
            require: true
        },
        selected: {
            default: false
        }
    },
    data() {
        return {
            isActive: false
        }
    },

    mounted() {
        this.isActive = this.selected
    }
})

new Vue({
    el: '#tabs',
})