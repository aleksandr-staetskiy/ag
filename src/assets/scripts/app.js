import Vue from "vue";
import IMask from 'imask';


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



// mask checker

const input = document.querySelector('.form__input');
const mask = IMask(input, {
    mask: '+{7}(000)000-00-00'
});


const form = document.querySelector('.form')

form.addEventListener('submit', event => {
    event.preventDefault();
    let input = document.querySelector('.form__input').value;
    let checkbox = document.querySelector('.check');

    let inputIsCorrect = false;
    let checkCorrect = false;

    if (input === '') {
        alert('Поле пустое')
        return;
    }

    if (!checkbox.checked) {
        alert('Примите соглашение')
    } else {
        checkCorrect = true
    }

    if (input.length < 7) {
        alert('мало символов')
        return;
    } else {
        inputIsCorrect = true;
    }

    if (inputIsCorrect === true && checkCorrect === true) {

        let formData = new FormData(this);
        formData = Object.fromEntries(formData);

        ajaxSend(formData);
        this.reset();

    }
})

const ajaxSend = (formData) => {
    fetch('http://localhost:8081/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // отправляемые данные 
            },
            body: JSON.stringify(formData)
        })
        .then(response => alert('Сообщение отправлено'))
        .catch(error => console.error(error))
};