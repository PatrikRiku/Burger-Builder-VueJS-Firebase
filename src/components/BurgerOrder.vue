<template>
  <div>
    <div>
      <h1>Build a burger</h1>
      <p>{{ title }}</p>
    </div>
    <form @submit.prevent="orderBurger" class="mb-3">
      <div class="mb-2">
        <button class="btn btn-outline-secondary ml-2 mr-2" type="button" value="Bread"
          @click="addIngredient($event)">Bread</button>
        <button class="btn btn-outline-info ml-2 mr-2" type="button" value="Meat"
          @click="addIngredient($event)">Meat</button>
        <button class="btn btn-outline-info ml-2 mr-2" type="button" value="Halloumi"
          @click="addIngredient($event)">Halloumi</button>
        <button class="btn btn-outline-warning ml-2 mr-2" type="button" value="Cheddar"
          @click="addIngredient($event)">Cheddar</button>
        <button class="btn btn-outline-success ml-2 mr-2" type="button" value="Salad"
          @click="addIngredient($event)">Salad</button>
        <button class="btn btn-outline-success ml-2 mr-2" type="button" value="Cucumber"
          @click="addIngredient($event)">Cucumber</button>
      </div>
      <br />
      <button class="btn btn-success" type="submit" name="button">Order burger</button>
    </form>
    <transition name="bounce">
      <ul id="burgerList">
        <li v-for="burgerItem in customburger" :key="burgerItem['.key']">
          <span v-if="burgerItem == 'Bread'"><img src="../assets/bbread.png"></span>
          <span v-if="burgerItem == 'Meat'"><img src="../assets/meat.png"></span>
          <span v-if="burgerItem == 'Halloumi'"><img src="../assets/halloumi.png"></span>
          <span v-if="burgerItem == 'Cheddar'"><img src="../assets/cheese.png"></span>
          <span v-if="burgerItem == 'Salad'"><img src="../assets/salad.png"></span>
          <span v-if="burgerItem == 'Cucumber'"><img src="../assets/cucumber.png"></span>
        </li>
      </ul>
    </transition>
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
        title: 'Choose ingredients',
        customburger: []
      }
    },
    methods: {
      addIngredient(e) {
        this.customburger.push(e.target.value)
      },
      orderBurger() {
        if (this.customburger.length > 0) {
          dbBurgerOrders.push({
            orderedBurger: this.customburger,
            done: false
          });
          document.getElementById("burgerList").classList.add("slide-fade-leave-active");
          document.getElementById("burgerList").classList.add("slide-fade-leave-to");
          setTimeout(this.resetBurger, 320)
        } else {
          alert("Burgaren innehåller inget. Du måste först bygga din burgare.")
        }
      },
      resetBurger() {
        this.customburger = [];
        document.getElementById("burgerList").classList.remove("slide-fade-leave-active");
        document.getElementById("burgerList").classList.remove("slide-fade-leave-to");
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(50px);
    opacity: 0;
  }

  .done {
    text-decoration: line-through;
  }

  ul {
    list-style: none;
    padding: 0;
  }
</style>