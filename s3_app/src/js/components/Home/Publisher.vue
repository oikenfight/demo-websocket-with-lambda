<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">
                        publish message
                    </h4>
                </div>
                <div class="card-body">
                    <div class="form">
                        <!-- message -->
                        <div class="form-group row">
                            <label class="col-form-label col-2 text-right" for="formDestination">message</label>
                            <input class="form-control col-9" v-model="form.message" id="formDestination">
                        </div>

                        <!-- submit -->
                        <div class="form-group row" style="padding-top: 20px;">
                            <button type="button" class="offset-2 btn btn-primary" :class="{disabled: isDisabled}" @click="submit">submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'HomePublisher',
        data () {
            return {
                form: {
                    message: '',
                }
            }
        },
        mounted () {},
        computed: {
            isDisabled () {
                return this.form.message === ''
            },
        },
        methods: {
            submit () {
                axios.get('https://qpemqysmh8.execute-api.ap-northeast-1.amazonaws.com/Prod/publish/').
                    then(response => {
                        console.log('requested !!!')
                    })
                this.form.message = ''
            },
        }
    }
</script>

<style scoped>

</style>