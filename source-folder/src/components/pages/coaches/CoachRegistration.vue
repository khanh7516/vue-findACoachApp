<template>
  <base-dialog :show="!!error" title="An error occurred!!!" @close="handleError">
    <p>{{error}}</p>
  </base-dialog>
    <section>
        <base-card>
        <h2>Resgister as a coach now!</h2>
        <div v-if="isLoading">
            <base-spinner></base-spinner>
        </div>
        <coach-form v-else  @save-data="saveData"></coach-form>

        </base-card>
    </section>
</template>


<script>
import CoachForm from '../../other/coaches/CoachForm.vue'
export default {
   components: {
    CoachForm
   },
   data() {
    return {
        isLoading: false,
        error: null
    }
   },
   methods: {
    async saveData(data) {
        this.isLoading = true;

        try {
            await this.$store.dispatch('coaches/registerCoach', data);
        } catch (error) {
            this.error = error.message || "Some thing went wrong!"
        }

        if(!this.error){
            this.isLoading = false;
            this.$router.replace('/coaches');
        }

        // console.log(data);
        // this.$store.commit('coaches/registerCoach', data);
    },
    handleError() {
        this.error = null;
        this.isLoading = false;
    }
   }

}
</script>