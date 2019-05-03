<template>
  <div>
    <div class="row">
      <div class="col">
        <h1>Ordered burgers</h1>
        <p>{{ title }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h2>Burgers in progress</h2>
        <ul>
          <template v-for="(item, index) in burgerorders">
            <li class="mb-2" v-if="!item.done" :key="index">
              <span class="w-75">{{ item.burger }} </span>
              <button class="btn btn-success" type="checkbox" @click="burgerDone(item)">Done</button>
            </li>
          </template>
        </ul>
      </div>
      <div class="col">
        <h2>Burgers done</h2>
        <ul>
          <template v-for="(item, index) in burgerorders">
            <li class="mb-2" v-if="item.done" :key="index">
              <span>{{ item.burger }} </span>
              <button class="btn btn-danger" type="checkbox" @click="burgerClear(item)">Clear</button>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    dbBurgerOrders
  } from '../firebaseConfig'

  export default {
    name: 'home',
    data() {
      return {
        title: 'Work work!',
        burgerorders: []
      }
    },
    methods: {
      burgerClear(item) {
        // console.log(todo.key);
        dbBurgerOrders.child(item.key).remove();
        this.readBurgers();
      },
      burgerDone(item) {
        console.log(item.key);
        dbBurgerOrders.child(item.key).update({
          done: true
        })
        this.readBurgers();
      },
      burgerNotDone(item) {
        console.log(item.key);
        dbBurgerOrders.child(item.key).update({
          done: false
        })
        this.readBurgers();
      },
      readBurgers() {
        let self = this;
        this.burgerorders = [];
        dbBurgerOrders.once('value').then(function (snapshot) {

          snapshot.forEach(function (childSnapshot) {
            // console.log(childSnapshot.val().orderedBurger);
            self.burgerorders.push({
              key: childSnapshot.key,
              burger: childSnapshot.val().orderedBurger,
              done: childSnapshot.val().done
            })
          });
        })
        console.log(this.burgerorders);
      }
    },
    mounted: function () {
      this.readBurgers()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  li {
    position: relative;
    text-align: left;
    padding: 10px 10px 10px 50px;
    margin: 0;
    list-style: none;
    background-image: url("../assets/hamburger.svg");
    background-repeat: no-repeat;
    background-position: left center;
    background-size: 40px;
  }

  button {
    position: absolute;
    width: 75px;
    height: 38px;
    top: 0.2em;
    right: -2.5em;
  }
</style>