<template>
  <div class="search-person">
    <div class="form-inline">
      <input :disabled="loading" autocomplete="off" class="form-control" @input="search" name="q" type="text" v-model="searchString" :placeholder="placeholder">
      <div class="loading" v-show="loading">
        <div class="icon dripicons-loading"></div>
      </div>
    </div>

    <div class="results" v-click-outside="hideResults">
      <ul class="list-group">
        <li v-for="person in results" class="list-group-item list-group-item-action">
          <person-card :person="person" @selectPerson="onSelectPerson"></person-card>
        </li>
        <li v-if="!results" class="list-group-item list-group-item-warning">
          {{ noResults }}
        </li>
      </ul>


    </div>
  </div>
</template>

<script>
  import PersonCard from './PersonCard.vue'
  import axios from 'axios'
  import ClickOutside from 'vue-click-outside'
  import debounce from 'debounce'

  export default {
    components: {
      'person-card': PersonCard
    },
    props: [
      'placeholder',
      'no-results'
    ],
    data: function () {
      return {
        personId: null,
        searchString: null,
        results: [],
        loading: false,
        response: null,
        result: null
      }
    },
    methods: {
      search: debounce(function (message) {
        if (message) {
          message.preventDefault()
        }

        this.personId = null
        this.results = []
        this.loading = true
        var that = this
        axios.get('/webapp/ajax/person/?q=' + this.searchString)
          .then(
            (response) => {
              that.response = response
              that.results = response.data.data
              that.loading = false
            }
          )
      }, 500),
      onSelectPerson: function (person) {
        this.$emit('select-person', person)
        this.results = []
      },
      hideResults: function () {
        this.results = []
      }
    },
    directives: {
      ClickOutside
    }
  }
</script>

<style scoped lang="less">

  .search-person {
    position: relative;
    margin-bottom: 30px;
  }
  .btn-search {
    font-size: 17px;
  }

  .loading {
    padding: 10px 15px;
    font-size: 17px;
  }

  .results {
    position: absolute;
    max-width: 500px;
    width: 100%;
    top: 40px;
  }
</style>
